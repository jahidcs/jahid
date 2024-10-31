const header = document.querySelector("header");
let lastScrollY = 0;
const threshold = 1;
header.classList.remove("hidden");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY + threshold) {
    header.classList.add("hidden");
  } else if (currentScrollY < lastScrollY - threshold) {
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});

// Effect on appearing NAV
const navElement = document.querySelector("nav");

setTimeout(() => {
  navElement.classList.add("loaded");
}, 100);

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add the 'active' class to the clicked link

    link.classList.add("active");
  });
});

fetch("/assets/json/data.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("name").textContent = data.name;
    document.getElementById("profession").textContent = data.profession;
    document.getElementById("bio").textContent = data.bio;
    document.getElementById("contact-email").textContent = data.contact[0];
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const companiesList = document.querySelector(".companies");
const detailsContainer = document.querySelector(".details");

fetch("/assets/json/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.experience.forEach((company, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = company.organization;
      listItem.dataset.companyIndex = index;
      companiesList.appendChild(listItem);

      listItem.addEventListener("click", () => {
        // Remove the 'selected' class from all list items
        const selectedItem = document.querySelector(".companies li.selected");
        if (selectedItem) {
          selectedItem.classList.remove("selected");
        }

        // Add the 'selected' class to the clicked list item
        listItem.classList.add("selected");

        const companyIndex = listItem.dataset.companyIndex;
        const companyDetails = data.experience[companyIndex];

        const formattedDetail = companyDetails.detail.replace(/\n/g, "<br>");
        detailsContainer.innerHTML = `
            <h3>${companyDetails.organization}</h3>
            <h4>${companyDetails.position}</h4>
            <p class='period'>${companyDetails.start} - ${companyDetails.end}</p>
            <p class='exp-details'>${formattedDetail}</p>
          `;
      });
    });

    // Select the first company as default
    const firstCompany = companiesList.querySelector("li");
    firstCompany.click();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
