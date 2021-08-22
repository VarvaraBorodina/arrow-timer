let time = 0;
let flag = false;

const stopbutton = document.getElementById("stop");
const reset = document.getElementById("reset");
const startbutton = document.getElementById("start");
const $time = document.getElementById("time");
const clock = document.querySelector(".clock")

// transform time to mm:ss format
function transformTime(time) {
    if(time%60 < 10) {
        if(time/60 < 10) {
            return `0${Math.trunc(time/60)}:0${time%60}`;
        } else {
            return`${Math.trunc(time/60)}:0${time%60}`
        }      
    } else {
        if(time/60 < 10) {
            return`0${Math.trunc(time/60)}:${time%60}`;
        } else {
            return `${Math.trunc(time/60)}:${time%60}`
        }
    }
}

//change clock hand clocks position
function moveClock(time, clock) {
    let sec = time%60*(Math.PI/30);
    let min = Math.trunc(time/60)*(Math.PI/30);
    clock.innerHTML = `
    <circle cx="100" cy="100" r="85" stroke="none" stroke-width="1" fill="white" opacity="0.7"></circle>
    <circle cx="100" cy="100" r="2" stroke="none" stroke-width="1" fill="black"></circle>

    <line x1="100" y1="20" x2="100" y2="0" stroke="black" />
    <line x1="100" y1="180" x2="100" y2="200" stroke="black" />

    <line x1="0" y1="100" x2="20" y2="100" stroke="black" />
    <line x1="180" y1="100" x2="200" y2="100" stroke="black" />

    <line x1="145" y1="22" x2="140" y2="30.6" stroke="black" />
    <line x1="178" y1="55" x2="169" y2="60" stroke="black" />

    <line x1="145" y1="178" x2="140" y2="169" stroke="black" />
    <line x1="178" y1="145" x2="169.4" y2="140" stroke="black" />

    <line x1="55" y1="178" x2="60" y2="169" stroke="black" />
    <line x1="22" y1="145" x2="30.6" y2="140" stroke="black" />

    <line x1="22" y1="55" x2="30.6" y2="60" stroke="black" />
    <line x1="55" y1="22" x2="60" y2="30.6" stroke="black" />

    <line x1="100" y1="100" x2="${100+60*Math.sin(sec)}" y2="${100-60*Math.cos(sec)}" stroke="black" />
    <line x1="100" y1="100" x2="${100+10*Math.sin(sec-Math.PI)}" y2="${100-10*Math.cos(sec-Math.PI)}" stroke="black" />
    <line x1="100" y1="100" x2="${100+45*Math.sin(min)}" y2="${100-45*Math.cos(min)}" stroke="black"/>
    <line x1="100" y1="100" x2="${100+7*Math.sin(min-Math.PI)}" y2="${100-7*Math.cos(min-Math.PI)}" stroke="black" />`
}

//render time and hand clocks
function render() {
    $time.textContent = transformTime(time);
    moveClock(time, clock);
}

function updateTime() {
    time++;
    render();
}

render();

setTimeout(function timer() {
    if(flag) {
        updateTime();
    } 
    setTimeout(timer, 1000);
}, 1000);

reset.addEventListener('click', () => {
    flag = false
    time = 0;
    render();
 });

stopbutton.addEventListener('click', () => {
    flag = false;
});

startbutton.addEventListener('click', () => {
    flag = true;
});

