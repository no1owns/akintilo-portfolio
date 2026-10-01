// The local HTTP preview lacks randomUUID; keep the HTTPS production API intact.
if(import.meta.env.DEV&&!crypto.randomUUID)crypto.randomUUID=()=>{
 const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
 const s=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${s.slice(0,8)}-${s.slice(8,12)}-${s.slice(12,16)}-${s.slice(16,20)}-${s.slice(20)}`;
};
const field=(label,name,widget='string',extra={})=>({label,name,widget,...extra});
const optional=(label,name,widget='string',extra={})=>field(label,name,widget,{required:false,...extra});
const title=optional('Section heading','title');
const spacing=field('Section spacing','spacing','select',{options:['tight','regular','generous'],default:'regular'});
const image=[field('Image','image','image'),field('Image description','alt'),optional('Caption','caption')];
const galleryImage=[...image,field('Tile size','size','select',{options:[{label:'Automatic',value:'auto'},{label:'Small',value:'small'},{label:'Medium',value:'medium'},{label:'Large',value:'large'},{label:'Full width',value:'wide'}],default:'auto'})];
const categories=['Brand Systems','Partnerships','Technical Storytelling','Communications'];
const blocks=field('Page sections','blocks','list',{required:false,collapsed:true,summary:'{{type}} · {{title}}',types:[
 {label:'Project group heading',name:'sectionHeading',widget:'object',fields:[field('Heading','title'),spacing]},
 {label:'Text',name:'text',widget:'object',fields:[title,field('Text','body','text'),field('Alignment','align','select',{options:['left','center'],default:'left'}),spacing]},
 {label:'Image',name:'image',widget:'object',fields:[...image,field('Width','width','select',{options:['full','narrow'],default:'full'}),spacing]},
 {label:'Gallery',name:'gallery',widget:'object',fields:[title,field('Layout','layout','select',{options:[{label:'Bento grid',value:'bento'},{label:'Justified grid',value:'justified'},{label:'Uniform grid',value:'uniform'}],default:'bento'}),field('Uniform grid columns','columns','select',{options:['1','2','3'],default:'2'}),field('Images','images','list',{fields:galleryImage,summary:'{{alt}}',min:1}),spacing]},
 {label:'Image and text',name:'split',widget:'object',fields:[title,field('Text','body','text'),...image,field('Image side','side','select',{options:['left','right'],default:'left'}),spacing]},
 {label:'Video or embed',name:'video',widget:'object',fields:[field('Video title','title'),optional('Video file','file','file',{hint:'Choose or upload an MP4 video. This takes priority over an embed URL.'}),optional('Embed URL','url','string',{hint:'Use a YouTube /embed/ or Vimeo player URL.'}),optional('Poster image','poster','image'),field('Playback','playback','select',{options:[{label:'Loop silently',value:'loop'},{label:'Show controls',value:'controls'}],default:'loop'}),spacing]}
]});
const prefix=import.meta.env.DEV?'':'site/';
const auth=import.meta.env.VITE_CMS_AUTH_URL;
const local=import.meta.env.DEV;
const config={load_config_file:false,backend:local?{name:'proxy',proxy_url:location.origin+'/api/v1',branch:'main'}:{name:'github',repo:'no1owns/akintilo-portfolio',branch:'main',base_url:auth,auth_endpoint:'auth'},media_folder:prefix+'public/media',public_folder:'/media',publish_mode:'simple',display_url:location.origin,site_url:location.origin,slug:{encoding:'ascii',clean_accents:true,sanitize_replacement:'-'},collections:[
 {name:'settings',label:'Site settings',files:[{name:'home',label:'Homepage and contact',file:prefix+'content/settings.json',fields:[field('Name','name'),field('Headline','headline','text'),field('Introduction','intro','text'),field('About','about','text'),optional('Contact email','email'),optional('Contact link','contactUrl'),optional('Résumé PDF','resume','file'),optional('Public site URL','siteUrl'),field('Homepage columns','gridColumns','select',{options:['1','2','3'],default:'2'}),field('Grid spacing','gridGap','select',{options:['compact','comfortable'],default:'comfortable'})]}]},
 {name:'projects',label:'Projects',label_singular:'Project',folder:prefix+'content/projects',create:true,extension:'json',format:'json',identifier_field:'slug',slug:'{{slug}}',summary:'{{title}}',sortable_fields:['order','title','category'],view_filters:[{label:'Drafts',field:'published',pattern:false}],fields:[field('Page URL','slug','string',{hint:'Keep existing URLs to preserve links.',pattern:['^[a-z0-9]+(?:-[a-z0-9]+)*$','Use lowercase words separated by hyphens']}),field('Title','title'),field('Visible on site','published','boolean',{default:false}),field('Sort order','order','number',{default:20,value_type:'int',min:0}),field('Category','category','select',{options:categories}),field('Company','company'),optional('Role','role'),field('Short description','summary','text'),field('Overview','overview','text'),field('Cover image','cover','image'),field('Cover image description','coverAlt'),field('Cover crop focus','coverPosition','select',{options:['center','top','bottom','left','right'],default:'center'}),field('Outcomes','outcomes','list',{required:false,fields:[field('Value','value'),field('Context','label')]}),blocks]}
]};
if(!local&&!auth){document.getElementById('setup').innerHTML='<h1>Portfolio editor</h1><p>The editor is installed. GitHub sign-in needs to be connected before publishing edits from this address.</p><p>The repository setup guide explains the OAuth connection and the VITE_CMS_AUTH_URL setting.</p><p><a href="https://github.com/no1owns/akintilo-portfolio">Open setup guide on GitHub</a></p><a href="/">Back to portfolio</a>';}
else {
 document.getElementById('setup').remove();
 const CMS=window.CMS;CMS.init({config});
 CMS.registerPreviewStyle('/preview.css');
 const h=window.h;
 const getData=entry=>entry.get('data').toJS();
 const img=(path,getAsset)=>path?String(getAsset(path)):'';
 const paragraphs=text=>String(text||'').split('\n\n').map((p,i)=>h('p',{key:i},p));
 CMS.registerPreviewTemplate('projects',({entry,getAsset})=>{const p=getData(entry);return h('main',{className:'preview'},h('p',{className:'eyebrow'},p.category),h('h1',{},p.title),h('p',{className:'summary'},p.summary),h('p',{},[p.company,p.role].filter(Boolean).join(' / ')),p.cover&&h('img',{src:img(p.cover,getAsset),alt:p.coverAlt||''}),h('h2',{},'The work'),...paragraphs(p.overview),h('div',{className:'outcomes'},...(p.outcomes||[]).map((o,i)=>h('div',{key:i},h('strong',{},o.value),h('p',{},o.label)))),...(p.blocks||[]).map((b,i)=>h('section',{key:i,className:'block type-'+b.type+' space-'+(b.spacing||'regular')},b.type==='sectionHeading'?h('h2',{className:'project-section-heading'},b.title):b.type==='text'?[b.title&&h('h2',{},b.title),...paragraphs(b.body)]:b.type==='gallery'?[b.title&&h('h2',{},b.title),h('div',{className:'gallery layout-'+(b.layout||'bento')+' columns-'+b.columns},...(b.images||[]).map((im,j)=>h('figure',{key:j,'data-size':im.size||'auto'},h('img',{src:img(im.image,getAsset),alt:im.alt||''}),h('figcaption',{},im.caption))))]:b.type==='split'?h('div',{className:'split image-'+b.side},h('img',{src:img(b.image,getAsset),alt:b.alt||''}),h('div',{},b.title&&h('h2',{},b.title),...paragraphs(b.body))):b.type==='image'?h('figure',{className:b.width==='narrow'?'narrow':''},h('img',{src:img(b.image,getAsset),alt:b.alt||''}),h('figcaption',{},b.caption)):h('p',{},'Video / embed: '+(b.file||b.url||'')))));});
 CMS.registerPreviewTemplate('home',({entry})=>{const d=getData(entry);return h('main',{className:'preview'},h('p',{},d.name),h('h1',{style:{whiteSpace:'pre-line'}},d.headline),h('p',{className:'summary'},d.intro),h('h2',{},'About'),...paragraphs(d.about),h('p',{},d.email));});
}
