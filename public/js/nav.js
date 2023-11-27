var expandWidth = false;

var expandSearch = function () {
  if (expandWidth) {
    $("#search-input").addClass("expand").focus();
  } else {
    if ($("#search-input")){
      $("#search-input").removeClass("expand");
    }    
  }
  expandWidth = !expandWidth;
};

var showModal = function () {
  $("#myaccount-modal").css("display", "flex");
};

var hideModal = function () {
  $("#myaccount-modal").css("display", "none");
};

function hideBackground() {
  $("#content-wrapper").css("filter", "brightness(0.5)");
}

function unhideBackground() {
  $("#content-wrapper").css("filter", "brightness(1.0)");
}

function setCatActiveCategory() {
    $("#cat").addClass("active-sub");
    $("#dog").removeClass("active-sub");
    $("#bird").removeClass("active-sub");
  
    $("#food").attr("src", "images/catfood.png");
    $("#treat").attr("src", "images/cattreat.png");
    $("#supplies").attr("src", "images/catsupplies.png");

    $("#sub-food").attr("href", "./product-list.html?category=cat_food");
    $("#sub-treat").attr("href", "./product-list.html?category=cat_treat");
    $("#sub-supply").attr("href", "./product-list.html?category=cat_supply");
  
    $("#category-image").attr("src", "images/catto.png");
  }
  
  function setDogActiveCategory() {
    $("#cat").removeClass("active-sub");
    $("#dog").addClass("active-sub");
    $("#bird").removeClass("active-sub");
  
    $("#food").attr("src", "images/dogfood.png");
    $("#treat").attr("src", "images/dogtreats.png");
    $("#supplies").attr("src", "images/dogsupplies.png");
  
    $("#sub-food").attr("href", "./product-list.html?category=dog_food");
    $("#sub-treat").attr("href", "./product-list.html?category=dog_treat");
    $("#sub-supply").attr("href", "./product-list.html?category=dog_supply");

    $("#category-image").attr("src", "images/doggo.png");
  }
  
  function setBirdActiveCategory() {
    $("#cat").removeClass("active-sub");
    $("#dog").removeClass("active-sub");
    $("#bird").addClass("active-sub");
  
    $("#food").attr("src", "images/birdfood.png");
    $("#treat").attr("src", "images/birdtreats.png");
    $("#supplies").attr("src", "images/birdsupplies.png");
  
    $("#sub-food").attr("href", "./product-list.html?category=bird_food");
    $("#sub-treat").attr("href", "./product-list.html?category=bird_treat");
    $("#sub-supply").attr("href", "./product-list.html?category=bird_supply");

    $("#category-image").attr("src", "images/birdo.png");
  }

  function userIconOnHover() {
    $("#user-icon").css("filter", "brightness(1.3)");
    $("#content-wrapper").css("filter", "brightness(0.5)");
  }
  
  function userIconOnLeave() {
    $("#user-icon").css("filter", "brightness(1)");
    $("#content-wrapper").css("filter", "brightness(1.0)");
  }
  
  function cartIconOnHover() {
    $("#cart-icon").css("filter", "brightness(1.5)");
  }
  
  function cartIconOnLeave() {
    $("#cart-icon").css("filter", "brightness(1)");
  }
  
  function loginBtnOnHover() {
    $("#login-btn").css("filter", "brightness(1.2)");
  }
  
  function loginBtnOnLeave() {
    $("#login-btn").css("filter", "brightness(1)");
  }

  $(document).ready(function() {
    expandSearch();
  
    $("#myaccount").hover(userIconOnHover, userIconOnLeave);
    $("#myaccount-modal").hover(userIconOnHover, userIconOnLeave);
  
    $("#cart-wrapper").hover(cartIconOnHover, cartIconOnLeave);
  
    $("#login-btn").hover(loginBtnOnHover, loginBtnOnLeave);
  
    $("#cat").mouseover(setCatActiveCategory);
    $("#dog").mouseover(setDogActiveCategory);
    $("#bird").mouseover(setBirdActiveCategory);
  
    $("#search-input").blur(expandSearch);
    $("#search").click(expandSearch);
    $("#products, #products-modal").hover(hideBackground, unhideBackground);

    $(".search-bar").submit(function( event ) {
      const keyword = $("#search-input").first().val();
      window.location.href = "product-search.html?search=" + keyword;
      event.preventDefault();
    });
  });
  
