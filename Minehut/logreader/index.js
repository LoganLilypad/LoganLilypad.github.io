function init(){
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
    let warn = document.getElementById('warn');
    let err = document.getElementById('err');
    let notice = document.getElementById('notice');

    wipeTable('warn');
    wipeTable('err');
    wipeTable('notice');

    datRaw = event.target.result;
    dat = datRaw.split('\n');

    for (let i = 0; i < dat.length; i++) {
        if (dat[i].indexOf('[Server thread/WARN]') !== -1 && dat[i].indexOf('moved too quickly!') === -1 && dat[i].indexOf('moved wrongly!') === -1) {
            let newRow = warn.insertRow(-1).insertCell(0);
            newRow.innerHTML = dat[i].split('[Server thread/WARN]: ')[1];
            newRow.style.color = 'yellow';
        } else if (dat[i].indexOf('[Paper Watchdog Thread/ERROR]') !== -1) {
            let newRow = err.insertRow(-1).insertCell(0);
            newRow.innerHTML = dat[i].split('[Paper Watchdog Thread/ERROR]: ')[1];
            newRow.style.color = 'red';
        } else if (dat[i].indexOf('[Server thread/ERROR]') !== -1) {
            let newRow = err.insertRow(-1).insertCell(0);
            newRow.innerHTML = dat[i].split('[Server thread/ERROR]: ')[1];
            newRow.style.color = 'red';
        }



        if (dat[i].indexOf('[Server thread/ERROR]: Could not load') !== -1) {
            let newRow = notice.insertRow(-1).insertCell(0);
            newRow.innerHTML = dat[i].split('\'')[1] + ' is missing the dependency ' + dat[i+1].split(': ')[1];
            newRow.style.color = '#00FF00';
        } else if (dat[i].indexOf('java.lang.IllegalArgumentException') !== -1) {
            let newRow = notice.insertRow(-1).insertCell(0);
            if (dat[i].indexOf('Hash is too long') !== -1) {
                newRow.innerHTML = 'The resource pack hash is too long (' + dat[i].split('java.lang.IllegalArgumentException: ')[1] + ')';
                newRow.style.color = '#00FF00';
            } else {
                newRow.innerHTML = 'Java error:' + dat[i].split('java.lang.IllegalArgumentException: ')[1];
                newRow.style.color = '#00FF00';
            }
        }
    }
}

function wipeTable(id) {
    console.log('clearing ' + id);
    const tableHeaderRowCount = 1;
    const table = document.getElementById(id);
    const rowCount = table.rows.length;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}
