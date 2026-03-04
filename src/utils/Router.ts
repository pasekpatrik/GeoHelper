class Router {
    private pages;
    private defaultPageUrl: string;
    private currentPage: string | null;

    constructor(pages: Array<string>, defaultPageUrl: string){
        this.pages = pages;
        this.defaultPageUrl = defaultPageUrl;
        this.currentPage = null;
    }

    public router = (href: string) => {
        const url = new URL(href);
    }
}