const staticCacheName = 'restaurant-review-static-v1';

const urlsToCache = [
    '/',
    'index.html',
    'restaurant.html?id=1',
    'restaurant.html?id=2',
    'restaurant.html?id=3',
    'restaurant.html?id=4',
    'restaurant.html?id=5',
    'restaurant.html?id=6',
    'restaurant.html?id=7',
    'restaurant.html?id=8',
    'restaurant.html?id=9',
    'restaurant.html?id=10',
    'css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'js/sw_register.js',
    'data/restaurants.json',
    'img/1.jpg',  
    'img/2.jpg',  
    'img/3.jpg',  
    'img/4.jpg',  
    'img/5.jpg',  
    'img/6.jpg',  
    'img/7.jpg',  
    'img/8.jpg',  
    'img/9.jpg',  
    'img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png'
];

// install cache
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

// activate cache
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('restaurant-review-') &&
                           cacheName != staticCacheName;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch from cache
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // if it is in cache return the response
            if(response) {
                return response;
            }
            console.log('cloning request', event.request.url);
            // if not clone the request first
            const fetchRequest = event.request.clone();
            // fetch the response
            return fetch(fetchRequest).then(
                function(response){
                    const responseToCache = response.clone();
                    console.log('getting cache to put', responseToCache);
                    // put the response in the cache. 
                    caches.open(staticCacheName)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                      });
                    return response;  
                }
            );
        })
    );
});