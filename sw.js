/* Offline cache for the public CFG site. Increment CACHE when site files change. */
const PREFIX='cfg-site-';
const CACHE=PREFIX+'20261117-1';
const CORE=['/','/index.html','/about.html','/services.html','/gallery.html','/references.html','/faq.html','/contact.html','/offline.html','/styles.css','/premium.css','/cfg.css','/site-config.js','/script.js','/premium.js','/chatbot.js','/pwa.js','/manifest.webmanifest','/assets/cfg-logo.webp','/assets/cfg-mark.webp','/assets/icon-180.png','/assets/icon-192.png','/assets/icon-512.png','/assets/icon-maskable.png',...['rooftop-mast','solar-mast','field-testing','coastal-roof','roof-bonding','solar-array','resistance-meter','electrode-detail','earthing-team','earthing-grid'].map(n=>'/assets/'+n+'.webp')];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING') self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try{const response=await fetch(req);if(response.ok&&CORE.includes(url.pathname))await cache.put(url.pathname,response.clone());return response;}
   catch{return await cache.match(url.pathname)||await cache.match('/offline.html');}
  })());return;
 }
 if(CORE.includes(url.pathname))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
