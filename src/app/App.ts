// @ts-ignore
import { Nav } from "../components/Nav/Nav";

export default class App {
    private static instance: App | null = null;

    private constructor () {}

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new App();
        }

        return this.instance;
    }

    public run = (root: HTMLElement) => {
        const navBar = document.createElement('nav-bar');
        root.appendChild(navBar);
    }
}