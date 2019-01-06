// check if browser supports service worker
if('serviceWorker' in navigator) {
    // on load register service worker
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js') .then(
            function(reg) {
                console.log("registration success",reg.scope);
            }, 
            function(err){
                console.log("registration failed", err);
            });
    });
}