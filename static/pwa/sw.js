importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    console.log(workbox);
    event.waitUntil(
      addResourcesToCache([
        "/css/style.css",
        "/images/icons/icon-512x512.png"
      ])
    );
  });