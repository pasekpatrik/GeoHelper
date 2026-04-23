import './Loader.css';

export class Loader extends HTMLElement {
    static get observedAttributes() {
        return ['data-active'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.updateVisibility();
    }

    attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
        if (name === 'data-active') {
            this.updateVisibility();
        }
    }

    private updateVisibility() {
        const loader = this.querySelector('.loader');
        if (!loader) return;

        if (this.getAttribute('data-active') === "true") {
            loader.classList.add('loader-hidden');
        }
    }

    public render = () => {
        this.innerHTML = `<div class="loader"></div>`;
    }
}

customElements.define('loader-spin', Loader);