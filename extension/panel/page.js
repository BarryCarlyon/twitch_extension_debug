document.getElementById('pagecontrol').addEventListener('change', (e) => {
    let target = e.target.value;
    console.log('Chnage page to', target);
    let pages = document.getElementById('pages').getElementsByClassName('page');
    for (let x=0;x<pages.length;x++) {
        if (pages[x].getAttribute('id') == target) {
            pages[x].classList.add('active');
        } else {
            pages[x].classList.remove('active');
        }
    }
});
