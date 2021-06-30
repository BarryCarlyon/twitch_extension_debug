var p = {};
var params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
    p[key] = value;
});
iterateObject(document.getElementById('query_params'), p);

window.Twitch.ext.onAuthorized((auth) => {
    document.getElementById('onAuthorized').textContent = new Date();

    iterateObject(document.getElementById('onAuthorizedData'), auth);

    if (window.Twitch.ext.viewer.isLinked) {
        document.getElementById('isLinked').textContent = 'isLinked';
    } else {
        document.getElementById('isLinked').textContent = 'isUnLinked';
    }

    iterateObject(document.getElementById('viewer'), window.Twitch.ext.viewer);
    window.Twitch.ext.viewer.onChanged((dat) => {
        document.getElementById('viewer_onchanged', JSON.stringify(dat));
    });

    iterateObject(document.getElementById('features'), window.Twitch.ext.features);
    window.Twitch.ext.features.onChanged((dat) => {
        console.log('FEATURES CHANGED', dat);
        document.getElementById('features_onchanged', JSON.stringify(dat));
    });
});

window.Twitch.ext.onContext((ctx) => {
    iterateObject(document.getElementById('context'), ctx);
});
window.Twitch.ext.onError((err) => {
    console.error(err);
    document.getElementById('error').textContent(err);
});
window.Twitch.ext.onHighlightChanged((isHighlighted) => {
    iterateObject(document.getElementById('onHighlightChanged'), isHighlighted);
});
window.Twitch.ext.onVisibilityChanged((isHighlighted) => {
    iterateObject(document.getElementById('onVisibilityChanged'), isHighlighted);
});

function iterateObject(target, obj) {
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
            iterateObject(t, obj[k]);
        }
    }
}

document.getElementById('share').addEventListener('click', (e) => {
    e.preventDefault();

    window.Twitch.ext.actions.requestIdShare();
});
