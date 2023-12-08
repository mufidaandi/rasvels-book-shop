var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return null; // Return null if the parameter is not found
};

// Example usage
var bookId = getUrlParameter("bookId");
console.log(bookId); // This will log "1" based on the provided URL

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// Function to fetch book details by ID
function getBookById(bookId) {
  // Replace this with your actual API endpoint
  return fetch(`getBookById/${bookId}`)
    .then((response) => response.json())
    .then((data) => data);
}

// Function to add a book to the cart
function addBookToCart(book) {
  // Replace this with your actual API endpoint or cart handling logic
  console.log("Adding book to cart:", book);
}

jQuery(document).ready(function () {
  getBookById(bookId).then(function (book) {
    console.log(book);
    document.title = book.Title + " - Your Book Store";
    jQuery("#product-name").text(book.Title);
    jQuery("#product-author").text("by " + book.Author);
    jQuery("#product-description").html(book.Description);
    jQuery("#product-price").text("$" + book.Price);
    jQuery("#product-quantity").text(book.Quantity);

    var strImage =
      '<img class="img-responsive" src="' + book.Image + '" alt="">';

    // Set the image directly to the product-images-hover container
    jQuery("#product-images-hover").html(strImage);

    var strRating = "";
    for (let i = 0; i < book.Rating; i++) {
      strRating += '<i class="ecicon eci-star fill"></i>';
    }
    for (let i = 0; i < 5 - book.Rating; i++) {
      strRating += '<i class="ecicon eci-star-o"></i>';
    }
    jQuery("#product-rating").html(strRating + " " + book.Rating);

    /*----------------------------- Qty Plus Minus Button  ------------------------------ */
    var QtyPlusMinus = jQuery(".qty-plus-minus");
    QtyPlusMinus.prepend('<div class="dec ec_qtybtn">-</div>');
    QtyPlusMinus.append('<div class="inc ec_qtybtn">+</div>');

    jQuery("body").on("click", ".ec_qtybtn", function () {
      // jQuery(".ec_qtybtn").on("click", function() {
      var $qtybutton = jQuery(this);
      var QtyoldValue = $qtybutton.parent().find("input").val();
      if ($qtybutton.text() === "+") {
        var QtynewVal = parseFloat(QtyoldValue) + 1;
      } else {
        if (QtyoldValue > 1) {
          var QtynewVal = parseFloat(QtyoldValue) - 1;
        } else {
          QtynewVal = 1;
        }
      }
      $qtybutton.parent().find("input").val(QtynewVal);
    });
  });
});

function addToCart() {
  getBookById(bookId).then(function (book) {
    console.log(book);
    book.Image
    var item = {};
    item.id = bookId;
    item.name = jQuery("#product-name").text();
    item.price = jQuery("#product-price").text().substring(1);
    item.quantity = Number(jQuery("#product-quantity-selected").val());
    item.image = book.Image;
    addItemToCart(item);
  });
  
}
