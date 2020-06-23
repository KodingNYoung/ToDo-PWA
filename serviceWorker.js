// get the href of that site
const HREF = location.href;
console.log("Got the href", HREF, ""proceeding with caching)
// set a cache storage name
const cacheName = 'static-assets'
const assets = [
    `${HREF}`, "/ToDo-PWA/",
    `${HREF}/index.html`,"/ToDo-PWA/index.html/",
    `${HREF}/js/pwa.js`, "/ToDo-PWA/js/pwa.js/",
    `${HREF}/js/script.js`, "/ToDo-PWA/js/script.js/",
    `${HREF}/css/style.css`, "/ToDo-PWA/css/style.css/",
    "https://kit.fontawesome.com/1395a25f53.js",
    "https://kit-free.fontawesome.com"
]


// checking for events
// install
self.addEventListener("install", (instEvt) => {
    // console.log("Service worker installed", instEvt);
    // When the install event is taking place
    // hold the event until the caching is done
    instEvt.waitUntil(
        // open a cache storage
        caches.open(cacheName).then((cache) => {
            // then add all assets
            cache.addAll(assets)
        })
    )
});

// activate
self.addEventListener("activate", (actEvt) => {
    console.log("Service worker activated!", actEvt);
});

// fetch
self.addEventListener("fetch", (evt) => {
    // console.log("Fetched", evt.request.url)
    // When there is a fetch event
    // first check with the cache storage
    evt.respondWith(
        caches.match(evt.request).then((cacheVal) => {
            if (cacheVal){
                return cacheVal;
            }else{
                return fetch(evt.request);
            }
        })
    )
})
