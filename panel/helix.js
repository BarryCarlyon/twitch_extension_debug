function collectHelix() {
    //if (!window.Twitch.ext.viewer.id) {
    if (!window.Twitch.ext.viewer.isLinked) {
        return;
    }
    fetch(
        'https://api.twitch.tv/helix/users/?id=' + window.Twitch.ext.viewer.id,
        {
            method: 'GET',
            headers: helix,
        }
    )
    .then(resp => {
        return resp.json();
    })
    .then(resp => {
        var table = document.createElement('table');
        document.getElementById('helix_log').append(table);
        for (var key in resp.data[0]) {
            var tr = document.createElement('tr');
            table.append(tr);
            var td = document.createElement('td');
            td.textContent = key;
            tr.append(td);
            var td = document.createElement('td');
            td.textContent = resp.data[0][key];
            tr.append(td);
        }
    })
    .catch(err => {
        console.log(err);
    });
}
