const socket = io.connect();

function addProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const url = document.getElementById('url').value;
    //console.log(nombre, mensaje)
    
    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        url: url
    }
    
    socket.emit('new-product', nuevoProducto);
    //return false;
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

// function render(data) {
//     //console.log(data)
//     const html = data.map((element) => {
//         console.log(element)
//         return(`include ./table`)
//         //return('../table.pug')
//     })

//     document.getElementById('table').innerHTML = html;
// }

socket.on('productos', function(data) {
    render(data);
})


//chat
function addMessage() {
    const email = document.getElementById('email').value;
    const date = new Date()
    const mensaje = document.getElementById('mensaje').value;
  
    const nuevoMensaje = {
      email: email,
      date: date,
      mensaje: mensaje
    };
  
    socket.emit('new-message', nuevoMensaje);
    return false;
  }

  function render(data) {
    const html = data.map((elem) => {
      return (`
        <div>
          <p style="color: blue;"><strong>${elem.email}</strong><p/>
          <p style="color: brown;">${elem.date}</p>
          <p style="color: green;"><em>${elem.mensaje}</em></p>
        </div>
      `);
    }).join(' ');
  
    document.getElementById('messages').innerHTML = html;
  }
  
  socket.on('mensajes', function(data) {
    render(data);
  });
