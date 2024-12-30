const imageHeight = 80;
const imageWidth = 120;
const projectsContainer = document.querySelector("#projects-container");

// get and add projects to page
document.addEventListener("DOMContentLoaded", async () => {
  await fetch("../data/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      addProjects(json);
    });
});

function addProjects(projects) {
  const projectsObj = projects.projects;

  // create an article for each project entry
  for (const project in projectsObj) {
    const article = document.createElement("article");
    const pTitleLink = document.createElement("a");
    const pImgLink = document.createElement("a");
    const pImg = document.createElement("img");
    const pDescription = document.createElement("p");
    const pTools = document.createElement("p");

    // title
    pTitleLink.href = projectsObj[project].url;
    pTitleLink.textContent = projectsObj[project].name;
    if (projectsObj[project].name !== "Personal Website") {
      pTitleLink.target = "_blank";
    }
    pTitleLink.classList.add("title-link");

    // image
    pImg.src = projectsObj[project].img;
    pImg.alt = projectsObj[project].name;
    pImg.height = imageHeight;
    pImg.width = imageWidth;

    // image link
    pImgLink.href = projectsObj[project].url;
    if (projectsObj[project].name !== "Personal Website") {
      pImgLink.target = "_blank";
    }
    pImgLink.appendChild(pImg);

    // description
    pDescription.textContent = projectsObj[project].description;

    // tools
    pTools.textContent = projectsObj[project].tools;
    pTools.classList.add("tools-list");

    article.appendChild(pImgLink);
    article.appendChild(pTitleLink);
    article.appendChild(pDescription);
    article.appendChild(pTools);

    projectsContainer.appendChild(article);
  }
}
