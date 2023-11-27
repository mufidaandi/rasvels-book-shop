function showEditableProfileDetails() {
    $('.personal-details .data-card').hide();
    $('.personal-details .editable-data-card').show();
}

function showEditablePassword() {
    $('.password-details .data-card').hide();
    $('.password-details .editable-data-card').show();
}

function hideEditableProfileDetails() {
    $('.personal-details .data-card').show();
    $('.personal-details .editable-data-card').hide();
}

function hideEditablePassword() {
    $('.password-details .data-card').show();
    $('.password-details .editable-data-card').hide();
}

function generateSelects(){
    // Get the existing select elements
    const countrySelect = document.getElementById('country');
    const regionSelect = document.getElementById('region');
    const citySelect = document.getElementById('city');

    // Populate the country select element
    const countryDefaultOption = document.createElement('option');
    countryDefaultOption.setAttribute('value', '');
    countryDefaultOption.setAttribute('selected', 'selected');
    countryDefaultOption.textContent = 'Select Country';
    countrySelect.appendChild(countryDefaultOption);

    countryList.forEach(country => {
    const countryOption = document.createElement('option');
    countryOption.setAttribute('value', country.id);
    countryOption.textContent = country.name;
    countrySelect.appendChild(countryOption);
    });

    // Add an event listener to the country select element
    countrySelect.addEventListener('change', () => {
    // Get the selected country
    const countryId = countrySelect.value;
    const country = countryList.find(c => c.id == countryId);

    // Populate the region select element
    regionSelect.innerHTML = '';
    const regionDefaultOption = document.createElement('option');
    regionDefaultOption.setAttribute('value', '');
    regionDefaultOption.setAttribute('selected', 'selected');
    regionDefaultOption.textContent = 'Select Region';
    regionSelect.appendChild(regionDefaultOption);

    country.regions.forEach(region => {
        const regionOption = document.createElement('option');
        regionOption.setAttribute('value', region.id);
        regionOption.textContent = region.name;
        regionSelect.appendChild(regionOption);
    });

    // Clear the city select element
    citySelect.innerHTML = '';
    });

    // Add an event listener to the region select element
    regionSelect.addEventListener('change', () => {
    // Get the selected country and region
    const countryId = countrySelect.value;
    const regionId = regionSelect.value;
    const country = countryList.find(c => c.id == countryId);
    const region = country.regions.find(r => r.id == regionId);

    // Populate the city select element
    citySelect.innerHTML = '';
    const cityDefaultOption = document.createElement('option');
    cityDefaultOption.setAttribute('value', '');
    cityDefaultOption.setAttribute('selected', 'selected');
    cityDefaultOption.textContent = 'Select City';
    citySelect.appendChild(cityDefaultOption);
    
    region.cities.forEach(city => {
    const cityOption = document.createElement('option');
    cityOption.setAttribute('value', city.id);
    cityOption.textContent = city.name;
    citySelect.appendChild(cityOption);
    });
    });
    
    // Initialize the select elements with default values
    const countryDefaultId = '';
    const regionDefaultId = '';
    const cityDefaultId = '';
    
    countrySelect.value = countryDefaultId;
    regionSelect.value = regionDefaultId;
    citySelect.value = cityDefaultId;
    
    // Trigger the change event on the country select element to populate the region select element with the first country's regions
    countrySelect.dispatchEvent(new Event('change'));
}

generateSelects();



function populateUserInfor(){
    var loggedUser = userGetCurrentLoginUser();
    $("#id").val(loggedUser.id);
    $("#userName").val(loggedUser.username);
    $("#firstName").val(loggedUser.firstname);
    $("#lastName").val(loggedUser.lastname);
    $("#address").val(loggedUser.address);
    $("#phoneNumber").val(loggedUser.tel);
    $("#country").val(loggedUser.country);
    var selectElement = document.getElementById('country');
    selectElement.dispatchEvent(new Event('change'));

    $("#region").val(loggedUser.region);
    var selectElement = document.getElementById('region');
    selectElement.dispatchEvent(new Event('change'));

    $("#city").val(loggedUser.city);

    $("#email").text(loggedUser.email);
    
    $("#postCode").val(loggedUser.postcode);

    // None edit fields
    $("#nonEdit_fullName").text(loggedUser.firstname + ' ' + loggedUser.lastname);
    $("#nonEdit_phone").text(loggedUser.tel);
    $('#nonEdit_address').text(loggedUser.address);
    $('#nonEdit_email').text(loggedUser.email);
    $('#nonEdit_acctID').text(loggedUser.id);
    $('#nonEdit_username').text(loggedUser.username);
}

