import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {flushSync} from 'react-dom';
import {HiArrowLongRight} from 'react-icons/hi2';
import settings from '../content/settings.json';
import {bentoShapeFor} from './bento.js';
const files=import.meta.glob('../content/projects/*.json',{eager:true,import:'default'});
const projects=Object.values(files).filter(p=>p.published).sort((a,b)=>a.order-b.order);
const experimentFiles=import.meta.glob('../content/experiments/*.json',{eager:true,import:'default'});
const experiments=Object.values(experimentFiles).filter(e=>e.published).sort((a,b)=>a.order-b.order);
const cats=['All','Brand Systems','Partnerships','Technical Storytelling','Communications'];
const aliases={'brand-storytelling':'Brand Systems','partnership-campaigns':'Partnerships','technical-storytelling':'Technical Storytelling','communications':'Communications'};
export function safeURL(value){try {const u=new URL(value,location.origin);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}}
export function mediaURL(value){if(!value)return '';return value.startsWith('/media/')?value:safeURL(value);}
function Arrow(){return <HiArrowLongRight aria-hidden="true" className="arrow"/>;}
function Text({children}){return String(children||'').split('\n\n').filter(Boolean).map((p,i)=><p key={i}>{p}</p>);}
function Video({block}){const [play,setPlay]=useState(false);const source=block.file||block.url||'';const media=mediaURL(source);const isVideoFile=source.startsWith('/media/')||/\.mp4(?:$|\?)/i.test(source);let host='';try{host=new URL(media).hostname;}catch{}const trusted=['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com'].includes(host);const loop=block.playback!=='controls';return <section className="video-block"><h3>{block.title}</h3>{isVideoFile?<video className="project-video" autoPlay={loop} muted={loop} loop={loop} controls playsInline preload="metadata" poster={block.poster?mediaURL(block.poster):undefined}><source src={media}/></video>:trusted?play?<iframe title={block.title||'Project video'} src={media} allow="fullscreen; picture-in-picture" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/>:<button className="video-load" onClick={()=>setPlay(true)}>Load video <Arrow/><small>Video loads from {host} when you choose to play.</small></button>:media?<a className="text-link" href={media} target="_blank" rel="noreferrer">View embedded project <Arrow/></a>:null}</section>;}
// Deterministic bento grid (2026-10): tile shapes are a fixed 12-column CSS Grid with
// constant row-spans per shape -- see .gallery.layout-bento in styles.css. There is no
// runtime measurement here (no ResizeObserver, no getBoundingClientRect, no rAF, no
// image-load listener, no dynamically assigned gridRowEnd/gridColumnEnd): a tile's size
// comes entirely from its `size` value and the CSS rule for that shape, so it can never
// get stuck mid-calculation the way the old measured version did. New shape names are
// square/landscape/portrait/feature/wide; the old small/medium/large/wide/auto values
// from existing content keep working via bentoShapeFor's alias map (src/bento.js,
// unit-tested directly in tests/bento.test.mjs).
function BentoGallery({block}){
  const images=block.images||[];
  const [lightboxIndex,setLightboxIndex]=useState(null);
  const triggerRef=useRef(null);
  const openLightbox=(event,index)=>{triggerRef.current=event.currentTarget;setLightboxIndex(index);};
  return <div className="gallery layout-bento">
    {images.map((im,j)=>{
      const shape=bentoShapeFor(im.size||'auto');
      const fit=im.fit==='cover'?'cover':'contain';
      const position=['top','bottom','left','right'].includes(im.position)?im.position:'center';
      return <figure key={j} className="bento-tile" data-shape={shape}>
        <button
          type="button"
          className="bento-trigger"
          aria-label={`View full size: ${imageAccessibleName(im,j+1,images.length)}`}
          onClick={(event)=>openLightbox(event,j)}
        >
          <img src={mediaURL(im.image)} alt={im.alt||''} loading="lazy" style={{objectFit:fit,objectPosition:position}}/>
        </button>
        {im.caption&&<figcaption className="bento-caption">{im.caption}</figcaption>}
      </figure>;
    })}
    {lightboxIndex!==null&&(
      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={()=>setLightboxIndex(null)}
        onNavigate={(dir)=>setLightboxIndex((current)=>(current+dir+images.length)%images.length)}
        restoreFocusRef={triggerRef}
      />
    )}
  </div>;
}
// Plain same-size grid for images that already share a common aspect ratio -- no shape
// logic, reuses the generic .gallery.columns-N rules.
function UniformGallery({block}){const images=block.images||[];return <div className={`gallery layout-uniform columns-${block.columns||'2'}`}>{images.map((im,j)=><figure key={j}><img src={mediaURL(im.image)} alt={im.alt||''} loading="lazy"/>{im.caption&&<figcaption>{im.caption}</figcaption>}</figure>)}</div>;}
// Responsive target row heights for the justified grid. Adjust these three
// numbers to change the grid's density; the algorithm below does the rest.
function justifiedTargetHeight(containerWidth) {
  if (containerWidth >= 1000) return 340;
  if (containerWidth >= 640) return 260;
  return 190;
}

