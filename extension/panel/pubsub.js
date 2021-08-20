function bindListens() {
    master_log('Binding listens');

    master_log('Listen to: global');
    window.Twitch.ext.listen(
        'global',
        (target, contentType, message) => {
            master_log('Recv global message');
            pubSub(target, message);
        }
    );

    master_log('Listen to: broadcast');
    window.Twitch.ext.listen(
        'broadcast',
        (target, contentType, message) => {
            master_log('Recv broadcast message');
            pubSub(target, message);
        }
    );

    let topic = 'whisper-' + window.Twitch.ext.viewer.opaqueId;
    master_log('Listen to: ' + topic);
    window.Twitch.ext.listen(
        topic,
        (target, contentType, message) => {
            master_log('Recv whisper message');
            pubSub(target, message);
        }
    );
}

let pubSubEl = document.getElementById('pubsub_log');
function pubSub(target, message) {

    let jmessage = {};
    try {
        jmessage = JSON.parse(message);
    } catch (e) {
        line.textContent = target + ': Failed to parse JSON';
        return;
    }

    let textarea = document.createElement('textarea');
    pubSubEl.prepend(textarea);
    textarea.setAttribute('readonly', 'readonly');
    textarea.value = content;

    let line = document.createElement('div');
    pubSubEl.prepend(line);
    line.textContent = target;
}
