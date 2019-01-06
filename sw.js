const staticCacheName = 'restaurant-review-static-v1';

const urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
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
    'img/10.jpg'  
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
            return response || fetch(event.request);
        })
    );
});