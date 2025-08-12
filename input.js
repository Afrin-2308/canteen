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

    fetch("https://script.google.com/macros/s/AKfycbzW4SskvtMxd6pYEMYqXTp-yKKjmWOUvU451DfOAfdPcRPK2Diz6mU3FLO4donjV5JRMg/exec", {  // Replace with the URL from Step 2
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