function validateForm() {
    var result = true;
    // query selectors to select form's input tags
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phoneNumber = document.getElementById('phoneNumber');
    const address = document.getElementById('address');
    const country = document.getElementById('country');
    const region = document.getElementById('region');
    const city = document.getElementById('city');
    const postCode = document.getElementById('postCode');

    // query selectors to select error-span-elements of the corresponding input tags
    const firstNameErrorMessage = document.querySelector('.firstNameErrorMessage');
    const lastNameErrorMessage = document.querySelector('.lastNameErrorMessage');
    const phoneNumberErrorMessage = document.querySelector('.phoneNumberErrorMessage');
    const addressErrorMessage = document.querySelector('.addressErrorMessage');
    const cityErrorMessage = document.querySelector('.cityErrorMessage');
    const regionErrorMessage = document.querySelector('.regionErrorMessage');
    const countryErrorMessage = document.querySelector('.countryErrorMessage');
    const postCodeErrorMessage = document.querySelector('.postCodeErrorMessage');

    // to check if user entered first name is valid or not
    if (firstName.value === '') {
        firstNameErrorMessage.innerText = " (First name cannot be empty!)";
        result = false;
    } else {
        firstNameErrorMessage.innerText = "";
    }

    // to check if user entered last name is valid or not
    if (lastName.value === '') {
        lastNameErrorMessage.innerText = " (Last name cannot be empty!)";
        result = false;
    } else {
        lastNameErrorMessage.innerText = "";
    }

    // to check if user entered contact is valid or not
    if (phoneNumber.value === '') {
        phoneNumberErrorMessage.innerText = " (Contact cannot be empty!)";
        result = false;
    } else {
        phoneNumberErrorMessage.innerText = "";
    }

    // to check if user entered address is valid or not
    if (address.value === '') {
        addressErrorMessage.innerText = " (Address cannot be empty!)";
        result = false;
    } else {
        addressErrorMessage.innerText = "";
    }

    // to check if user entered country is valid or not
    if (country.value === '') {
        countryErrorMessage.innerText = " (Country cannot be empty!)";
        result = false;
    } else {
        countryErrorMessage.innerText = "";
    }

    // to check if user entered state is valid or not
    if (region.value === '') {
        regionErrorMessage.innerText = " (State cannot be empty!)";
        result = false;
    } else {
        regionErrorMessage.innerText = "";
    }
    // to check if user entered city is valid or not
    if (city.value === '') {
        cityErrorMessage.innerText = " (City cannot be empty!)";
        result = false;
    } else {
        cityErrorMessage.innerText = "";
    }
    // to check if user entered city is valid or not
    if (postCode.value === '') {
        postCodeErrorMessage.innerText = " (Post Code cannot be empty!)";
        result = false;
    } else {
        postCodeErrorMessage.innerText = "";
    }
    
    if(result){
        var loggedUser = userGetCurrentLoginUser();
        loggedUser.firstname = firstName.value;
        loggedUser.lastname = lastName.value;
        loggedUser.tel = phoneNumber.value;
        loggedUser.address = address.value;
        loggedUser.country = country.value;
        loggedUser.region = region.value;
        loggedUser.city = city.value;
        loggedUser.postcode = postCode.value;

        var allUsers = getAllUsers();
        const userIndex = allUsers.findIndex(user => user.id === loggedUser.id);
        if (userIndex !== -1) {
            allUsers[userIndex] = {
            ...allUsers[userIndex],
            firstname: firstName.value,
            lastname: lastName.value,
            address: address.value,
            city: city.value,
            country: country.value,
            region: region.value,
            postcode: postCode.value,
            tel: phoneNumber.value
            };
        }
        updateUsers(allUsers);
        alert("Update information successful");
        localStorage.setItem("currentUser", JSON.stringify(loggedUser));
    }
    return result;
}


function changePassword() {
    var result = true;
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    const currentPasswordErrMsg = document.querySelector('.currentPasswordErrMsg');
    const newPasswordErrMsg = document.querySelector('.newPasswordErrMsg');
    const confirmPasswordErrMsg = document.querySelector('.confirmPasswordErrMsg');

    if (currentPassword.value === '') {
        currentPasswordErrMsg.innerText = " (Please enter your password!)";
        result = false;
    } else {
        currentPasswordErrMsg.innerText = "";
    }
    if (newPassword.value === '') {
        newPasswordErrMsg.innerText = " (Please enter new password!)";
        result = false;
    } else {
        newPasswordErrMsg.innerText = "";
    }
    if (confirmPassword.value === '') {
        confirmPasswordErrMsg.innerText = " (Please confirm your new password!)";
        result = false;
    } else {
        confirmPasswordErrMsg.innerText = "";
    }
    if(!result) return result;
    var loggedUser = userGetCurrentLoginUser();
    if(loggedUser.password != currentPassword.value){
        currentPasswordErrMsg.innerText = " (Password is not correct!)";
        result = false;
    } else {
        currentPasswordErrMsg.innerText = "";
    }

    if (newPassword.value != confirmPassword.value) {
        newPasswordErrMsg.innerText = " (Password does not match!)";
        confirmPasswordErrMsg.innerHTML = " (Password does not match!)";
        result = false;
    } else {
        newPasswordErrMsg.innerText = "";
        confirmPasswordErrMsg.innerHTML = "";
    }
    if(result){
        var loggedUser = userGetCurrentLoginUser();
        loggedUser.password = newPassword.value;

        var allUsers = getAllUsers();
        const userIndex = allUsers.findIndex(user => user.id === loggedUser.id);
        if (userIndex !== -1) {
            allUsers[userIndex] = {
            ...allUsers[userIndex],
            password: newPassword.value
            };
        }
        updateUsers(allUsers);
        alert("Update password successful");
        localStorage.setItem("currentUser", JSON.stringify(loggedUser));
    }


    return result;
}

$(document).ready(function() {
    hideEditableProfileDetails();
    hideEditablePassword();
    $('#cancel-info').click(hideEditableProfileDetails);
    $('#cancel-pword').click(hideEditablePassword);
    $('.data-edit').click(showEditableProfileDetails);
    $('.password-edit').click(showEditablePassword);

    populateUserInfor();

    const userform = document.getElementById("userForm");
    //event listener that gets activated when the button is clicked
    userform.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validateForm()){
        userform.submit();
    }
    });

    const changePassForm = document.getElementById("changePassForm");
    //event listener that gets activated when the button is clicked
    changePassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(changePassword()){
        changePassForm.submit();
    }
    });
});
