// Variables
const formProductos = document.getElementById('form-productos');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const tbodyProductos = document.getElementById('productos');

// Eventos
formProductos.addEventListener('submit', añadirProducto);
window.addEventListener('load', mostrarProductos);
tbodyProductos.addEventListener('click', eliminarProducto);
tbodyProductos.addEventListener('click', actualizarProducto);


// Funciones
function añadirProducto(e) {
    e.preventDefault();

    const datos = new FormData();
    datos.append('nombre', nombre.value);
    datos.append('precio', precio.value);
    
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'insertar_producto.php');

    xhr.addEventListener('load', () => {
        formProductos.reset();
        mostrarProductos();
    });

    xhr.send(datos);

}

function mostrarProductos() {

    const xhr = new XMLHttpRequest();

    xhr.open('get', 'lista_productos.php', true);

    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            const productos = JSON.parse(this.responseText);
            let template = document.createDocumentFragment();
            productos.forEach(producto => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td class="nombre-producto">${producto.nombre}</td>
                    <td class="precio-producto">${producto.precio}</td>
                    <td>
                        <a href="#" class="btn btn-danger delete" data-id="${producto.id}">Eliminar</a>
                    </td>
                    <td>
                        <a href="#" class="btn btn-warning update" data-id="${producto.id}">Editar</a>
                    </td>
                `;
                template.appendChild(fila);
            });
            tbodyProductos.innerHTML = '';
            tbodyProductos.appendChild(template);
        }
    }

    xhr.send();

}

function eliminarProducto(e) {
    if(e.target.classList.contains('delete')) {

        e.preventDefault();

        const datos = new FormData();

        datos.append('id', e.target.dataset.id);
        
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', 'eliminar_producto.php', true);

        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                mostrarProductos();
            }
        }

        xhr.send(datos);

    }
}

function actualizarProducto(e) {
    if(e.target.classList.contains('update') || e.target.classList.contains('updateOk')) {

        e.preventDefault();
        const nombre = e.target.parentElement.parentElement.querySelector('.nombre-producto');
        const precio = e.target.parentElement.parentElement.querySelector('.precio-producto');

        if(e.target.classList.contains('update')) {

            nombre.setAttribute('contenteditable', true);
            precio.setAttribute('contenteditable', true);
            e.target.classList.remove('update', 'btn-warning');
            e.target.classList.add('updateOk', 'btn-success');
            e.target.textContent = 'Listo';

        }else {

            const datos = new FormData();
            datos.append('nombre', nombre.textContent);
            datos.append('precio', precio.textContent);
            datos.append('id', e.target.dataset.id);

            nombre.removeAttribute('contenteditable');
            precio.removeAttribute('contenteditable');
            e.target.classList.remove('updateOk', 'btn-success');
            e.target.classList.add('update', 'btn-warning');
            e.target.textContent = 'Editar';

            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'actualizar_producto.php', true);
            
            xhr.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200) {
                    mostrarProductos(); // No es tan necesario XD
                }
            }

            xhr.send(datos);

        }

    }
}