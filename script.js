fetch('https://status.discordapp.com/api/v2/incidents/unresolved.json')
.then(resp=>resp.text())
.then(text => {
    var json = JSON.parse(
        text
    );
    console.debug(json);
    var text = document.getElementById('text');
    var updates = document.getElementById('updates');
    if(json.incidents.length > 0) {
        json.incidents[0].incident_updates.sort(function(a,b){
            return new Date(a.created_at) - new Date(b.created_at);
        });
        text.innerHTML = "Yup. Discord sollte down sein.";
        updates.innerHTML = "<h2>Updates</h2>"
        json.incidents[0].incident_updates.forEach(a => {
            updates.innerHTML += `${a.body}<br>`;
        });
    } else {
        text.innerHTML = "Das Discord-Team hat noch nichts gesagt.";
    };
})
.catch((e) => {
    document.getElementById('text').innerHTML = "Entweder die Status-Seite ist down, oder Patrick war zu dumm die API zu benutzen."
})


