export default class Page {
    public key: string;
    public title: string;
    public element: HTMLElement;

    constructor(key: string, title: string, element: HTMLElement) {
        this.key = key;
        this.title = title;
        this.element = element;
    }

    public render = () => {
        return ``;
    }

    public showPage = () => {
        this.element.innerHTML = this.render();
        document.title = this.title;
    }
}