/* https://dev.twitch.tv/docs/extensions/reference#helper-bits */
let bits_products = document.getElementById('bits_products');
let bits_products_count = document.getElementById('bits_products_count');

document.getElementById('get_bits_products').addEventListener('click', (e) => {
    e.preventDefault();

    master_log('Loading Bits Products');
    window.Twitch.ext.bits.getProducts()
        .then(products => {
            master_log(`Got Products: ${products.length}`);
            //console.log(products);
            bits_products_count.textContent = `Product Count: ${products.length}`;
            bits_products.textContent = '';

            products.forEach(product => {
                let a_product = document.createElement('div');
                bits_products.append(a_product);

                let { cost, displayName, sku, inDevelopment } = product;
                let { amount, type } = cost;

                a_product.classList.add('bits_product');
                if (inDevelopment) {
                    a_product.classList.add('inDevelopment');
                }

                if (type == 'bits') {
                    var sp = document.createElement('div');
                    a_product.append(sp);
                    sp.textContent = `${displayName} - ${sku}`;

                    if (inDevelopment) {
                        var sp = document.createElement('span');
                        a_product.append(sp);
                        sp.style.float = 'right';
                        sp.textContent = 'IsDev';
                    }

                    var sp = document.createElement('div');
                    a_product.append(sp);
                    sp.textContent = amount + ' bits';

                    var sp = document.createElement('button');
                    a_product.append(sp);
                    sp.classList.add('use_bits');
                    sp.setAttribute('sku', sku);
                    sp.textContent = `Use Bits on ${displayName}`;
                }
            });
        })
        .catch(err => {
            master_log('Failed to load Bits Products');
        });

//    window.Twitch.ext.bits.getProducts((products) => {
//        console.log(products);
//    });
});

window.Twitch.ext.bits.onTransactionCancelled(() => {
    master_log('Transaction was Cancelled');
});
window.Twitch.ext.bits.onTransactionComplete((transaction) => {
    master_log('Transaction was completed');
    master_log('Initiator: ' + transaction.initiator);

    iterateObject(document.getElementById('onTransactionComplete'), transaction);
});

// window.Twitch.ext.bits.setUseLoopback

bits_products.addEventListener('mouseover', (e) => {
    window.Twitch.ext.bits.showBitsBalance();
});
bits_products.addEventListener('click', (e) => {
    if (e.target.classList.contains('use_bits')) {
        window.Twitch.ext.bits.useBits(e.target.getAttribute('sku'));
    }
});