// Classic justified-layout packing: walk images left to right, accumulating
// each one's width at the target row height, and close a row once that sum
// (plus gaps) reaches the container width. The row is then scaled down so
// its images fill the container exactly — never scaled up, so a row never
// ends up taller than the target height. Images keep their real aspect
// ratio (no cropping) and manual order is preserved. A final, incomplete
// row is rendered at the target height and left-aligned rather than
// stretched to fill the row, per the Adobe Portfolio-style spec.
function computeJustifiedRows(images, containerWidth, gap) {
  if (!containerWidth) return [];
  const targetHeight = justifiedTargetHeight(containerWidth);
  const rows = [];
  let row = [];
  let widthAtTarget = 0;
  images.forEach((image, index) => {
    const ratio = image.width && image.height ? image.width / image.height : 1.5;
    row.push({ ...image, index, ratio });
    widthAtTarget += ratio * targetHeight;
    const isLast = index === images.length - 1;
    const gapsWidth = (row.length - 1) * gap;
    if (widthAtTarget + gapsWidth >= containerWidth) {
      const totalRatio = row.reduce((sum, item) => sum + item.ratio, 0);
      const availableWidth = containerWidth - (row.length - 1) * gap;
      const height = availableWidth / totalRatio;
      rows.push({ images: row, height });
      row = [];
      widthAtTarget = 0;
    } else if (isLast && row.length) {
      rows.push({ images: row, height: targetHeight, incomplete: true });
    }
  });
  return rows;
}

function imageAccessibleName(image, position, total) {
  return image.caption || image.alt || `Image ${position} of ${total}`;
}

function Lightbox({images, index, onClose, onNavigate, restoreFocusRef}) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key === 'ArrowLeft') { onNavigate(-1); return; }
      if (event.key === 'ArrowRight') { onNavigate(1); return; }
      if (event.key === 'Tab') {
        const focusable = Array.from(dialogRef.current?.querySelectorAll('button') || []);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      restoreFocusRef?.current?.focus();
    };
  }, [onClose, onNavigate, restoreFocusRef]);
  const image = images[index];
  const label = imageAccessibleName(image, index + 1, images.length);
  return (
    <div
      ref={dialogRef}
      className="lightbox-overlay active"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <button ref={closeRef} className="lightbox-close" aria-label="Close image viewer" onClick={onClose}>&times;</button>
      {images.length > 1 && <button className="lightbox-prev" aria-label="Previous image" onClick={() => onNavigate(-1)}>&lsaquo;</button>}
      <figure className="lightbox-figure">
        <img className="lightbox-img" src={mediaURL(image.image)} alt={image.alt || ''} />
        {image.caption && <figcaption className="lightbox-caption">{image.caption}</figcaption>}
      </figure>
      {images.length > 1 && <button className="lightbox-next" aria-label="Next image" onClick={() => onNavigate(1)}>&rsaquo;</button>}
    </div>
  );
}

