const track = document.getElementById("image-track");
//the line above created a track element every time is pressed down with the "e.clientX" value
const handleOnDown = e=>
     track.dataset.mouseDownAt = e.clientX; 
     // here e.clientX is the x-coordinate of the mouse pointer when a mouse button is clicked on an element.

const handleOnUp = () =>{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    //track.style.transform = 'translate(-50%, -50%)';
    // the line above is saying that when the mouse button is released, the track should be centered again
}


const handleOnMove = e=>{
    if (track.dataset.mouseDownAt === "0") return;
    //above is saying before the mouse is pressed we could just say if that's the case, return immediately and skip all of this code telling the track to move
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    // here the mouseDelta is the difference between the x-coordinate of the mouse pointer
        maxDelta = window.innerWidth/2;

    const percentage = (mouseDelta/maxDelta)*-100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        // here the nexPercentage has to be "let" because I need to declare it as a variable here.
  

    track.dataset.percentage = nextPercentage;

    //dividing the relative position by the max distance would convert the relative position to a decimal and then multiplying it by 100 turning it back into a percentage.
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
      
    for(const image of track.getElementsByClassName("image")) {
       image.animate({
         objectPosition: `${100 + nextPercentage}% center`
       }, { duration: 1200, fill: "forwards" });
    }

}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
