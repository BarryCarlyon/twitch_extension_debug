document.getElementById('share').addEventListener('click', (e) => {
    e.preventDefault();

    window.Twitch.ext.actions.requestIdShare();
});

let actions_page = document.getElementById('actions_page');

let follow_button = document.createElement('button');
actions_page.append(follow_button);
    follow_button.textContent = 'window.Twitch.ext.actions.followChannel';
    follow_button.addEventListener('click', (e) => {
        window.Twitch.ext.actions.followChannel(channel_name);
    });

let onFollow = document.createElement('div');
actions_page.append(onFollow);

    let onFollowp = document.createElement('p');
    onFollow.append(onFollowp);
    onFollowp.textContent = 'onFollow data';

    let onFollowt = document.createElement('table');
    onFollow.append(onFollowt);

        let onFollowtr = document.createElement('tr');
        onFollowt.append(onFollowtr);
        let onFollowtd = document.createElement('td');
        onFollowtr.append(onFollowtd);
        onFollowtd.textContent = 'NoData';

window.Twitch.ext.actions.onFollow((didFollow, channel_name)=> {
    master_log('Read actions.onFollow');
    iterateObject(onFollowt, {
        didFollow,
        channel_name
    });
});

let minimise_button = document.createElement('button');
actions_page.append(minimise_button);
    minimise_button.textContent = 'window.Twitch.ext.actions.minimize';
    minimise_button.addEventListener('click', (e) => {
        window.Twitch.ext.actions.minimize();
    });

let requestID_button = document.createElement('button');
actions_page.append(requestID_button);
    requestID_button.textContent = 'window.Twitch.ext.actions.requestIdShare';
    requestID_button.addEventListener('click', (e) => {
        window.Twitch.ext.actions.requestIdShare();
    });
