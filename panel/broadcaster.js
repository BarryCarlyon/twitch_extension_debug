sendchat.addEventListener('submit', (e) => {
    e.preventDefault();

    sendChat();
});

async function sendChat() {
    master_log('Sending Chat Message');

    let req = await fetch(
        'https://api.twitch.tv/helix/extensions/chat',
        {
            method: 'POST',
            headers: {
                ...gojwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                broadcaster_id: channelId,
                text: 'Test message',
                extension_id: gojwt['Client-ID'],
                extension_version: extensionVersion
            })
        }
    );

    //master_log(`Sent Chat Message: ${req.status}`);
    if (req.status == 204) {
        master_log('Send Chat Message OK');
        return;
    }
    master_log(`Failed to send chat message: ${req.status}`);
    let data = await req.json();
    master_log(`Response: ${data.message}`);
}
