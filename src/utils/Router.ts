import type Page from '../pages/Page';

export class Router {
    private pages: Array<Page>;

    constructor(pages: Array<Page>){
        this.pages = pages;

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

        for (let page of this.pages) {
            if (url.pathname == page.key) {
                page.showPage();
                return;
            }
        }

        this.router(url.origin + '/404')
    }
}