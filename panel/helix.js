function collectHelix(channel_id) {
    master_log('Call Helix with HelixToken for channel: ' + channel_id);

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
        master_log('Got Helix for channel');
        document.getElementById('helix_log_channel').textContent = '';

        var table = document.createElement('table');
        document.getElementById('helix_log_channel').append(table);

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
        master_log('Got Helix for channel: failed');
        console.log(err);
    });


    if (!window.Twitch.ext.viewer.isLinked) {
        master_log('Call Helix with HelixToken for user: No Not Logged In');
        return;
    }

    master_log('Call Helix with HelixToken for user: ' + window.Twitch.ext.viewer.id);
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
        master_log('Got Helix for user');
        document.getElementById('helix_log_user').textContent = '';

        var table = document.createElement('table');
        document.getElementById('helix_log_user').append(table);

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
        master_log('Got Helix for user: failed');
        console.log(err);
    });
}
