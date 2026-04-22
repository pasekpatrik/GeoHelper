import'./Nav.css';

export class Nav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();

        window.addEventListener('load', () => {
            this.querySelector('.default-nav')?.classList.add('animation-nav');
        });
    }

    public render = () => {
        this.innerHTML = `
            <nav class="navbar bg-base-100 shadow-smc default-nav" data-theme="dark">
                <div class="navbar-start">
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul
                          tabindex="-1"
                          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                          <li><a href="/">Home</a></li>
                          <li><a href="/statistics">Statistics</a></li>
                          <li><a href="/settings">Settings</a></li>
                        </ul>
                    </div>
                </div>
                <div class="navbar-end">
                    <a class="btn btn-ghost text-xl" href="/">GeoHelper</a>
                </div>
            </nav>  
        `;
    }
}

customElements.define('nav-bar', Nav);