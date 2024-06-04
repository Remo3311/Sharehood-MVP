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
});*/
$(document).ready(function(){
	$('#action_menu_btn').click(function(){
		$('.action_menu').toggle();
	});
});