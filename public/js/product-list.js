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
  return false;
};

$(document).ready(function () {
  const productList = $("#product-list");
  var urlParameter = getUrlParameter("category");
  var productParameter;
  var productCategory;
  var productSubCategory;
  var product;

  $(".categ-title i").on("click", function () {
    const categ = $(this).closest(".categ-title").find("a").text();
    var categElement = "." + categ.toLowerCase() + "-dropdown";
    var isShown = $(categElement).hasClass("show");
    if (!isShown) {
      $(categElement).addClass("show");
      $(this).addClass("tiltIcon");
    } else {
      $(categElement).removeClass("show");
      $(this).removeClass("tiltIcon");
    }
  });

  if (urlParameter) {
    productParameter = urlParameter.split("_");
    productCategory = productParameter[0];
    productSubCategory = productParameter[1];
  }

  for (let i = 0; i < products.length; i++) {
    if (productSubCategory) {
      product = products.filter(
        (value) =>
          value.category === productCategory &&
          value.subcategory === productSubCategory
      )[i];
      if (product.subcategory == "food") {
        $(".shop-banner h1").text("FOOD");
      } else if (product.subcategory == "treat") {
        $(".shop-banner h1").text("TREAT");
      } else {
        $(".shop-banner h1").text("SUPPLIES");
      }
      categElement = "." + productCategory.toLowerCase() + "-dropdown";
      var subCategElement = "#" + productCategory.toLowerCase() + productSubCategory.toLowerCase();
      var iconElement = "#" + productCategory.toLowerCase() + "-down";
      $(subCategElement).addClass("active");
      $(categElement).addClass("show");      
      $(iconElement).addClass("tiltIcon");
    } else if (productCategory) {
      product = products.filter((value) => value.category === productCategory)[i];
      categElement = "." + productCategory.toLowerCase() + "-dropdown";
      var iconElement = "#" + productCategory.toLowerCase() + "-down";
      $(categElement).addClass("show");  
      $(iconElement).addClass("tiltIcon");
    } else {
      product = products.sort(productCategory).sort(productSubCategory)[i];
    }

    if (productCategory == "cat") {
      $(".shop-banner-img").attr("src", "images/shop-cat.png");
    } else if (productCategory == "dog") {
      $(".shop-banner-img").attr("src", "images/shop-dog.png");
    } else if (productCategory == "bird") {
      $(".shop-banner-img").attr("src", "images/shop-bird.png");
    } else {
      $(".shop-banner-img").attr("src", "images/products-banner.png");
    }

    // Create a div for the product card
    const productCard = $('<div class="product-card"></div>');

    // Create a div for the product details
    const productLinkStart = $("<a>");
    productLinkStart.attr(
      "href",
      "product-detail.html?productId=" + product.id
    );

    // Create an image element for the product image
    const productImage = $("<img>");
    productImage.attr("src", product.images[0]);
    productImage.attr("alt", product.name);
    productImage.attr("height", "200");
    productImage.attr("width", "200");
    productImage.addClass("product-image");

    // Create a div for the product details
    const productDetails = $('<div class="product-details"></div>');

    // Create a p element for the product price
    const productPrice = $('<p class="product-price"></p>');
    productPrice.text(`$${product.price}`);

    // Create an h2 element for the product name
    const productName = $('<p class="product-name"></p>');
    const name = product.name.split(" ");
    const brand_name = $("<b>" + name[0] + "</b>");
    const product_name = $("<span>" + name.slice(1).join(" ") + "</span>");
    productName.append(brand_name);
    productName.append(product_name);

    // Create a Span for quantity of available product
    const productQuantity = $('<span id="product-quantity"></span>');
    const quantity = $('<span id="product-quantity-number"></span>');
    productQuantity.text("Hurry up!! ");
    quantity.text(product.quantity + " In Stock Left");
    productQuantity.append(quantity);

    // Create a div for the product rating
    const productRating = $('<div class="product-rating"></div>');

    // const productRatingTextContainer = $('<div class="product-rating-text"></div>');
    // Create a span element for the product rating value
    const productRatingValue = $('<span class="product-rating-value"></span>');
    const filledStars = product.rating;
    productRatingValue.text(filledStars);

    // Create filled stars
    for (let j = 0; j < filledStars; j++) {
      const star = $("<i>").addClass("ecicon eci-star fill");
      productRating.append(star);
    }

    // Calculate number of empty stars
    const emptyStars = 5 - filledStars;

    // Create empty stars
    for (let j = 0; j < emptyStars; j++) {
      const star = $("<i>").addClass("ecicon eci-star-o");
      productRating.append(star);
    }

    // Create a span element for the maximum product rating
    const productRatingMax = $('<span class="product-rating-max"></span>');
    productRatingMax.text("/5");

    // productRatingTextContainer.append(productRatingValue);
    // productRatingTextContainer.append(productRatingMax);

    // Add the rating value and maximum to the rating div
    productRating.append(productRatingValue);
    productRating.append(productRatingMax);

    // Add the product name, price, and rating to the product details
    productDetails.append(productName);
    productDetails.append(productQuantity);
    productDetails.append(productPrice);
    productDetails.append(productRating);

    // Add the product image and details to the product card
    productCard.append(productImage);
    productCard.append(productDetails);

    productLinkStart.append(productCard);
    productList.append(productLinkStart);
  }
});
