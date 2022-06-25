/* Tell the JS Helper to load the config */
window.Twitch.ext.configuration.onChanged(() => {
    loadSegment('global');
    loadSegment('broadcaster');
    loadSegment('developer');
});

function loadSegment(segment) {
    let el = document.getElementById('config_' + segment);
    let elr = document.getElementById('config_' + segment + '_raw');

    if (window.Twitch.ext.configuration[segment]) {
        if (window.Twitch.ext.configuration[segment].content) {
            let this_config = '';
            try {
                this_config = JSON.parse(window.Twitch.ext.configuration[segment].content);
            } catch (e) {
                console.log('Config', segment, e);
                el.textContent = 'Failed to parse JSON';
                return;
            }

            let textarea = document.createElement('textarea');
            elr.textContent = '';
            elr.append(textarea);
            textarea.setAttribute('readonly', 'readonly');
            textarea.value = window.Twitch.ext.configuration[segment].content;

            let table = document.createElement('table');
            el.textContent = '';
            el.append(table);
            for (var k in this_config) {
                let r = document.createElement('tr');
                table.append(r);

                let d = document.createElement('td');
                r.append(d);
                d.textContent = k;

                let v = document.createElement('td');
                r.append(v);
                if (typeof this_config[k] != 'string') {
                    v.textContent = JSON.stringify(k);
                } else {
                    v.textContent = k;
                }
            }
        } else {
            el.textContent = 'No Config Content';
        }
    } else {
        el.textContent = 'No Config';
    }
}

function considerConfig(channel_id) {
    if (window.Twitch.ext.viewer.id == channel_id) {
        document.getElementById('config_setter').addEventListener('submit', (e) => {
            e.preventDefault();
            let conf = JSON.stringify(document.getElementById('the_config').value);
            window.Twitch.ext.configuration.set('broadcaster', '', JSON.stringify(conf));
        });
    } else {
        document.getElementById('config_setter').style.display = 'none';
    }
}
