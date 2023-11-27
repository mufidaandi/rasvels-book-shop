$(document).ready(function() {
    displayCart();
    // console.log(getAllCartItems());
    // localStorage.removeItem('userCart');


    // Check if there is no items in the cart, system will not be redirect to checkout page.
    const myform = document.getElementById("cartForm");
    myform.addEventListener("submit", function(event) {
    // prevent the form from submitting immediately
    event.preventDefault();
    
    // clear all items in the cart
    var userCart = getAllCartItems();
    if (userCart === null || userCart.length == 0){
      alert("Your cart is lonely! Give it some company by adding your favorite pet items from our collection.");
    } else{
      myform.submit();
    }
    });
  });