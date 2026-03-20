import Page from './Page';
import { Storage } from '../utils/Storage';

export class Home extends Page {
    private storage = Storage.getInstance()

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element);
    }

    override render = () => {
        return `
            <div class="fab">
                <div tabindex="0" role="button" class="btn btn-lg btn-circle" data-theme="dark">
                  <svg
                    aria-label="New"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>

                <a class="btn btn-lg btn-circle" href="/catching">
                  New
                </a>
            </div>  
        `;
    }
}