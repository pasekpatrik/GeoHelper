import { Nav } from '../components/Nav/Nav';

export default class App {
    private static instance: App | null = null;

    private constructor () {}

    public static getInstance() {
        if (this.instance === null) {
            return new App()
        }

        return this.instance;
    }

    public run = (root: HTMLElement) => {
        customElements.define('nav-bar', Nav);
        const navBar = document.createElement('nav-bar');
        root.appendChild(navBar);
    }
}