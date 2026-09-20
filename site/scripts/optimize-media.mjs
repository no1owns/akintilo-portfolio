import fs from 'node:fs';
import sharp from 'sharp';
const replacements={};
for(const f of fs.readdirSync('public/media')){
 if(!/\.(png|jpe?g)$/i.test(f))continue;
 const out=f.replace(/\.[^.]+$/,'.webp');
 await sharp('public/media/'+f).resize({width:1920,withoutEnlargement:true}).webp({quality:88}).toFile('public/media/'+out);
 replacements['/media/'+f]='/media/'+out;
}
for(const f of fs.readdirSync('content/projects').filter(f=>f.endsWith('.json'))){const p='content/projects/'+f;let text=fs.readFileSync(p,'utf8');for(const [a,b]of Object.entries(replacements))text=text.replaceAll(a,b);fs.writeFileSync(p,text);}
// Keep imported originals outside the source tree as a recoverable archive.
fs.mkdirSync('../../original-portfolio-media',{recursive:true});
for(const from of Object.keys(replacements))fs.renameSync('public'+from,'../../original-portfolio-media/'+from.split('/').pop());
console.log('Optimized',Object.keys(replacements).length,'images; retained originals outside repository.');
