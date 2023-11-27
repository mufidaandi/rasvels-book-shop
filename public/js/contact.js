function isFieldsPopulated() {
    var name = $("#name").val().length;
    var email = $("#email").val().length;
    var phone = $("#phone").val().length;
    var subject = $("#subject").val().length;
    var description = $("#description").val().length;
  
    if (name <= 0 || email <= 0 || phone <= 0 || subject <= 0 || description <= 0) {
      alert("Please populate all required fields");
      return false;
    } else {
      return true;
    }
  }
  
  function isValidPhoneNumber() {
    var phone = $("#phone").val();
  
    if (phone.length > 10 || phone.length < 10) {
      alert("Please enter a valid phone number");
      return false;
    } else {
      return true;
    }
  }
  
  function isValidEmailAddress() {
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var email = $("#email").val();
  
    if (email.match(mailformat)) {
      return true;
    } else {
      alert("Please enter a valid email address");
      return false;
    }
  }
  
  function validateForm() {
    if (isFieldsPopulated() && isValidPhoneNumber() && isValidEmailAddress()) {
      window.open("./contact-success.html", "_self");
    }
  }
  