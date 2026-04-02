import Page from './Page';
import { Router } from '../utils/Router';
import { CatchingService } from '../service/CatchingService';
import { type CatchingInterface } from "../types/CatchingInterface";

export class Home extends Page {
    private catchingService = new CatchingService();
    private router = Router.getInstance();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element);
    }

    protected override handleGlobalClicks(event: Event) {
        const target = event.target as HTMLElement;
    
        if (target.closest('#btn-catching')) {
            const modal = this.element.querySelector<HTMLDialogElement>('#my_modal_1');
            modal?.showModal();
        }
    
        if (target.closest('#btn-create')) {
            event.preventDefault();

            const name = document.getElementById('input-catching-name') as HTMLInputElement;
            const uuid = self.crypto.randomUUID();
            this.catchingService.createCatching(uuid, name?.value);

            console.log('create catching ' + uuid);

            this.router.navigate(window.location.origin + `/catching?id=${uuid}`);
        }
    }

    public pageIsAvailable = () => {
        
    };

    override render = () => {
        return `
            <ul class="list bg-base-100 rounded-box shadow-md">
                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">All Cathings</li>
                ${
                    this.catchingService.getAllCatchings().map((catching: CatchingInterface) => {
                        return `
                            <li class="list-row">
                                <div>
                                    <img class="size-10 rounded-box" src="earth1.png">
                                </div>
                                <div>
                                  <a href="/catching?id=${catching.id}">${catching.name}</a>
                                  <div class="text-xs uppercase font-semibold opacity-60">Lorem ipsum</div>
                                </div>
                                <button class="btn btn-square btn-ghost">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Bin-1--Streamline-Ultimate" height="24" width="24">
                                <desc>
                                    Bin 1 Streamline Icon: https://streamlinehq.com
                                </desc>
                                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M1 5h22" stroke-width="1.5"></path>
                                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M14.25 1h-4.5c-0.39782 0 -0.77936 0.15804 -1.06066 0.43934C8.40804 1.72064 8.25 2.10218 8.25 2.5V5h7.5V2.5c0 -0.39782 -0.158 -0.77936 -0.4393 -1.06066C15.0294 1.15804 14.6478 1 14.25 1Z" stroke-width="1.5"></path>
                                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.75v-7.5" stroke-width="1.5"></path>
                                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M14.25 17.75v-7.5" stroke-width="1.5"></path>
                                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M18.86 21.62c-0.0278 0.3758 -0.197 0.7271 -0.4735 0.9832 -0.2764 0.256 -0.6397 0.3978 -1.0165 0.3968H6.63c-0.37683 0.001 -0.74006 -0.1408 -1.01653 -0.3968 -0.27647 -0.2561 -0.44565 -0.6074 -0.47347 -0.9832L3.75 5h16.5l-1.39 16.62Z" stroke-width="1.5"></path>
                                </svg>
                                </button>
                                <button class="btn btn-square btn-ghost">
                                  <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                                </button>
                            </li>
                        `
                    }).join('')
                }
            </ul>
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
                    <input 
                        type="text" 
                        class="input"
                        id="input-catching-name" 
                        placeholder="Type here" 
                    />
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