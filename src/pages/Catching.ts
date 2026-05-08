import Page from './Page';
// @ts-ignore
import { Map } from '../components/Map/Map';
// @ts-ignore
import { Loader } from '../components/Loader/Loader';
import { CatchingService } from '../domain/CatchingService';
import type { CatchingInterface } from '../types/CatchingInterface';
import { SettingsService } from '../domain/SettingsService';

import checkSound from '../assets/media/check.mp3';
import { MapService } from '../domain/MapService';

export class Catching extends Page {
    private catchingService = new CatchingService();
    private settingsService = new SettingsService();
    private mapService = new MapService();

    private catching: CatchingInterface | null = null;
    private loading: boolean = false;
    private audio: HTMLAudioElement | null = null;

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

    protected override async handleGlobalClicks(event: Event) {
        const target = event.target as HTMLElement;

        if (target.closest('#btn-submit')) {
            const latitudeInput = this.element.querySelector('#input-latitude') as HTMLInputElement;
            const longitudeInput = this.element.querySelector('#input-longitude') as HTMLInputElement;

            const latitude = this.catchingService.convertInputToDegree(latitudeInput);
            const longitude = this.catchingService.convertInputToDegree(longitudeInput);

            const updateCatching: CatchingInterface = {
                id: this.catching?.id ?? '',
                name: this.catching?.name ?? '',
                latitude: latitude,
                longitude: longitude,
                isCatch: this.catching?.isCatch ?? false
            }

            this.catchingService.updateCatching(this.catching?.id ?? '', updateCatching);
            await this.mapService.findPath(latitude, longitude);
        }

        this.initCatching();
    }

    protected override handleGlobalChange(event: Event) {
        const target = event.target as HTMLElement;

        if (target.closest('#box-catch')) {
            if (!this.catching?.isCatch) this.audio?.play();

            const updateCatching: CatchingInterface = {
                id: this.catching?.id ?? '',
                name: this.catching?.name ?? '',
                latitude: this.catching?.latitude ?? null,
                longitude: this.catching?.longitude ?? null,
                isCatch: !this.catching?.isCatch
            }

            this.catchingService.updateCatching(this.catching?.id ?? '', updateCatching);
        }

        this.initCatching();
    }

    public override pageBeforeRendering = () => {
        this.setLoading(false);

        this.initCatching();
        this.audio = this.settingsService.getSettings().isAudioOn ? new Audio(checkSound) : null;
    }

    public pageIsAvailable = () => {
        this.mapService.initMap('map');

        if (this.catching?.latitude !== null && this.catching?.longitude !== null) {
            // TODO - vyřešit kde načítat souřednice 
            const latitude = this.catching?.latitude ?? 0
            const longitude = this.catching?.longitude ?? 0

            const latitudeInput = this.element.querySelector('#input-latitude') as HTMLInputElement;
            const longitudeInput = this.element.querySelector('#input-longitude') as HTMLInputElement;
            latitudeInput.value = latitude.toString();
            longitudeInput.value = longitude.toString();

            this.mapService.findPath(latitude, longitude);
        } else {
            this.mapService.startMap();
        }

        this.setLoading(true);
    }

    override render = () => {
        return `
            <h2 class="text-5xl font-bold m-4">${this.catching?.name}</h2>
            <map-help></map-help>

            <section class="flex flex-col ml-8 mt-4 md:flex-row">

                <div>
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

                <div class="flex flex-col mt-4 md:ml-8">
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