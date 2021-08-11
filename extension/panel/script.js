function master_log(log) {
    let el = document.getElementById('master_log_table');
    if (el) {
        let r = document.createElement('tr');
        el.prepend(r);
        let t = document.createElement('td');
        r.append(t);

        let n = new Date();

        t.textContent = n.getHours() + ':' + n.getMinutes() + ':' + n.getSeconds();
        let d = document.createElement('td');
        r.append(d);
        d.textContent = log;
    }
}


var p = {};
var params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
    p[key] = value;
});
iterateObject(document.getElementById('query_params'), p);
master_log('Read query_params');

let helix = {};
window.Twitch.ext.onAuthorized((auth) => {
    master_log('Read onAuthorized');
    document.getElementById('onAuthorized').textContent = new Date();

    iterateObject(document.getElementById('onAuthorizedData'), auth);

    helix = {
        'Client-ID': auth.clientId,
        'Authorization': 'Extension ' + auth.helixToken
    }

    if (window.Twitch.ext.viewer.isLinked) {
        document.getElementById('isLinked').textContent = 'isLinked';
    } else {
        document.getElementById('isLinked').textContent = 'isUnLinked';
    }
    master_log('Read isLinked');

    iterateObject(document.getElementById('viewer'), window.Twitch.ext.viewer);
    window.Twitch.ext.viewer.onChanged(() => {
        master_log('Read viewer changed');
        iterateObject(document.getElementById('viewer_onchanged'), {});
    });
    master_log('Read viewer');

    iterateObject(document.getElementById('features'), window.Twitch.ext.features);
    window.Twitch.ext.features.onChanged((dat) => {
        master_log('Read features changed');
        //document.getElementById('features_onchanged', JSON.stringify(dat));
        iterateObject(document.getElementById('features_onchanged'), dat);
    });
    master_log('Read features');

    bindListens();

    let kids = document.getElementsByClassName('whisper_target');
    for (let x=0;x<kids.length;x++) {
        kids[x].textContent = window.Twitch.ext.viewer.opaqueId;
    }

    collectHelix(auth.channelId);
});

window.Twitch.ext.onContext((ctx) => {
    console.log(ctx);
    // don't master log coz SPAM
    iterateObject(document.getElementById('context'), ctx);
});
window.Twitch.ext.onError((err) => {
    master_log('Read onError! Check console');
    console.error('TWITCH EXT ERROR', err);
    document.getElementById('error').textContent(err);
});
window.Twitch.ext.onHighlightChanged((isHighlighted) => {
    master_log('Read onHighlightChanged changed: ' + isHighlighted);
    iterateObject(document.getElementById('onHighlightChanged'), {
        isHighlighted
    });
});
window.Twitch.ext.onVisibilityChanged((isVisible, context) => {
    master_log('Read onVisibilityChanged changed: ' + isVisible);
    iterateObject(document.getElementById('onVisibilityChanged'), {
        isVisible,
        context
    });
});

function iterateObject(target, obj) {
    master_log(`iterateObject: ${target.getAttribute('id')}`);

    target.textContent = '';
    var r = document.createElement('tr');
    target.append(r);
    var d = document.createElement('td');
    r.append(d);
    var d = document.createElement('td');
    r.append(d);
    d.setAttribute('colspan', 2);
    d.textContent = new Date();
    for (var k in obj) {
//        console.log(k, typeof obj[k], obj[k]);

        var r = document.createElement('tr');
        target.append(r);
        var d = document.createElement('td');
        r.append(d);
        d.textContent = k;

        var d = document.createElement('td');
        r.append(d);
        d.textContent = typeof obj[k];

        var d = document.createElement('td');
        r.append(d);
        if (typeof obj[k] == 'string' || typeof obj[k] == 'boolean' || typeof obj[k] == 'number') {
            d.textContent = obj[k];
        } else if (typeof obj[k] == 'object') {
            //d.setAttribute('id', k + '_data');
            var t = document.createElement('table');
            d.append(t);
            iterateObject(t, obj[k]);
        } else {
            d.textContent = 'No Process', typeof obj[k];
        }
    }
}
