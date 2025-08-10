function placeOrder(method) {
  if (method === 'gpay') {
    const qrDiv = document.getElementById("qrCode");
    qrDiv.classList.remove("hidden");
    qrDiv.innerHTML = '<p style="color: #555; font-style: italic;">Click here to view QR Code</p>';
    document.getElementById("orderSuccess").classList.add("hidden");

    qrDiv.onclick = () => {
      qrDiv.innerHTML = `<img src="C:\Users\HP\Downloads\qr.jpg" alt="GPay QR Code" width="200">`;
      setTimeout(() => {
        document.getElementById("orderSuccess").classList.remove("hidden");
      }, 2000);
      qrDiv.onclick = null; // disable further clicks
    };
  } else {
    document.getElementById("qrCode").classList.add("hidden");
    document.getElementById("orderSuccess").classList.remove("hidden");
  }
}
