import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'vite';
import {renderToString} from 'react-dom/server';
import React from 'react';
const settings=JSON.parse(fs.readFileSync('content/settings.json'));
const projects=fs.readdirSync('content/projects').map(f=>JSON.parse(fs.readFileSync('content/projects/'+f))).filter(p=>p.published);
const routes=['','about','resume','contact','brand-storytelling','partnership-campaigns','technical-storytelling','communications',...projects.map(p=>p.slug)];
const template=fs.readFileSync('dist/client/index.html','utf8');
const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const server=await createServer({configFile:false,server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
try{
 const {App}=await server.ssrLoadModule('/src/App.jsx');
 for(const route of [...routes,'404']){
  globalThis.location=new URL('/'+route,'https://preview.invalid');
  const p=projects.find(p=>p.slug===route);
  const title=(p?.title||({about:'About',resume:'Experience',contact:'Contact','404':'Page not found'}[route])||'Brand systems. Clearer stories.')+' | Ayodeji Akintilo';
  const desc=p?.summary||settings.intro;
  let meta=`<meta name="description" content="${escape(desc)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(desc)}"><meta property="og:type" content="website">`;
  if(settings.siteUrl){const canonical=new URL('/'+route,settings.siteUrl).href;meta+=`<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}">`;if(p?.cover)meta+=`<meta property="og:image" content="${escape(new URL(p.cover,settings.siteUrl).href)}">`;}
  else meta+='<meta name="robots" content="noindex,nofollow">';
  const html=template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace('</head>',meta+'</head>').replace('<div id="root"></div>',`<div id="root">${renderToString(React.createElement(App))}</div>`);
  const file=route==='404'?'dist/client/404.html':path.join('dist/client',route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);
 }
 if(settings.siteUrl)fs.writeFileSync('dist/client/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${escape(new URL('/'+r,settings.siteUrl).href)}</loc></url>`).join('')}</urlset>`);
 fs.writeFileSync('dist/client/robots.txt',settings.siteUrl?'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: '+new URL('/sitemap.xml',settings.siteUrl).href:'User-agent: *\nDisallow: /');
 console.log(`Prerendered ${routes.length} routes and 404 page.`);
}finally{await server.close();}
