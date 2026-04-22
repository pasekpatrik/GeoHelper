import { CatchingService } from '../service/CatchingService';
import Page from './Page';
// @ts-ignore
import { Map } from '../components/Map/Map';
import { Loader } from '../components/Loader/Loader';

import type { CatchingInterface } from '../types/CatchingInterface';

export class Catching extends Page {
    private catchingService = new CatchingService();
    private catching: CatchingInterface | null = null;
    private loading: boolean = false;

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    private initCatching = () => {
        this.catching = this.catchingService.getCatching(this.catchingService.getParams('id') ?? '');
    }

    private setLoading(value: boolean) {
        this.loading = value;
        const loader = this.element.querySelector('loader-spin');

        if (loader) {
            loader.setAttribute('data-active', String(value));
        }
    }

    protected override handleGlobalClicks(event: Event) {
        const target = event.target as HTMLElement;
    
        if (target.closest('#btn-submit')) {
            const latitudeInput = document.getElementById('input-latitude') as HTMLInputElement;
            const longitudeInput = document.getElementById('input-longitude') as HTMLInputElement;

            const latitude = this.catchingService.convertInputToDegree(latitudeInput)
            const longitude = this.catchingService.convertInputToDegree(longitudeInput)

            const updateCatching: CatchingInterface = {
                id: this.catching?.id ?? '',
                name: this.catching?.name ?? '',
                latitude: latitude,
                longitude: longitude,
                isCatch: this.catching?.isCatch ?? false
            }

            this.catchingService.updateCatching(this.catching?.id ?? '', updateCatching)
            this.catchingService.findPath(latitude, longitude, 'map');
        }

        this.initCatching();
    }

    protected override handleGlobalChange(event: Event) {
        const target = event.target as HTMLElement;

        if (target.closest('#box-catch')) {
            const updateCatching: CatchingInterface = {
                id: this.catching?.id ?? '',
                name: this.catching?.name ?? '',
                latitude: this.catching?.latitude ?? null,
                longitude: this.catching?.longitude ?? null,
                isCatch: !this.catching?.isCatch
            }

            this.catchingService.updateCatching(this.catching?.id ?? '', updateCatching);
        }

        this.initCatching()
    }

    public pageIsAvailable = async () => {
        const coords = await this.catchingService.getGeoLocation();

        if (this.catching?.latitude !== null && this.catching?.longitude !== null) {
            // TODO - vyřešit kde načítat souřednice 
            const latitude = this.catching?.latitude ?? 0
            const longitude = this.catching?.longitude ?? 0

            const latitudeInput = document.getElementById('input-latitude') as HTMLInputElement;
            const longitudeInput = document.getElementById('input-longitude') as HTMLInputElement;
            latitudeInput.value = latitude.toString();
            longitudeInput.value = longitude.toString();
            
            await this.catchingService.findPath(latitude, longitude, 'map');
        } else {
            this.catchingService.startMap(coords.latitude, coords.longitude, 'map');
        }

        this.setLoading(true);
    }

    override render = () => {
        this.setLoading(false);
        this.initCatching();

        return `
            <h1 class="text-5xl font-bold m-4">${this.catching?.name}</h1>
            <map-help></map-help>
            <section class="flex ml-8 mt-4">

                <div class="" data-theme="light">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Latitude</legend>
                        <input type="text" class="input" id="input-latitude" placeholder="Type here" />
                    </fieldset>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Longitude</legend>
                        <input type="text" class="input" id="input-longitude" placeholder="Type here" />
                    </fieldset>
                    <button class="btn" id="btn-submit">Submit</button>
                </div>

                <div class="ml-8 flex flex flex-col" data-theme="light">
                    <label>
                        Catch
                        <input 
                            type="checkbox" 
                            class="checkbox"
                            id="box-catch"
                            ${this.catching?.isCatch ? 'checked' : ''}
                        />
                    </label>
                </div>
                
            </section>
            <loader-spin
                data-active=${this.loading}
            >
            </loader-spin>
        `;
    }
}