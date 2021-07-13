// Limpiar el carrito al comprar productos.
const renderCart = ()=>{
    if(localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart = [];
        localStorage.setItem('cart',JSON.stringify(cart));

        const notification = document.getElementById('notification');
        notification.classList.add('d-none');
        notification.innerHTML = cart.length;
    }
    
}