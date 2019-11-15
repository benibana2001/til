import { Gallery, Path } from './image-list.js'
if ('serviceWorker' in navigator) {
    let n: Navigator = navigator
    let sw: ServiceWorkerContainer = n.serviceWorker
    sw.register('sw.js',
        {
            scope: '/'
        }
    ).then((reg) => {
        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }
    }).catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
} else {
    console.log("no navigator")
}

let imgLoad = (imgJSON: any): Promise<any> => {
    return new Promise((resolve: Function, reject: Function) => {
        let request = new XMLHttpRequest()
        request.open('GET', imgJSON.url);
        request.responseType = 'blob'

        request.onload = () => {
            if (request.status === 200) {
                let arrayResponse: any[] = []
                arrayResponse[0] = request.response
                arrayResponse[1] = imgJSON
                resolve(arrayResponse)
            } else {
                reject(Error('Error was occured, status: ' + request.statusText))
            }
        }

        request.onerror = () => {
            reject(Error('There was a network error.'))
        }

        request.send()
    })
}

let imgSection = document.querySelector('section')
console.log(imgSection)
window.onload = (): void => {
    let l: number = Gallery.images.length
    for (let i = 0; i <= l - 1; i++) {
        console.log(i)
        imgLoad(Gallery.images[i]).then((arrayResponse) => {
            console.log(i)
            console.log(Gallery.images[i])
            console.log(arrayResponse[0])
            let myImage = document.createElement('img')
            let myFigure = document.createElement('figure')
            let myCaption = document.createElement('caption')
            let imageURL = window.URL.createObjectURL(arrayResponse[0])

            myImage.src = imageURL
            myImage.setAttribute('alt', arrayResponse[1].alt)
            myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit

            imgSection.appendChild(myFigure)
            myFigure.appendChild(myImage)
            myFigure.appendChild(myCaption)

        }, (Error) => {
            console.log(Error)
        })

    }
}