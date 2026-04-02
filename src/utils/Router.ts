import type Page from '../pages/Page';

// TODO refactor
export class Router {
    private pages: Array<Page> | null = null;
    private pageNotFound: Page | null= null;
    private static instance: Router | null = null;

    private constructor() {}

    public static getInstance = () => {
        if (this.instance === null) this.instance = new Router();

        return this.instance;
    }

    public init = (pages: Array<Page>, pageNotFound: Page) => {
        this.pages = pages;
        this.pageNotFound = pageNotFound;

        this.router(window.location.href);

        window.addEventListener('popstate', () => {
            this.router(window.location.href);
        })

        window.addEventListener('click', (event) => {
            let element = event.target as HTMLAnchorElement;

            if (element.tagName === 'A') {
                event.preventDefault();

                window.history.pushState(null, '', element.href);
                this.router(element.href);
            }
        });
    }

    public router = (href: string) => {
        const url = new URL(href);

        const page = this.pages?.find((page) => {
            return url.pathname == page.key;
        })

        page ? page?.showPage() : this.pageNotFound?.showPage();
    }

    public navigate = (href: string) => {
        window.history.pushState(null, '', href);

        this.router(href);
    }
}