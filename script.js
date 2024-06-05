/*document.getElementById('info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const productName = document.getElementById('productName').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const description = document.getElementById('description').value;
    const saleOrBorrow = document.getElementById('saleOrBorrow').value;
    const itemStatus = document.getElementById('itemStatus').value;

    // Form validation
    if (!firstName  !lastName  !productName  !fileInput  !description  !saleOrBorrow  !itemStatus) {
        alert('Please fill out all required fields.');
        return;
    }

    // Display form data for demonstration purposes
    alert(`Name: ${firstName} ${lastName}\nProduct Name: ${productName}\nFile: ${fileInput.name}\nDescription: ${description}\nSale or Borrow: ${saleOrBorrow}\nItem Status: ${itemStatus}`);
    
    // Here you can add code to handle the form submission, like sending the data to a server.
});
$(document).ready(function(){
	$('#action_menu_btn').click(function(){
		$('.action_menu').toggle();
	});
});*/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/sharehood', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
    phoneNumber: String
});

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, address, city, country, zipCode, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, address, city, country, zipCode, phoneNumber });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Email already exists' }));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
});

app.get('/profile', authenticateToken, (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ error: 'User not found' }));
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'secretkey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

app.listen(3000, () => console.log('Server running on port 3000'));