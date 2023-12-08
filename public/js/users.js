const hardcodeUsers = [
{id: '999',      username: 'admin',  password: 'admin',  role: 'admin',  email: 'admin@rasvels.com'	 ,firstname: 'Admin',         	lastname: '',         				address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0866311', username: 'sylvia', password: 'sylvia', role: 'user',   email: 'sylvia@rasvels.com' ,firstname: 'Sylvia', 			lastname: 'Espina', 				address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0864756', username: 'mufida', password: 'mufida', role: 'user',   email: 'mufida@rasvels.com' ,firstname: 'Mufida',   		lastname: 'Andi',   				address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0870543', username: 'jenil',  password: 'jenil',  role: 'user',   email: 'jenil@rasvels.com'	 ,firstname: 'Jenil',   		lastname: 'Shivamkumar Varma',   	address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0868053', username: 'jay',    password: 'jay',    role: 'user',   email: 'jay@rasvels.com'	 ,firstname: 'Jay',      		lastname: 'Shah',      				address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0865533', username: 'ajay',   password: 'ajay',   role: 'user',   email: 'ajay@rasvels.com'	 ,firstname: 'Ambharapu Ajay',  lastname: 'Kumar Reddy',    		address: '400-265 Yorkland Blvd', city:201, country: 2, region:21, postcode:'M2J 1S5', tel:'416-485-2098'},
{id: 'C0861736', username: 'vu',     password: 'vu',     role: 'user',   email: 'vu@rasvels.com'	 ,firstname: 'Tich Vu',         lastname: 'Lu',         			address: '400-265 Yorkland Blvd', city:203, country: 2, region:22, postcode:'M2J 1S5', tel:'416-485-2098'},
];

const countryList = [
    { id: 1, name: 'USA', regions: [
      { id: 11, name: 'California', cities: [
        { id: 101, name: 'Los Angeles' },
        { id: 102, name: 'San Francisco' }
      ]},
      { id: 12, name: 'Texas', cities: [
        { id: 103, name: 'Houston' },
        { id: 104, name: 'Austin' }
      ]}
    ]},
    { id: 2, name: 'Canada', regions: [
      { id: 21, name: 'Ontario', cities: [
        { id: 201, name: 'Toronto' },
        { id: 202, name: 'Ottawa' }
      ]},
      { id: 22, name: 'Quebec', cities: [
        { id: 203, name: 'Montreal' },
        { id: 204, name: 'Quebec City' }
      ]}
    ]},
    { id: 3, name: 'Mexico', regions: [
      { id: 31, name: 'Jalisco', cities: [
        { id: 301, name: 'Guadalajara' },
        { id: 302, name: 'Tlaquepaque' }
      ]},
      { id: 32, name: 'Mexico City', cities: [
        { id: 303, name: 'Mexico City' },
        { id: 304, name: 'Coyoacan' }
      ]}
    ]}
  ];
  
  

function initUserData(){
    // If no users are stored in local storage, then initialize with a hardcoded list.
    var users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
        localStorage.setItem('users', JSON.stringify(hardcodeUsers));
    }
}
initUserData();

function getAllUsers(){
    return  JSON.parse(localStorage.getItem('users'));
}

function updateUsers(users){
    localStorage.setItem('users', JSON.stringify(users));
}

var storedUser;

function userGetCurrentLoginUser(){
    var storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        return JSON.parse(storedUser);
    } else {
        return null;
    }
}

function userLogin(username, password) {
    var users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => (user.email === username || user.username === username) && user.password === password);
    if (user) {
      alert("Login successful");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
      return user;
    } else {
        // to check if user entered valid username or not
        if ($("#uname").val() === '') {
            $(".usernameErrorMessage").text(" (Username cannot be empty!)");
        } else{
            $(".usernameErrorMessage").text("*");
        }
    
        // to check if user entered valid password or not
        if ($("#pword").val()=== '') {
            $(".passwordErrorMessage").text(" (Password cannot be empty!)");
        } else{
            $(".passwordErrorMessage").text("*");
        }
        
      alert("Login failed. Invalid username or password.");
      return null;
    }
}

function userLogout(){
    localStorage.removeItem('currentUser');
    alert("Logout successful.");
}


function checkLogin(){
    storedUser = userGetCurrentLoginUser();
    if(storedUser && storedUser.firstname !== undefined){
        $(".account-profile h5").text('Welcome, '+ storedUser.firstname + '!');
        $(".account-profile").show();
    } else {
        $(".account-profile").hide();
    }
}

function login(){
    var usr = $('#uname').val();
    var pwd = $('#pword').val();
    var user = userLogin(usr, pwd);
    if(user != null){
        $(".account-profile h5").text('Welcome, '+ user.firstname + '!');
        $('#uname').val('');
        $('#pword').val('');
        $("#loginError").val('');
    } else{
        $("#loginError").text('Invalid user or password');
        $('#uname').val('');
        $('#pword').val('');
    }
}

function loginForm(){
    var usr = $('#username-login').val();
    var pwd = $('#password-login').val();
    console.log("login form : user " + usr + " pwd " + pwd);
    var user = userLogin(usr, pwd);
    if(user != null){
        $(".account-profile h5").text('Welcome, '+ user.name);
        $('#username-login').val('');
        $('#password-login').val('');
        $("#loginError").val('');
        window.location.href = "index.html";
    } else{
        $("#loginError").text('Invalid user or password');
        $('#username-login').val('');
        $('#password-login').val('');
    }
}


function logout(){
    userLogout();
    checkLogin();
}

$(document).ready(function() {
    checkLogin();

});