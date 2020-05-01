if ('WebSocket' in window) {
    function conn() {
    
    var ws = new WebSocket('ws://167.172.158.214:8080');
     
    ws.onopen = function() {

        var pin;

        ws.send('P;' + document.getElementById('pin').value);

        let lastMotion = 0;
        window.addEventListener('devicemotion', (event) => {
            if (window.ready) {
                pin = document.getElementById('pin').value;
                const currentTimestamp = new Date().getTime();
                if (currentTimestamp - lastMotion > 50) {
                    const rotation = {
                        x: Math.round((event.accelerationIncludingGravity.x * 10) * 20) / 20,
                        y: Math.round((event.accelerationIncludingGravity.y * 10) * 20) / 20,
                        z: Math.round((event.accelerationIncludingGravity.z * 10) * 20) / 20,
                    };
        
                    ws.send('UR;' + pin + ';' + [...Object.values(rotation)].join(';'));
                
                    lastMotion = currentTimestamp;
                }
            }
        });
    };
     
    ws.onmessage = function (evt) { 
        var data = evt.data.split(';');
        if (data[0] === 'SUCC') {
            alert('Connected to user ' + data[1]);
            window.ready = true
        } else if (data[0] === 'ERR') {
           alert('That pin does not exist, bringing you back to main page...');
           window.location = '../';
       }
    };
     
    ws.onclose = function() { 
       alert('Lost connection to server'); 
    };
    }
} else {
    alert('Seems like your browser does not support websockets which is required to use this. Please try using a different browser or updating your current one');
    window.location = '../';
}
