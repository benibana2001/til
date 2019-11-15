self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/image-list.js',
                'gallery/korea_blue.jpg',
                'gallery/korea_bookstore.jpg',
                'gallery/korea_manhole.jpg'
            ])
        })
    )
})

self.addEventListener('fetch', (event: any) => {
    event.respondWith(caches.match(event.request).then((response: any) => {
        if (response !== undefined) {
            return response
        } else {
            return fetch(event.request).then((response: Response) => {
                let responseClone = response.clone()

                caches.open('v1').then((cache) => [
                    cache.put(event.request, responseClone)
                ])
                return response
            }).catch(() => {
                return caches.match('/gallery/myLittleVader.jpg')
            })
        }
    })
    )
})