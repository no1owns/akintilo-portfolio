"""One-time import of Ayo's public Adobe Portfolio assets. Never run during builds."""
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor
import json, hashlib
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'content/projects'
MEDIA = ROOT / 'public/media'
OUT.mkdir(parents=True, exist_ok=True)
MEDIA.mkdir(parents=True, exist_ok=True)
BASE = 'https://akintilo.com'
CATEGORIES = [('brand-storytelling','Brand Systems'),('partnership-campaigns','Partnerships'),('technical-storytelling','Technical Storytelling'),('communications','Communications')]
def fetch(url):
    return urlopen(Request(url, headers={'User-Agent':'PortfolioMigration/1.0'}), timeout=45).read()
def image_url(img):
    return img.get('data-src') or img.get('src') or ''
def asset(url):
    url = urljoin(BASE,url)
    if urlparse(url).hostname != 'cdn.myportfolio.com':
        raise ValueError('Unrecognized image host: '+url)
    ext = Path(urlparse(url).path).suffix or '.jpg'
    name = hashlib.sha256(url.encode()).hexdigest()[:16]+ext
    target = MEDIA/name
    if not target.exists(): target.write_bytes(fetch(url))
    return '/media/'+name

cards=[]
for path,category in CATEGORIES:
    soup=BeautifulSoup(fetch(BASE+'/'+path),'html.parser')
    for card in soup.select('a.project-cover'):
        title=card.select_one('.title')
        img=card.select_one('img')
        if not title or not img: continue
        cards.append(dict(slug=card['href'].strip('/'),title=title.get_text(' ',strip=True),category=category,coverUrl=image_url(img)))

def project(pair):
    order,card=pair
    slug=card['slug']
    target=OUT/(slug+'.json')
    if target.exists(): return
    soup=BeautifulSoup(fetch(BASE+'/'+slug),'html.parser')
    blocks=[]
    for module in soup.select('#project-modules > .project-module'):
        imgs=list(dict.fromkeys(image_url(i) for i in module.select('img') if image_url(i)))
        if imgs:
            with ThreadPoolExecutor(max_workers=4) as pool: paths=list(pool.map(asset,imgs))
            blocks.append({'type':'gallery','title':'','columns':'2' if len(paths)>1 else '1','spacing':'regular','images':[{'image':p,'alt':card['title']+' project work','caption':''} for p in paths]})
        for frame in module.select('iframe'):
            src=urljoin(BASE,frame.get('src') or frame.get('data-src') or '')
            blocks.append({'type':'video','title':card['title']+' video','url':src,'spacing':'regular'})
    data={**card,'order':order,'published':True,'company':'','role':'','summary':'','overview':'','outcomes':[],'blocks':blocks,'cover':asset(card.pop('coverUrl')),'coverAlt':card['title']+' project collage','coverPosition':'center','featured':order<7}
    data.pop('coverUrl',None)
    target.write_text(json.dumps(data,indent=2)+'\n')
    print(slug, len(blocks),'sections',flush=True)

with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(project,enumerate(cards)))
print('Imported',len(cards),'projects')
