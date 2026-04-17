// @ts-ignore
import { Nav } from "../components/Nav/Nav";
import { Catching } from "../pages/Catching";
import { Home } from "../pages/Home/Home";
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
        content.classList.add('container');

        const router: Router = Router.getInstance();
        router.init([
            new Home('/', 'Home', content), 
            new Statistics('/statistics', 'Statistics', content),
            new Settings('/settings', 'Settings', content),
            new Catching('/catching', 'Catching', content)
        ],  
            new PageNotFound('/404', 'Page not found', content)
        );
        
        root.append(navBar, content);
    }
}
