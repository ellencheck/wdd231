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
// ------------------ Footer ------------------
document.getElementById("year").textContent = new Date().getFullYear();

// Формат даты: MM/DD/YYYY HH:MM:SS
const lastModified = new Date(document.lastModified);
const formattedDate = `${String(lastModified.getMonth() + 1).padStart(2, "0")}/` +
                      `${String(lastModified.getDate()).padStart(2, "0")}/` +
                      `${lastModified.getFullYear()} ` +
                      `${String(lastModified.getHours()).padStart(2, "0")}:` +
                      `${String(lastModified.getMinutes()).padStart(2, "0")}:` +
                      `${String(lastModified.getSeconds()).padStart(2, "0")}`;

document.getElementById("lastModified").textContent = formattedDate;

// ------------------ Меню ------------------
const menuBtn = document.querySelector("#menu");
const navUl = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  navUl.classList.toggle("show");
});
