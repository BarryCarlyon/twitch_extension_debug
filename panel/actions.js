document.getElementById('share').addEventListener('click', (e) => {
    e.preventDefault();

    window.Twitch.ext.actions.requestIdShare();
});
