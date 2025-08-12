function saveUserDetails() {
    let name = document.getElementById("nameInput").value;
    let userClass = document.getElementById("classInput").value;

    localStorage.setItem("userName", name);
    localStorage.setItem("userClass", userClass);

    // Redirect to menu page
    window.location.href = "menu.html";
}
function sendOrderToSheet(item, quantity) {
    let orderDetails = {
        name: localStorage.getItem("userName"),
        class: localStorage.getItem("userClass"),
        item: item,
        quantity: quantity
    };

    fetch("YOUR_WEB_APP_URL", {  // Replace with the URL from Step 2
        method: "POST",
        body: JSON.stringify(orderDetails)
    })
    .then(res => res.text())
    .then(response => {
        console.log("Order saved:", response);
        alert("Order placed successfully!");
    })
    .catch(err => console.error("Error:", err));
}
sendOrderToSheet(selectedItemName, selectedQuantity);

