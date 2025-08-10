function placeOrder(method) {
  if (method === 'gpay') {
    const qrDiv = document.getElementById("qrCode");
    qrDiv.classList.remove("hidden");
    qrDiv.innerHTML = '<p style="color: #555; font-style: italic;">Click here to view QR Code</p>';
    // Remove order success in case it was shown earlier
    document.getElementById("orderSuccess").classList.add("hidden");

    // Add click listener to qrDiv to show image
    qrDiv.onclick = () => {
      qrDiv.innerHTML = `<img src="C:\\Users\\Admin\\AppData\\Local\\Microsoft\\Windows\\INetCache\\IE\\OPDA4RGH\\IMG-20250810-WA0048[1].jpg" alt="GPay QR Code" width="200">`;
      // Show order success message after showing image, after 2 seconds
      setTimeout(() => {
        document.getElementById("orderSuccess").classList.remove("hidden");
      }, 2000);

      // Remove this click listener after first click so image doesn't toggle again
      qrDiv.onclick = null;
    };
  } else {
    // For cash, hide QR and show success immediately
    document.getElementById("qrCode").classList.add("hidden");
    document.getElementById("orderSuccess").classList.remove("hidden");
  }
}
