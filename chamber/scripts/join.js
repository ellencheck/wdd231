// timestamp
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();

  // modal logic
  const links = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      document.getElementById(modalId).style.display = "block";
    });
  });

  closes.forEach(btn => {
    btn.addEventListener("click", () => {
      modals.forEach(m => (m.style.display = "none"));
    });
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});
