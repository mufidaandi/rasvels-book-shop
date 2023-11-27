const updateCartButton = document.getElementById('update-cart');
updateCartButton.addEventListener('click', () => {
  // get all the input fields for quantity
  const quantityInputs = document.querySelectorAll('input[type="number"]');
  // loop through the inputs and calculate the total for each row
  quantityInputs.forEach((input) => {
    const quantity = input.value;
    const price = input.parentElement.previousElementSibling.textContent.slice(1);
    const total = quantity * price;
    // update the total cell for the row
    input.parentElement.nextElementSibling.textContent = '$' + total;
  });
});
