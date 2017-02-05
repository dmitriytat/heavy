this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/browserconfig.xml',
                '/manifest.json',
                '/index.html',
                '/dist/',
                '/dist/index.bundle.js',
                '/pwa/',
                '/pwa/android-icon-36x36.png',
                '/pwa/android-icon-48x48.png',
                '/pwa/android-icon-72x72.png',
                '/pwa/android-icon-96x96.png',
                '/pwa/android-icon-144x144.png',
                '/pwa/android-icon-192x192.png',
                '/pwa/apple-icon.png',
                '/pwa/apple-icon-57x57.png',
                '/pwa/apple-icon-60x60.png',
                '/pwa/apple-icon-72x72.png',
                '/pwa/apple-icon-76x76.png',
                '/pwa/apple-icon-114x114.png',
                '/pwa/apple-icon-120x120.png',
                '/pwa/apple-icon-144x144.png',
                '/pwa/apple-icon-152x152.png',
                '/pwa/apple-icon-180x180.png',
                '/pwa/apple-icon-precomposed.png',
                '/pwa/favicon.ico',
                '/pwa/favicon-16x16.png',
                '/pwa/favicon-32x32.png',
                '/pwa/favicon-96x96.png',
                '/pwa/ms-icon-70x70.png',
                '/pwa/ms-icon-144x144.png',
                '/pwa/ms-icon-150x150.png',
                '/pwa/ms-icon-310x310.png',
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
    );
});