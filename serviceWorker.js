// get the root folder
let locate = location.href.split("/");
// remove the last items i.e the serviceworker string
locate.pop();
locate = locate.join("/");
console.log(locate);


// set a cache storage name
const cacheName = 'static-assets';
const assets = [
    `${locate}`,
    "index.html",
    "js/script.js",
    "css/style.css",
    "css/fontawesome.min.css",
    "css/all.min.css",
    "webfonts/",
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
        caches.open(cacheName)
            .then((cache) => {
                // first delete all earlier entries
                cache.keys().then(cacheEntries => {
                    cacheEntries.forEach(cacheEntry => {
                        cache.delete(cacheEntry);
                    })
                })

                // then add all assets
                cache.addAll(assets)
            })
            .catch((err) => console.log("There was an error: ", err))
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
