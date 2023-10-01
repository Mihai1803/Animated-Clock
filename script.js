const canvas = document.querySelector('#canvas');
const faceColor = document.querySelector('#face-color');
const borderColor = document.querySelector('#border-color');
const lineColor = document.querySelector('#line-color');
const largeHandColor = document.querySelector('#large-hand-color');
const secondHandColor = document.querySelector('#second-hand-color');

function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');

    // Setup canvas
    ctx.save(); // save the default state
    ctx.clearRect(0, 0, 500, 500); 
    // first 2 where to start
    // last 2 there are that ou want to clear, in this case the whole canvas
    ctx.translate(250, 250); // make 0 , 0 -> 250, 250
    ctx.rotate(-Math.PI / 2) // roate clock -90deg -PI/2

    // Set Default styles
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw Clock face/border
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColor.value;
    ctx.fillStyle = faceColor.value;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // Draw hour lines
    ctx.save();
    ctx.strokeStyle = lineColor.value;
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6); // 6 -> 12 lines 4 -> 8 lines 3 -> 6 lines
        ctx.moveTo(100,0);
        ctx.lineTo(120,0);
        ctx.stroke();
    }
    ctx.restore();

    // Draw minute lines
    ctx.save();
    ctx.strokeStyle = lineColor.value;
    ctx.lineWidth = 4;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) { // if -> not minute line where the hour line is
            ctx.beginPath();
            ctx.moveTo(117,0);
            ctx.lineTo(120,0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30); // 6 -> 12 lines 4 -> 8 lines 3 -> 6 lines
    }
    ctx.restore();

    // Get cureent time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();
    console.log(`${hr}:${min}:${sec}`);

    // Draw hour hand
    ctx.save();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Draw minute hand
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.restore();

    // Draw Second Hand
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = secondHandColor.value;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    
    ctx.fillStyle = secondHandColor.value;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore(); // restore default state

    requestAnimationFrame(clock);
}
requestAnimationFrame(clock)

document.querySelector('#save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
});

