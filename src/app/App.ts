// Pages
import { Home } from '../pages/Home/Home';
import { Catching } from '../pages/Catching';
import { Settings } from '../pages/Settings/Settings';
import { Statistics } from '../pages/Statistics';
import { PageNotFound } from '../pages/PageNotFound';

// @ts-ignore
import { Nav } from '../components/Nav/Nav';
import { Router } from '../utils/Router';
import { SettingsService } from '../service/SettingsService';

export default class App {
    private static instance: App | null = null;
    private settingsService = new SettingsService();

    private constructor () {};

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new App();
        }

        return this.instance;
    }

    public run = (root: HTMLElement) => {
        const navBar = document.createElement('nav-bar');
        const content = document.createElement('main');
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

        if (this.settingsService.getSettings().length === 0) this.settingsService.createSettings('1', true);
    }
}
