document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Timestamp ------------------
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // ------------------ Modal Logic ------------------
  const modalLinks = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  modalLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "block";
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modals.forEach(modal => modal.style.display = "none");
    });
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // ------------------ Footer ------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    const lastModified = new Date(document.lastModified);
    const formattedDate = `${String(lastModified.getMonth() + 1).padStart(2, "0")}/` +
                          `${String(lastModified.getDate()).padStart(2, "0")}/` +
                          `${lastModified.getFullYear()} ` +
                          `${String(lastModified.getHours()).padStart(2, "0")}:` +
                          `${String(lastModified.getMinutes()).padStart(2, "0")}:` +
                          `${String(lastModified.getSeconds()).padStart(2, "0")}`;
    lastModifiedSpan.textContent = formattedDate;
  }

  // ------------------ Mobile Menu ------------------
  const menuBtn = document.querySelector("#menu");
  const navUl = document.querySelector(".navigation");

  if (menuBtn && navUl) {
    menuBtn.addEventListener("click", () => {
      navUl.classList.toggle("show");
    });
  }
});
