class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["title", "image", "description", "topics", "links"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const topics = this.getAttribute("topics")
            ? JSON.parse(this.getAttribute("topics"))
            : [];
        const links = this.getAttribute("links")
            ? JSON.parse(this.getAttribute("links"))
            : [];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .project-card {
                    background-color: var(--card-bg-color, #ffffff);
                    border-radius: 1rem;
                    overflow: hidden;
                    box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.08));
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
                    color: var(--text-color, #1a1a1a);
                }
                
                .project-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg, 0 6px 12px rgba(0, 0, 0, 0.1));
                }
                
                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    object-position: center;
                    border-bottom: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
                    transition: transform 0.3s ease;
                }
                
                .card-content {
                    padding: 1.5rem;
                }
                
                h2 {
                    margin-top: 0;
                    color: var(--text-color, #1a1a1a);
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                p {
                    color: var(--muted-text, rgba(26, 26, 26, 0.7));
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }
                
                .topics {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .topic {
                    background-color: var(--hover-bg, rgba(147, 51, 234, 0.1));
                    color: var(--primary-color, #9333ea);
                    padding: 0.25em 0.75em;
                    border-radius: 1em;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }
                
                a {
                    display: inline-block;
                    text-align: center;
                    padding: 0.5em 1em;
                    background-color: var(--hover-bg, rgba(147, 51, 234, 0.1));
                    border-radius: 0.5rem;
                    border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
                    transition: all 0.2s ease;
                    font-weight: 500;
                    color: var(--link-color, #9333ea);
                    text-decoration: none;
                }
                
                a:hover {
                    background-color: var(--primary-color, #9333ea);
                    color: white;
                    border-color: var(--primary-color, #9333ea);
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    img {
                        height: 180px;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-content {
                        padding: 1rem;
                    }
                    
                    img {
                        height: 150px;
                    }
                    
                    .links {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    a {
                        width: 100%;
                    }
                }
            </style>
            <article class="project-card">
                <picture>
                    <img src="${this.getAttribute("image") || ""}" 
                         alt="Screenshot of ${this.getAttribute("title") || ""}"
                         loading="lazy">
                </picture>
                <div class="card-content">
                    <h2>${this.getAttribute("title") || ""}</h2>
                    <p>${this.getAttribute("description") || ""}</p>
                    ${
                        topics.length
                            ? `
                        <div class="topics">
                            ${topics
                                .map(
                                    (topic) => `
                                <span class="topic">${topic}</span>
                            `
                                )
                                .join("")}
                        </div>
                    `
                            : ""
                    }
                    ${
                        links.length
                            ? `
                        <div class="links">
                            ${links
                                .map(
                                    (link) => `
                                <a href="${link.link}">${link.name}</a>
                            `
                                )
                                .join("")}
                        </div>
                    `
                            : ""
                    }
                </div>
            </article>
        `;
    }
}

customElements.define("project-card", ProjectCard);
