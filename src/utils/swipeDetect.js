// This file is modified from the tutorial below:
// http://www.javascriptkit.com/javatutors/touchevents3.shtml

function swipeDetect(el, callback) {

    const touchSurface = el;

    const allowedTime = 500;
    const restraint = 120;
    const threshold = 200;

    let swipeDir;
    // let dist;
    let startX;
    let startY;
    let startTime;

    const handleSwipe = callback || function(swipeDir) {
        console.log(swipeDir);
        // alert(swipeDir);
    }

    touchSurface.addEventListener('touchstart', function(e) {
        const touchObj = e.changedTouches[0];
        swipeDir = 'none';
        // dist = 0;
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        // e.preventDefault();
    }, false);


    touchSurface.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);


    touchSurface.addEventListener('touchend', function(e) {
        const touchObj = e.changedTouches[0];
        const distX = touchObj.pageX - startX;
        const distY = touchObj.pageY - startY;

        const elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipeDir = (distX < 0) ? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipeDir = (distY < 0) ? 'up' : 'down';
            }
        }

        handleSwipe(swipeDir);
        // e.preventDefault();

    }, false);
}

export default swipeDetect;