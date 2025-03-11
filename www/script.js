function changeText() {
    document.getElementById('greeting').innerText = 'Hello, JavaScript!';
}

async function checkForLiveReload(){
    try {
        const LiveUpdates = window.Capacitor.Plugins.LiveUpdates;
        console.log('LiveUpdates: ', LiveUpdates);
    
        const result = await LiveUpdates.sync();

        console.log('result: ', result);

        if(result.activeApplicationPathChanged){
            alert("Perform Live Update")
            await LiveUpdates.reload();
        }
    } catch (error) {
        console.log('LiveUpdates error: ', error);
    }
}

checkForLiveReload();