<script>
    // Function to save user data when the form is submitted
    function saveUserData(event) {
        event.preventDefault();  // Prevent the form from submitting the traditional way
        
        // Generate a unique user ID
        const userId = generateUserId();
        
        // Retrieve form data
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const zipCode = document.getElementById('zipCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const phoneMain = document.getElementById('phoneMain').value;

        // Construct user data object
        const userData = {
            id: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            city: city,
            country: country,
            zipCode: zipCode,
            phoneNumber: phoneNumber,
            phoneMain: phoneMain
        };

        // Retrieve existing user data or initialize an empty array
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the user already exists
        const isExistingUser = storedUsers.find(user => user.email === email);
        if (isExistingUser) {
            alert("This email is already registered. Please use a different email.");
            return; // Stop further execution
        }
        
        // Add the new user data to the array
        storedUsers.push(userData);
        
        // Save the updated user data in local storage
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        // Redirect to the main page
        window.location.href = "main.html";
    }

    // Function to generate a unique user ID
    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9); // Generate a random ID
    }
</script>
