document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutBtn");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          alert("Logged out successfully!");
          window.location.href = "login.html";
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
    });
  } else {
    console.error("Logout button not found");
  }
});
