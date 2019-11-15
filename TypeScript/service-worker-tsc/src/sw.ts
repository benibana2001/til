self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/image-list.js',
                '/star-wars-logo.jpg',
                'gallery/bountyHunters.jpg',
                'gallery/myLittleVader.jpg',
                'gallery/snowTroopers.jpg'
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