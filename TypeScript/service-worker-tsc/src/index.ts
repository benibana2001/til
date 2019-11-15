console.log(navigator)
if ('serviceWorker' in navigator) {
    let n: Navigator = navigator
    let sw: ServiceWorkerContainer = n.serviceWorker
    sw.register('sw.js',
        {
            scope: './'
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
}else {
    console.log("no navigator")
}