async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  directory.innerHTML = ""; // clear before rendering

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership">Membership: ${member.membership}</p>
    `;

    directory.appendChild(card);
  });
}

document.querySelector("#gridBtn").addEventListener("click", () => {
  document.querySelector("#directory").classList.add("grid");
  document.querySelector("#directory").classList.remove("list");
});

document.querySelector("#listBtn").addEventListener("click", () => {
  document.querySelector("#directory").classList.add("list");
  document.querySelector("#directory").classList.remove("grid");
});

// Footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members on page load
getMembers();
const menuBtn = document.querySelector("#menu");
const navUl = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  navUl.classList.toggle("show");
});

