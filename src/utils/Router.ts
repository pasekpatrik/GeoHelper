import type Page from '../pages/Page';


// TODO refactor
export class Router {
    private pages: Array<Page>;
    private pageNotFound: Page;
    private static instance: Router | null = null;

    constructor(pages: Array<Page>, pageNotFound: Page){
        this.pages = pages;
        this.pageNotFound = pageNotFound;

        Router.instance = this;

        this.router(window.location.href);

        window.addEventListener('popstate', () => {
            this.router(window.location.href);
        })

        window.addEventListener('click', (event) => {
            let element = event.target as HTMLAnchorElement;

            if (element.tagName === 'A') {
                
                event.preventDefault();

                this.router(element.href);
                window.history.pushState(null, '', element.href);
            }
        });
    }

    public router = (href: string) => {
        const url = new URL(href);

        const page = this.pages.find((page) => {
            return url.pathname == page.key;
        })

        page ? page?.showPage() : this.pageNotFound.showPage();
    }

    public static navigate = (href: string) => {
        const absoluteUrl = href.startsWith('http') 
            ? href 
            : window.location.origin + href;

        window.history.pushState(null, '', absoluteUrl);

        Router.instance?.router(absoluteUrl);
    }
}