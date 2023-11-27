const  deliverCharges = 9.99;

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
    $("#firstName").val(loggedUser.firstname);
    $("#lastName").val(loggedUser.lastname);
    $("#address").val(loggedUser.address);

    $("#country").val(loggedUser.country);
    var selectElement = document.getElementById('country');
    selectElement.dispatchEvent(new Event('change'));

    $("#region").val(loggedUser.region);
    var selectElement = document.getElementById('region');
    selectElement.dispatchEvent(new Event('change'));

    $("#city").val(loggedUser.city);
    
    $("#postCode").val(loggedUser.postcode);

}


jQuery(document).ready(function () {
    populateUserInfor();

    jQuery("#deliverCHarges").text('$' + deliverCharges);
    var userCart = getAllCartItems();
    var subTotal = 0;
    for (let i = 0; i < userCart.length; i++) {
        subTotal += userCart[i].price * userCart[i].quantity;
    }
    var totalAmount = Number(subTotal) + Number(deliverCharges);
    jQuery("#subTotal").text('$' + subTotal.toFixed(2));
    jQuery("#totalAmount").text('$' + totalAmount.toFixed(2));

    // Check if users click on Place Order, system will remove all items in the cart and redirect to thankyou page
    const myform = document.getElementById("myform");
    myform.addEventListener("submit", function(event) {
    // prevent the form from submitting immediately
    event.preventDefault();
    
    // clear all items in the cart
    localStorage.removeItem("userCart");
    console.log('All items have removed');
    // submit the form programmatically after your code is done executing
    myform.submit();
    });
});