function JustifiedGallery({block}) {
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const triggerRef = useRef(null);
  const images = block.images || [];
  useEffect(() => {
    const gallery = ref.current;
    if (!gallery) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);
  const gap = containerWidth >= 640 ? 12 : 8;
  const rows = computeJustifiedRows(images, containerWidth, gap);
  const openLightbox = (event, index) => {
    triggerRef.current = event.currentTarget;
    setLightboxIndex(index);
  };
  return (
    <div ref={ref} className="gallery layout-justified">
      {rows.map((row, i) => (
        <div key={i} className={`justified-row${row.incomplete ? ' incomplete' : ''}`} style={{height: row.height, gap}}>
          {row.images.map((image) => (
            <figure key={image.index} style={{width: image.ratio * row.height}}>
              <button
                type="button"
                className="justified-trigger"
                aria-label={`View full size: ${imageAccessibleName(image, image.index + 1, images.length)}`}
                onClick={(event) => openLightbox(event, image.index)}
              >
                <img
                  src={mediaURL(image.image)}
                  alt={image.alt || ''}
                  loading="lazy"
                />
              </button>
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ))}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(dir) => setLightboxIndex((current) => (current + dir + images.length) % images.length)}
          restoreFocusRef={triggerRef}
        />
      )}
    </div>
  );
}

function groupGalleries(blocks){return blocks.reduce((result,block)=>{const previous=result[result.length-1];const layout=block.layout||'bento';const previousLayout=previous?.layout||'bento';if(block.type==='gallery'&&previous?.type==='gallery'&&layout===previousLayout&&!block.title&&!previous.title){previous.images=[...(previous.images||[]),...(block.images||[])];return result;}result.push({...block,images:block.images?[...block.images]:block.images});return result;},[]);}
export function Blocks({blocks=[]}){return groupGalleries(blocks).map((b,i)=><div key={i} className={`block space-${b.spacing||'regular'} type-${b.type}`}>
 {b.type==='sectionHeading'&&<h2 className="project-section-heading">{b.title}</h2>}
 {b.type==='text'&&<div className={`text-block align-${b.align||'left'}`}>{b.title&&<h2>{b.title}</h2>}<Text>{b.body}</Text></div>}
 {b.type==='image'&&<figure className={b.width==='narrow'?'narrow':''}><img src={mediaURL(b.image)} alt={b.alt||''} loading="lazy"/><figcaption>{b.caption}</figcaption></figure>}
 {b.type==='gallery'&&<>{b.title&&<h2>{b.title}</h2>}{(b.layout||'bento')==='justified'?<JustifiedGallery block={b}/>:b.layout==='uniform'?<UniformGallery block={b}/>:<BentoGallery block={b}/>}</>}
 {b.type==='split'&&<div className={`split image-${b.side||'left'}`}><img src={mediaURL(b.image)} alt={b.alt||''} loading="lazy"/><div><h2>{b.title}</h2><Text>{b.body}</Text></div></div>}
 {b.type==='video'&&<Video block={b}/>}
 </div>);}
// Prototype (homepage only, 2026-10-09): fades up elements marked data-reveal as they
// scroll into view, and gives project-card covers a few px of scroll parallax. Both are
// progressive enhancement — the SSR'd HTML is fully visible without this effect running,
// and prefers-reduced-motion disables it entirely.
function useReveal(){
  const ref=useRef(null);
  useEffect(()=>{
    const root=ref.current;
    if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const targets=Array.from(root.querySelectorAll('[data-reveal]'));
    if(!targets.length)return;
    const vh=window.innerHeight;
    const pending=[];
    targets.forEach(el=>{if(el.getBoundingClientRect().top<vh)el.classList.add('is-visible');else pending.push(el);});
    root.classList.add('js-enhanced');
    if(!pending.length)return;
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.15});
    pending.forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[]);
  return ref;
}
function useCoverParallax(ref){
  useEffect(()=>{
    const root=ref.current;
    if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const covers=Array.from(root.querySelectorAll('.cover img'));
    if(!covers.length)return;
    let frame=null;
    const update=()=>{
      frame=null;
      const vh=window.innerHeight;
      covers.forEach(img=>{
        const rect=img.parentElement.getBoundingClientRect();
        const center=rect.top+rect.height/2;
        const offset=Math.max(-14,Math.min(14,((center-vh/2)/vh)*28));
        img.style.setProperty('--parallax',offset.toFixed(1)+'px');
      });
    };
    const onScroll=()=>{if(frame===null)frame=requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(frame!==null)cancelAnimationFrame(frame);};
  },[ref]);
}
function prefersReducedMotion(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
function Card({p}){return <article className="project-card" data-slug={p.slug} style={{viewTransitionName:'card-'+p.slug}}><a href={'/'+p.slug}><div className="cover"><img src={mediaURL(p.cover)} alt={p.coverAlt||p.title} style={{objectPosition:p.coverPosition||'center'}} loading={p.order<2?'eager':'lazy'}/></div><h3>{p.title}</h3><p>{p.company}</p></a></article>;}
// Signature interaction (2026-10): the Selected Work grid starts curated to `featured`
// projects and expands in place to the full category-filtered list. Prefers the View
// Transitions API (named per card, so the browser morphs position/size itself); falls
// back to a dependency-free FLIP animation (measure before, measure after, animate the
// delta) when VT isn't supported. Both are skipped under prefers-reduced-motion, which
// leaves the grid to reflow instantly.
function useExpandTransition(gridRef){
  const prevRectsRef=useRef(null);
  const captureRects=()=>{
    const grid=gridRef.current;
    if(!grid)return;
    const map=new Map();
    grid.querySelectorAll('[data-slug]').forEach(card=>map.set(card.dataset.slug,card.getBoundingClientRect()));
    prevRectsRef.current=map;
  };
  useLayoutEffect(()=>{
    const grid=gridRef.current;
    const prev=prevRectsRef.current;
    prevRectsRef.current=null;
    if(!grid||!prev||prefersReducedMotion())return;
    grid.querySelectorAll('[data-slug]').forEach(card=>{
      const before=prev.get(card.dataset.slug);
      const after=card.getBoundingClientRect();
      if(before){
        const dx=before.left-after.left,dy=before.top-after.top;
        const sx=before.width/after.width,sy=before.height/after.height;
        if(Math.abs(dx)>.5||Math.abs(dy)>.5||Math.abs(sx-1)>.01||Math.abs(sy-1)>.01)card.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`},{transform:'none'}],{duration:320,easing:'cubic-bezier(.22,.8,.2,1)'});
      } else {
        card.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
      }
    });
  });
  return captureRects;
}
function ExperimentCard({e}){
  const url=e.liveUrl||e.sourceUrl;
  const label=e.liveUrl?'Visit live project':e.sourceUrl?'View source':null;
  return <article className="experiment-card">
    <div className="experiment-visual" aria-hidden="true">{e.cover?<img src={mediaURL(e.cover)} alt=""/>:<span className="experiment-format">{e.format}</span>}</div>
    <div className="experiment-body">
      {e.cover&&<span className="experiment-format">{e.format}</span>}
      <h3>{e.title}</h3>
      <p>{e.overview||e.summary}</p>
      {e.gallery?.length>0&&<div className="experiment-gallery">{e.gallery.map((im,i)=><img key={i} src={mediaURL(im.image)} alt={im.alt||''} loading="lazy"/>)}</div>}
      {url&&<a className="text-link" href={safeURL(url)} target="_blank" rel="noreferrer" aria-label={`${label} — opens in a new tab`}>{label} <span aria-hidden="true">&#8599;</span></a>}
    </div>
  </article>;
}
// Kept as a separate content source (site/content/experiments) from client/employment
// projects on purpose -- see docs/portfolio-decisions.md. Renders nothing when there's
// nothing published, so an empty experiments folder doesn't leave a bare heading.
function Experiments(){
  if(!experiments.length)return null;
  return <section id="experiments" className="experiments" data-reveal aria-labelledby="experiments-heading">
    <p className="eyebrow">Experiments</p>
    <h2 id="experiments-heading">Things I build<br/>when no one's<br/>watching.</h2>
    <p className="experiments-intro">AI-assisted tools, games, and workflows outside client work — some live, some in progress.</p>
    <div className="experiment-grid">{experiments.map(e=><ExperimentCard key={e.slug} e={e}/>)}</div>
  </section>;
}
function Home({initial='All'}){
  const [filter,setFilter]=useState(cats.includes(initial)?initial:'All');
  const [expanded,setExpanded]=useState(false);
  const gridRef=useRef(null);
  const toggleRef=useRef(null);
  const captureRects=useExpandTransition(gridRef);
  const ref=useReveal();useCoverParallax(ref);
  const list=projects.filter(p=>filter==='All'||p.category===filter);
  const visible=expanded?list:list.filter(p=>p.featured);
  const onToggle=()=>{
    const next=!expanded;
    if(prefersReducedMotion()){setExpanded(next);}
    else if(typeof document.startViewTransition==='function'){document.startViewTransition(()=>{flushSync(()=>setExpanded(next));});}
    else {captureRects();setExpanded(next);}
    toggleRef.current?.focus();
  };
  return <div ref={ref}><section className="hero" data-reveal><h1>{settings.headline}</h1><p>{settings.intro}</p><a className="hero-link" href="#work">View selected work <Arrow/></a></section><section id="work" className="work" data-reveal><h2>Selected work</h2><div className="filters" role="group" aria-label="Filter projects">{cats.map(c=><button key={c} aria-pressed={c===filter} className={c===filter?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div id="work-grid" ref={gridRef} className={`project-grid columns-${settings.gridColumns||'2'} gap-${settings.gridGap||'comfortable'}`}>{visible.map(p=><Card key={p.slug} p={p}/>)}</div>{!expanded&&visible.length===0&&<p className="work-empty-hint">No featured picks in this category yet — view all work to see everything.</p>}<button type="button" ref={toggleRef} className="work-toggle text-link" aria-expanded={expanded} aria-controls="work-grid" onClick={onToggle}>{expanded?'Show selected work':'View all work'}<Arrow/></button></section><Experiments/></div>;
}
function Project({p}){const next=projects[(projects.indexOf(p)+1)%projects.length];return <><header className="project-intro"><a className="eyebrow" href={'/?category='+encodeURIComponent(p.category)}>All {p.category.toLowerCase()} <Arrow/></a><h1>{p.title}</h1><p className="summary">{p.summary}</p><dl><div><dt>Company</dt><dd>{p.company}</dd></div><div><dt>Role</dt><dd>{p.role}</dd></div></dl></header><figure className="project-hero"><img src={mediaURL(p.cover)} alt={p.coverAlt}/></figure><section className="overview"><h2>The work</h2><div><Text>{p.overview}</Text></div></section>{p.outcomes?.length>0&&<section className="outcomes" aria-label="Project outcomes">{p.outcomes.map((o,i)=><div key={i}><strong>{o.value}</strong><p>{o.label}</p></div>)}</section>}<Blocks blocks={p.blocks}/><nav className="project-next" aria-label="Next project"><span>Next project</span><a href={'/'+next.slug}>{next.title}<Arrow/></a></nav></>;}
function About(){return <section className="simple-page"><p className="eyebrow">About Ayo</p><h1>The story.<br/>The system.<br/>The people using it.</h1><Text>{settings.about}</Text><a href="/resume" className="text-link">View experience <Arrow/></a></section>;}
function Resume(){return <section className="simple-page"><p className="eyebrow">Experience</p><h1>Brand, web,<br/>and creative direction.</h1>{settings.resume&&<a className="text-link" href={mediaURL(settings.resume)} download>Download résumé <Arrow/></a>}<div className="experience">{[['AppOmni','Senior Visual Designer','Dec 2024–Present'],['Forge HQ','Founder, Creative Director','2020–Present'],['Meta, via TEKSystems','Creative Consultant, Keynote Storytelling (Contract)','2025'],['Secureframe','Principal Designer','2022–2024'],['Navan (TripActions)','Director of Design','2019–2022'],['MongoDB','Creative Director','2015–2019'],['DocuSign','Director of Creative Services','2012–2015']].map(([a,b,c])=><div key={a}><h2>{a}</h2><p>{b}</p><span>{c}</span></div>)}</div></section>;}
const CONTACT_EMAIL='ayoakintilo@gmail.com';
function ContactForm(){
  const onSubmit=(event)=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const name=(data.get('name')||'').toString();
    const email=(data.get('email')||'').toString();
    const message=(data.get('message')||'').toString();
    const subject=`New message from akintilo.com${name?' — '+name:''}`;
    const body=`${message}\n\n—\n${name}${email?' <'+email+'>':''}`;
    location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <form className="contact-form" onSubmit={onSubmit}>
    <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" required/></div>
    <div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required/></div>
    <div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="5" required/></div>
    <button type="submit" className="text-link">Send message <Arrow/></button>
    <p className="form-hint">Opens your email app with this filled in, addressed to me.</p>
  </form>;
}
function Contact(){return <section className="simple-page"><p className="eyebrow">Contact</p><h1>Have something<br/>in mind?</h1><ContactForm/>{settings.contactUrl&&<a className="text-link" href={safeURL(settings.contactUrl)}>Or get in touch <Arrow/></a>}</section>;}
export function App(){const path=decodeURIComponent(location.pathname).replace(/^\/|\/$/g,'');const [menu,setMenu]=useState(false);const project=projects.find(p=>p.slug===path);const title=project?.title||({about:'About',resume:'Experience',contact:'Contact'}[path])||'Brand systems. Clearer stories.';useEffect(()=>{document.title=title+' | Ayodeji Akintilo';},[title]);return <><a className="skip" href="#main">Skip to content</a><div className="shell"><header className="site-header"><a className="wordmark" href="/">{settings.name}</a><button className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button><nav id="main-nav" className={menu?'open':''} aria-label="Main navigation">{[['Work','/'],['About','/about'],['Experience','/resume'],['Contact','/contact']].map(([name,url])=><a key={url} aria-current={location.pathname===url?'page':undefined} href={url}>{name}</a>)}</nav></header><main id="main">{project?<Project p={project}/>:path==='about'?<About/>:path==='resume'?<Resume/>:path==='contact'?<Contact/>:!path||aliases[path]?<Home initial={aliases[path]||new URLSearchParams(location.search).get('category')||'All'}/>:<section className="simple-page"><h1>Page not found.</h1><a href="/">Explore the work <Arrow/></a></section>}</main><footer><a href="/">{settings.name}</a><a href="/contact">Get in touch <Arrow/></a><a href="/admin/">Edit portfolio</a></footer></div></>;}
