// checking for events
// install
self.addEventListener("install", (instEvt) => {
    console.log("Service worker installed", instEvt);
});

// activate
self.addEventListener("activate", (actEvt) => {
    console.log("Service worker activated!", actEvt);
});

// fetch
self.addEventListener("fetch", (evt) => {
    console.log("Fetched", evt.request.url)
})