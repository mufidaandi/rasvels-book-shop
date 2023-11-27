var subTotal = 0;
var totalAmount = 0;

function addItemToCart(item) {
  if (storedUser) {
    var myJsonData = localStorage.getItem('userCart');
    var userCart = JSON.parse(myJsonData);
    if(userCart === null){
      userCart = [];
      userCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      });
    } else {
        existingItem = userCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + Number(item.quantity);
      } else {
        userCart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        });
      }
    }
    
    localStorage.setItem("userCart", JSON.stringify(userCart));
    alert('Item added to cart!');
    } else {
      alert('Please log in to add items to cart.');
    }
  
  }


  function getAllCartItems(){
    var myJsonData = localStorage.getItem("userCart");
    var userCart = JSON.parse(myJsonData);
    return userCart;
  }

  function updateCart(cartItems) {
    localStorage.setItem("userCart", JSON.stringify(cartItems));
    console.log(cartItems);
    
  }
  function updateTotal() {
    var items = getAllCartItems();
    var subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += items[i].price * items[i].quantity;
    }
    var totalAmount = subTotal + 9.99; // Add shipping fee of $9.99
    $(".sub-total").text("$" + subTotal.toFixed(2));
    $(".total-amount").text("$" + totalAmount.toFixed(2));
  }
  
  function displayCart(){
    const tableContainer = $('.cart-table-content table tbody');
    var items = getAllCartItems();
    var subTotal = 0;
    if(storedUser) {
      console.log(items);
      if (items != null && items.length != 0) {
        
        for (let i = 0; i < items.length; i++) {
          const row = $('<tr></tr>');
          const colProduct = $('<td class="cart-pro-name"></td>');
          const colProductLink = $('<a>');
          colProductLink.attr('href', "product-detail.html?productId=" + items[i].id );
  
          // Product image and name
          const productImg = $('<img class="cart-pro-img mr-4">');
          productImg.attr('src', items[i].image);
          productImg.attr('alt', items[i].name);
          colProductLink.append(productImg);
          colProductLink.append(items[i].name);
  
          colProduct.append(colProductLink); // img and name
  
          // Product price
          const colProductPrice = $('<td class="cart-pro-price"></td>');
          const priceText = $('<span></span>');
          priceText.text("$"+ items[i].price);
          colProductPrice.append(priceText);
  
          // Display quantity
          const colProductQty = $('<td class="cart-pro-qty"></td>');
          const productQty = $('<div class="cart-qty-plus-minus"></div>');
          const productQtyInput = $('<input>');
          productQtyInput.attr('type', 'number');
          productQtyInput.attr('name', 'cartqtybutton');
          productQtyInput.attr('min', 1);
          productQtyInput.attr('value', items[i].quantity);
          productQtyInput.on('input', function() {
            const newQuantity = parseInt(productQtyInput.val());
            items[i].quantity = newQuantity;
            const newSubTotal = items[i].price * newQuantity;
            colProductTotal.text("$" + newSubTotal.toFixed(2));
            updateCart(items);
            updateTotal();
          });
          productQty.append(productQtyInput);
          colProductQty.append(productQty);
  
          // Subtotal
          const colProductTotal = $('<td class="cart-pro-subtotal"></td>');
          var productSubTotal = items[i].price * items[i].quantity;
          colProductTotal.append("$" + productSubTotal.toFixed(2));
  
          subTotal += productSubTotal;
  
          // Delete button
          const removeContainer = $('<td data-label="Remove" class="cart-pro-remove"> </td>');
          const removeIcon = $('<img class="trash-icon" src="images/cart/trash.png" width="25%" height="25%">');
          removeContainer.append(removeIcon);
  
  
          row.append(colProduct);
          row.append(colProductPrice);
          row.append(colProductQty);
          row.append(colProductTotal);
          row.append(removeContainer);
          tableContainer.append(row);
        }
      } else {
        const row = $('<tr></tr>');
        const emptyCart = $('<p class="empty-cart">You have nothing in your cart.</p>');
        row.append(emptyCart);
        tableContainer.append(row);
      }
    } else {
      const row = $('<tr></tr>');
      const emptyCart = $('<p class="empty-cart">Please log in to add items to cart.</p>');
      row.append(emptyCart);
      tableContainer.append(row);
    }
    
    totalAmount = subTotal + 9.99;
    $(".sub-total").text("$" + subTotal.toFixed(2));
    $(".total-amount").text("$" + totalAmount.toFixed(2));

    // Add click event listener to trash icons
    $('.trash-icon').on('click', function() {
      // Get the index of the item to remove
      const index = $(this).closest('tr').index();
      
      // Get the array of cart items and remove the item at the given index
      const items = getAllCartItems();
      items.splice(index, 1);
      
      // Update the cart and total amount
      updateCart(items);
      //updateTotal();
      
      // Re-display the updated cart
      $('.cart-table-content table tbody').text(""); 
      displayCart();
    });
  }


  
  