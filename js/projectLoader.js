// Load from localStorage
function loadLocalProjects() {
    const localProjects = localStorage.getItem("projects");
    return localProjects ? JSON.parse(localProjects) : [];
}

// Local projects data from HW 3
const localProjectsData = {
    homework: [
        {
            title: "CSE 134B - HW 1",
            description:
                "This homework was a simple introduction to HTML, HTTP headers, and the basics of inspecting/debugging.",
            topics: ["Debugging", "HTML"],
            links: [
                {
                    name: "GitHub",
                    link: "https://github.com/chark1es/cse134-hw1",
                },
                {
                    name: "Live Site",
                    link: "https://cse134b-ucsd-cmn010.netlify.app",
                },
            ],
            image: "./thumbnails/hw1.webp",
        },
        {
            title: "CSE 134B - HW 2",
            description:
                "This homework provided a way to implement HTML and making sure we use built-in HTML elements.",
            topics: ["HTML"],
            links: [
                {
                    name: "GitHub",
                    link: "https://github.com/chark1es/cse134b-hw2",
                },
                {
                    name: "Live Site",
                    link: "https://cse134b-hw2-cmn010.netlify.app",
                },
            ],
            image: "./thumbnails/hw2.webp",
        },
        {
            title: "Initial Wireframe",
            description:
                "This is the initial wireframe for the website. It has obviously changed since then lol.",
            links: [
                {
                    name: "View the full image here",
                    link: "./thumbnails/wireframe.webp",
                },
            ],
            image: "./thumbnails/wireframe.webp",
        },
        {
            title: "CSE 134B - HW 3",
            description:
                "This homework is a continuation of the previous homework assignment, but with more relevant content and CSS.",
            topics: ["HTML", "CSS"],
            links: [
                {
                    name: "GitHub",
                    link: "https://github.com/chark1es/cse134b-hw3",
                },
                {
                    name: "Live Site",
                    link: "https://cse134b-hw3-cmn010.netlify.app",
                },
            ],
            image: "./thumbnails/hw3.webp",
        },
    ],
};

function loadProjectsFromEmbedded() {
    try {
        // Clear existing projects from localStorage
        localStorage.removeItem("projects");

        if (localProjectsData && localProjectsData.homework) {
            localStorage.setItem(
                "projects",
                JSON.stringify(localProjectsData.homework)
            );
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error loading local projects:", error);
        return false;
    }
}

// Fetch and update projects from the remote API
async function updateProjectsFromRemote() {
    try {
        // Clear existing projects from localStorage
        localStorage.removeItem("projects");

        const response = await fetch(
            "https://api.jsonbin.io/v3/b/67d49da18960c979a571b1f9/latest",
            {
                headers: {
                    "X-Access-Key":
                        "$2a$10$vgbIfTVLPsUK3p.4XNOUBOnORo/xD4dA0W963NaUmMMvIbyiqk4WO",
                },
            }
        );
        const data = await response.json();

        if (data && data.record && data.record.homework) {
            localStorage.setItem(
                "projects",
                JSON.stringify(data.record.homework)
            );
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error fetching remote projects:", error);
        return false;
    }
}

// Render projects from localStorage
function renderProjects() {
    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    const projects = loadLocalProjects();

    projects.forEach((project) => {
        const projectCard = document.createElement("project-card");
        projectCard.setAttribute("title", project.title);
        projectCard.setAttribute("image", project.image);
        projectCard.setAttribute("description", project.description);
        if (project.topics) {
            projectCard.setAttribute("topics", JSON.stringify(project.topics));
        }
        if (project.links) {
            projectCard.setAttribute("links", JSON.stringify(project.links));
        }
        projectsGrid.appendChild(projectCard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loadLocalBtn = document.getElementById("loadLocal");
    const loadRemoteBtn = document.getElementById("loadRemote");

    loadLocalBtn.addEventListener("click", () => {
        const updated = loadProjectsFromEmbedded();
        if (updated) {
            renderProjects();
        }
    });

    loadRemoteBtn.addEventListener("click", async () => {
        const updated = await updateProjectsFromRemote();
        if (updated) {
            renderProjects();
        }
    });
});
