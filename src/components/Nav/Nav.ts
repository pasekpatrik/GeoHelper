import styles from './Nav.css?inline';

export class Nav extends HTMLElement {
    private shadow;

    constructor () {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    public render = () => {
        this.shadow.innerHTML = `
        <style>${styles}</style>
        <nav>
            <a href="/" id="nav-logo"><img src="/" alt="Logo" id="logo"></a>
            <ul class="nav-menu">
                <li><a href="#Home" id="home">Domů</a></li>
                <li><a href="#Skills" id="skills">Dovednosti</a></li>
                <li><a href="#Profile" id="profile">Profil</a></li>
                <li><a href="#Projects" id="projects">Projekty</a></li>
                <li><a href="#Contact" id="contact">Kontakt</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
        `;
    }
}