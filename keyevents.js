bodyDOM.addEventListener("keypress", evt => {
    if(evt.keyCode == 32) doPlayerJump();
    if(evt.keyCode == 116) console.log(didTouchThing());
    console.log(evt.keyCode);
});