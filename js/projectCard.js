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
        const styles = `
            :host {
                display: block;
                background: var(--card-bg, #ffffff);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: transform 0.2s ease-in-out;
            }

            :host(:hover) {
                transform: translateY(-5px);
            }

            .card-content {
                padding: 1rem;
            }

            h2 {
                margin: 0 0 0.5rem 0;
                color: var(--text-color, #333);
                font-size: 1.5rem;
            }

            picture img {
                width: 100%;
                height: auto;
                display: block;
            }

            p {
                color: var(--text-color, #666);
                line-height: 1.5;
                margin: 0.5rem 0;
            }

            .topics {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin: 0.5rem 0;
            }

            .topic {
                background: var(--topic-bg, #e0e0e0);
                color: var(--topic-color, #333);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
            }

            .links {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .links a {
                color: var(--link-color, #0066cc);
                text-decoration: none;
            }

            .links a:hover {
                text-decoration: underline;
            }
        `;

        const topics = this.getAttribute("topics")
            ? JSON.parse(this.getAttribute("topics"))
            : [];
        const links = this.getAttribute("links")
            ? JSON.parse(this.getAttribute("links"))
            : [];

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
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
