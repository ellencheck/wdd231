document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const dataDiv = document.getElementById("formData");

  const fields = ["firstName", "lastName", "email", "phone", "organization", "timestamp"];

  fields.forEach(field => {
    if (params.has(field)) {
      const p = document.createElement("p");
      p.textContent = `${field}: ${params.get(field)}`;
      dataDiv.appendChild(p);
    }
  });
});
