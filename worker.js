this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/heavy/browserconfig.xml',
                '/heavy/manifest.json',
                '/heavy/index.html',
                '/heavy/dist/index.bundle.js',
                '/heavy/pwa/android-icon-36x36.png',
                '/heavy/pwa/android-icon-48x48.png',
                '/heavy/pwa/android-icon-72x72.png',
                '/heavy/pwa/android-icon-96x96.png',
                '/heavy/pwa/android-icon-144x144.png',
                '/heavy/pwa/android-icon-192x192.png',
                '/heavy/pwa/apple-icon.png',
                '/heavy/pwa/apple-icon-57x57.png',
                '/heavy/pwa/apple-icon-60x60.png',
                '/heavy/pwa/apple-icon-72x72.png',
                '/heavy/pwa/apple-icon-76x76.png',
                '/heavy/pwa/apple-icon-114x114.png',
                '/heavy/pwa/apple-icon-120x120.png',
                '/heavy/pwa/apple-icon-144x144.png',
                '/heavy/pwa/apple-icon-152x152.png',
                '/heavy/pwa/apple-icon-180x180.png',
                '/heavy/pwa/apple-icon-precomposed.png',
                '/heavy/pwa/favicon.ico',
                '/heavy/pwa/favicon-16x16.png',
                '/heavy/pwa/favicon-32x32.png',
                '/heavy/pwa/favicon-96x96.png',
                '/heavy/pwa/ms-icon-70x70.png',
                '/heavy/pwa/ms-icon-144x144.png',
                '/heavy/pwa/ms-icon-150x150.png',
                '/heavy/pwa/ms-icon-310x310.png',
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
    );
});