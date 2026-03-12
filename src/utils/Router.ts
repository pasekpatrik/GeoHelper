import type Page from '../pages/Page';

export class Router {
    private pages: Array<Page>;
    private pageNotFound: Page;

    constructor(pages: Array<Page>, pageNotFound: Page){
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
}