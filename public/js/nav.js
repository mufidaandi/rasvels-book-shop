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
  $("#myaccount-modal").css("display", "flex")
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

    $("#search-input").blur(expandSearch);
    $("#search").click(expandSearch);
    $("#products, #products-modal").hover(hideBackground, unhideBackground);

    $(".search-bar").submit(function( event ) {
      const keyword = $("#search-input").first().val();
      window.location.href = "books-list.html?search=" + keyword;
      event.preventDefault();
    });
  });
  
