function collectHelix(channel_id) {
    fetch(
        'https://api.twitch.tv/helix/users/?id=' + channel_id,
        {
            method: 'GET',
            headers: helix,
        }
    )
    .then(resp => {
        return resp.json();
    })
    .then(resp => {
        document.getElementById('helix_log_channel'.textContent = '';
        document.getElementById('helix_log_channel').append(table);

        var table = document.createElement('table');
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
        document.getElementById('helix_log_user'.textContent = '';
        document.getElementById('helix_log_user').append(table);

        var table = document.createElement('table');
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
