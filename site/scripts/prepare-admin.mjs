import fs from 'node:fs';
fs.mkdirSync('public/admin/vendor',{recursive:true});
for(const file of fs.readdirSync('node_modules/decap-cms/dist')) if(/\.(js|css|wasm)$/.test(file)||file.endsWith('.LICENSE.txt')) fs.copyFileSync('node_modules/decap-cms/dist/'+file,'public/admin/vendor/'+file);
fs.copyFileSync('src/styles.css','public/preview.css');
fs.appendFileSync('public/preview.css','\n.preview{padding:32px;max-width:1100px;margin:auto}.preview h1{font-size:48px;line-height:1.05}.preview .summary{font-size:23px}.preview p{white-space:pre-line}.preview img{max-width:100%}.preview h2{margin-top:32px}.preview .gallery.layout-bento{display:block;columns:3;column-gap:24px}.preview .gallery.layout-bento figure{break-inside:avoid;margin:0 0 24px}.preview .gallery.layout-bento figure[data-size="wide"]{column-span:all}\n');
