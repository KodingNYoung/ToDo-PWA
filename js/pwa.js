// check if the browser supports service workers
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceWorker.js" {scope: "/ToDo-PWA/"})
        .then((regResponse) => console.log("Registered service worker", regResponse))
        .catch((errMessage) => console.log("couldn't load service worker", errMessage))
}
