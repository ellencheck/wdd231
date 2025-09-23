// Fetch members from JSON and display
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members); // обратите внимание на .members
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  directory.innerHTML = ""; // очистить перед рендером

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      ${member.phone ? `<p>${member.phone}</p>` : ""}
      ${member.website ? `<a href="${member.website}" target="_blank">Visit Website</a>` : ""}
      <p class="membership">Membership: ${member.level}</p>
    `;

    directory.appendChild(card);
  });
}

// Grid/List toggle
document.querySelector("#gridBtn").addEventListener("click", () => {
  const directory = document.querySelector("#directory");
  directory.classList.add("grid");
  directory.classList.remove("list");
});

document.querySelector("#listBtn").addEventListener("click", () => {
  const directory = document.querySelector("#directory");
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members on page load
getMembers();

// Mobile menu toggle
const menuBtn = document.querySelector("#menu");
const navUl = document.querySelector(".navigation");
menuBtn.addEventListener("click", () => {
  navUl.classList.toggle("show");
});
