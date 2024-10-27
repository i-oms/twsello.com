'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"404.html": "75529caa48be4a89bbde447799a2583f",
"assets/AssetManifest.bin": "c9a86cb194616b16f88554873f41d3fc",
"assets/AssetManifest.bin.json": "d3536f03f604817205c2c99c6fedf52e",
"assets/AssetManifest.json": "c72a8f86c5d9d2da6c6d29ecaa25d96b",
"assets/assets/icons/appbar-menu.svg": "1e3e8feb48ed7c2facea36d5563d152c",
"assets/assets/icons/whatsapp.svg": "83b5287afccfec306109ff0344e3f981",
"assets/assets/images/colab/god.png": "210514bf969fa33e5ed51d33397a06b6",
"assets/assets/images/colab/ol.png": "a2ffc568741e144c2172bab6fb18db33",
"assets/assets/images/colab/pi.png": "371e10376f71fd815f2cfa6b74c6ae16",
"assets/assets/images/colab/travego.png": "2e44b9f2136d0304391f282dd39d41bc",
"assets/assets/images/colab/unesco.png": "7fa43fead4330fe5c97068b16992745d",
"assets/assets/images/logo/logo.png": "1c253d61f1fd7feb72aa8cf898474a82",
"assets/assets/images/main-1.jpg": "caa681befe99be61022221ef8d7b3778",
"assets/assets/images/main-2.jpg": "6c824c19361cc2d10fde7b34d9cb8222",
"assets/assets/images/main-3.jpg": "b8c5b5cce3d8c067ee56e582f9b3a704",
"assets/assets/images/main-4.jpg": "30c8a84577316927c76914a135fe6bdb",
"assets/assets/images/team/Dr-Abdul-Nisar-M.webp": "1e6880fc79f88f9df849fdaad645fe00",
"assets/assets/images/team/Dr-C-A-Anaz.webp": "059d9797046da822bb3aebaf881360b0",
"assets/assets/images/team/Dr-Shumais-U.webp": "8550f037e19e36028437ed0ed57c7a91",
"assets/assets/images/team/Muhammed_Shameer_K.webp": "862dd9c6dd65cbd42cd4eb12ef74a0eb",
"assets/assets/images/team/Sreelakshmi_SB.webp": "dc7d9254f9f6e005e0f89e92e6b4e673",
"assets/assets/videos/intro.mp4": "acc3e239e0e4bf891b13d9dc03ed5dfa",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "c243bf90489a0b45b5ec9f28a57482b2",
"assets/NOTICES": "5a7a01828a9f8b2845836e37d4d926da",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "391ff5f9f24097f4f6e4406690a06243",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"CNAME": "de3ba0db80fae5f5c747379bca917d89",
"favicon.png": "74cdcb2d529bed152205aea761d10bbc",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "6d732269e892c6b51e71858919444513",
"icons/Icon-192.png": "52f995c8640962822e7479a2f3f8f944",
"icons/Icon-512.png": "dd86277897fc0f2f9a8b670d83ecff3e",
"icons/Icon-maskable-192.png": "52f995c8640962822e7479a2f3f8f944",
"icons/Icon-maskable-512.png": "dd86277897fc0f2f9a8b670d83ecff3e",
"index.html": "bbaf0464e833981429b6846bb33f48b1",
"/": "bbaf0464e833981429b6846bb33f48b1",
"main.dart.js": "1200a3f74751ccd0fbbebb0b6f606736",
"manifest.json": "443c34a8c0110ae224fe2dac2589012e",
"version.json": "a0eaf81432edefe26a9d7d6684584be3"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
