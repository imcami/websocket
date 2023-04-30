
const socket = io();

  // Agregar un nuevo producto
  const addProductForm = document.querySelector('#add-product-form');
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    socket.emit('add-product', { name, price });
    event.target.reset();
  });

  // Escuchar el evento new-product
  socket.on('new-product', (product) => {
    const li = document.createElement('li');
    li.setAttribute('data-product-id', product.id);
    li.innerHTML = `${product.name} - $${product.price} <button class="delete-btn">Delete</button>`;
    document.querySelector('#product-list').appendChild(li);
  });

  // Actualizar un producto
  const productItems = document.querySelectorAll('#product-list li');
  productItems.forEach((item) => {
    const productId = item.getAttribute('data-product-id');
    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener
  })
