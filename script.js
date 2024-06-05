<script>
    function saveUserData(event) {
        event.preventDefault();  
        
        // Generate a unique user ID
        const userId = generateUserId();
        
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

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("This email is already registered. Please use a different email.");
            return;
        }
        
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        window.location.href = "main.html";
    }

    // Function to generate a unique user ID
    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }
</script>