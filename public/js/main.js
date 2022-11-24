window.onload = () => {
    const socket = io.connect();

    socket.on("messages", msjs => {
        renderMessages(msjs)
    })

    socket.on("productos", listaProductos => {
        productosTabla(listaProductos)
    })
}

    function addProducto() {
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const url = document.getElementById('url').value;
        
        const nuevoProducto = {
            nombre: nombre,
            precio: precio,
            url: url
        }
        
        socket.emit('new-product', nuevoProducto);
    }
    
    
    const productosTabla = async (listProd) => {
        let htmlProductos = ''
        const prodTabla = await fetch('../table.pug')
        
        if (listProd.length === 0){
            htmlProductos = `<h2>No se encontraron productos.</h2>`
        } else{
            htmlProductos = render(prodTabla, {listProd})
        }
        
        document.getElementById('table').innerHTML = htmlProductos; 
    }
    
    socket.on('productos', function(data) {
        render(data);
    })
    

    
    //chat
    function addMessage() {
        const email = document.getElementById('email').value;
        const date = new Date();
        const mensaje = document.getElementById('mensaje').value;
      
        const nuevoMensaje = {
          email: email,
          date: date,
          mensaje: mensaje
        };
      
        socket.emit('new-message', nuevoMensaje);
        //return false;
    }
    
    const renderMessages = async (messages) => {
        let htmlChat = ''
        const chatMessages = await fetch('../messages.pug')
        
        if (messages.length === 0){
            htmlProductos = `<h2>No hay mensajes</h2>`
        } else{
            htmlChat = render(chatMessages, {messages})
        }
        
        document.getElementById('messages').innerHTML = htmlChat; 
    }
    
    socket.on('menssages', function(data) {
        render(data);
    });

    const formChat = document.getElementById('formChat')
    formChat.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log("Error es:", e)
        addMessage()
    })

    