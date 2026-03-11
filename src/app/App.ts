// @ts-ignore
import { Nav } from "../components/Nav/Nav";
import { Catching } from "../pages/Catching";
import { PageNotFound } from "../pages/PageNotFound";
import { Settings } from "../pages/Settings";
import { Statistics } from "../pages/Statistics";
import { Router } from "../utils/Router";

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
        const content = document.createElement('div');

        new Router(
            [
                new Catching('/', 'Catching', content), 
                new Statistics("/statistics", "Statistics", content),
                new Settings("/settings", "Settings", content),
                new PageNotFound("/404", "Page not found", content)
            ]
        )

        root.append(navBar, content);
    }
}
