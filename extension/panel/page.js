document.getElementById('pagecontrol').addEventListener('click', (e) => {
    let target = e.target.getAttribute('id').replace('go_', '');
    let pages = document.getElementById('pages').getElementsByClassName('page');
    for (let x=0;x<pages.length;x++) {
        if (pages[x].getAttribute('id') == target) {
            pages[x].classList.add('active');
        } else {
            pages[x].classList.remove('active');
        }
    }
});
