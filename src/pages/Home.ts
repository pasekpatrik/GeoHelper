import Page from './Page';
import { Storage } from '../utils/Storage';
import { Router } from '../utils/Router';

export class Home extends Page {
    private storage = Storage.getInstance();
    private router = Router.getInstance();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element);
    }

    private createCatching = (id: string, name: string) => {
        this.storage.setItem('catching', {
            id: id,
            name: name
        })
    }

    public override pageIsAvailable = () => {
        const modal = this.element.querySelector<HTMLDialogElement>('#my_modal_1');
        const btn = this.element.querySelector('#btn-catching');
        const create = this.element.querySelector('#btn-create');

        btn?.addEventListener('click', () => modal?.showModal());

        create?.addEventListener('click', (event) => {
            event.preventDefault();

            let uuid = self.crypto.randomUUID();
            this.createCatching(uuid, 'test');
            console.log('create catching' + uuid);

            this.router.navigate(window.location.origin + `/catching?item=${uuid}`);
        });
    }

    override render = () => {
        return `
            <div class="fab">
                <div tabindex="0" role="button" class="btn btn-lg btn-circle">
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

                <button 
                    class="btn btn-lg btn-circle" 
                    id="btn-catching" 
                    data-theme="light"
                >
                    🌍
                </button>
            </div>

            <dialog id="my_modal_1" class="modal">
              <div class="modal-box" data-theme="light">
                <h3 class="text-lg font-bold">Create catching!</h3>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Name</legend>
                    <input type="text" class="input" placeholder="Type here" />
                </fieldset>
                <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn" id="btn-create">Create</a>
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
        `;
    }
}