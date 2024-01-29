// Selecting HTML elements and storing them in variables
let form = document.getElementById("userForm");
let main = document.querySelector(".result-main-div");
let clearBtn = document.getElementById("clear");
console.log(clearBtn);

// Adding a submit event listener to the form
form.addEventListener("submit", function (event) {
    // Preventing the default form submission behavior
    event.preventDefault();

    // Extracting user input values from the form
    let name = event.target.username.value;
    let phone = event.target.phone.value;
    let email = event.target.email.value;

    // Initializing a check status variable
    let checkStatus = 0;

    // Retrieving user data from local storage or initializing an empty array
    let userData = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Checking if the entered email or phone number already exists in stored data
    for (let v of userData) {
        if (v.email == email || v.phone == phone) {
            checkStatus = 1;
        }
    }

    // Displaying an alert if email or phone number already exists, else adding data to local storage
    if (checkStatus == 1) {
        alert("Email or phone number already exists");
    } else {
        // Adding new user data to the array
        userData.push({
            'name': name,
            'email': email,
            'phone': phone,
        });

        // Updating local storage with the modified user data array
        localStorage.setItem("userDetails", JSON.stringify(userData));

        // Resetting the form after successful submission
        event.target.reset();
    }

    // Updating the displayed data on the page
    displayData();
});

// Function to display user data on the page
let displayData = function () {
    // Retrieving user data from local storage or initializing an empty array
    let userData = JSON.parse(localStorage.getItem("userDetails")) || [];
    let finalData = '';

    // Creating HTML for each user and appending it to the finalData string
    userData.forEach(function (element, i) {
        finalData += `<div class="result">
            <span onclick="removeData(${i})">&times;</span>
            <h1>Name: ${element.name}</h1>
            <h1>Email: ${element.email}</h1>
            <h1>Phone: ${element.phone}</h1>
        </div>`;
    });

    // Updating the main div with the finalData HTML
    main.innerHTML = finalData;
};

// Initial display of user data on page load
displayData();

// Function to remove user data at a specified index
let removeData = (index) => {
    // Retrieving user data from local storage or initializing an empty array
    let userData = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Removing the data at the specified index from the array
    userData.splice(index, 1);

    // Updating local storage with the modified user data array
    localStorage.setItem("userDetails", JSON.stringify(userData));

    // Updating the displayed data on the page
    displayData();
};

// Adding a click event listener to the clear button
clearBtn.addEventListener("click", () => {
    // Clearing the entire user details data from local storage
    localStorage.clear("userDetails");

    // Updating the displayed data on the page
    displayData();
});

// Displaying user data on page load
displayData();
