<script>
    // Function to save user data when the form is submitted
    function saveUserData(event) {
        event.preventDefault();  // Prevent the form from submitting the traditional way
        
        // Generate a unique user ID
        const userId = generateUserId();
        
        // Retrieve form data
        const email = document.getElementById('email').value;
        const userData = {
            id: userId, // Save the generated ID
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: email,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            zipCode: document.getElementById('zipCode').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            phoneMain: document.getElementById('phoneMain').value
        };

        // Retrieve existing user data or initialize an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("This email is already registered. Please use a different email.");
            return; // Stop further execution
        }
        
        // Add the new user data to the array
        users.push(userData);
        
        // Save the updated user data in local storage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Redirect to the main page
        window.location.href = "main.html";
    }

    // Function to generate a unique user ID
    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9); // Generate a random ID
    }
</script>
