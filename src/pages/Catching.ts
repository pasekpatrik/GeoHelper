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

    protected override async handleGlobalSubmit(event: Event){
        event.preventDefault();
        const target = event.target as HTMLElement;

        if (target.closest('#form-lat-log')) {
            const coordRegex = /^[NSEW]?\s?\d+(\.\d+)?°?(\s?\d+(\.\d+)?'?)?(\s?\d+(\.\d+)?"?)?\s?[NSEW]?$/i;

            const latitudeInput = this.element.querySelector('#input-latitude') as HTMLInputElement;
            const longitudeInput = this.element.querySelector('#input-longitude') as HTMLInputElement;

            const latVal = latitudeInput.value.trim();
            const lonVal = longitudeInput.value.trim();
        
            const isLatValid = coordRegex.test(latVal);
            const isLonValid = coordRegex.test(lonVal);

            if (!isLatValid || !isLonValid) {
                this.element.querySelector('.warning')?.classList.add('show');
                return; 
            }

            this.element.querySelector('.warning')?.classList.remove('show');

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

    public override pageBeforeRendering = () => {
        this.setLoading(false);
        this.initCatching();
        
        this.audio = this.settingsService.getSettings().isAudioOn ? new Audio(checkSound) : null;
    }

    public pageIsAvailable = async () => {
        this.mapService.initMap('map');
        let loading = false;

        if (this.catching?.latitude !== null && this.catching?.longitude !== null) {
            const latitude = this.catching?.latitude ?? 0
            const longitude = this.catching?.longitude ?? 0

            const latitudeInput = this.element.querySelector('#input-latitude') as HTMLInputElement;
            const longitudeInput = this.element.querySelector('#input-longitude') as HTMLInputElement;
            latitudeInput.value = latitude.toString();
            longitudeInput.value = longitude.toString();

            loading = await this.mapService.findPath(latitude, longitude);
        } else {
            loading = await this.mapService.startMap();
        }

        this.setLoading(loading);
    }

    override render = () => {
        return `
            <h2 class="text-5xl font-bold m-4">${this.catching?.name}</h2>
            <map-help></map-help>

            <section class="flex flex-col ml-8 mt-4 mb-8 md:flex-row">

                <div>
                    <form class="w-xs flex flex-col" id="form-lat-log">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Latitude</legend>
                            <input 
                                type="text" 
                                class="input" 
                                id="input-latitude" 
                                placeholder="Type here" 
                                required
                            />
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Longitude</legend>
                            <input 
                                type="text" 
                                class="input" 
                                id="input-longitude" 
                                placeholder="Type here" 
                                required
                            />
                        </fieldset>

                        <div class="warning w-full bg-orange-200 px-6 py-4 my-4 rounded-md text-sm">
                            <svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z">
                                </path>
                            </svg>
                            <span class="text-yellow-800">Only numbers, directions (N, S, E, W), and symbols (° ' ") are allowed.</span>
                        </div>

                        <input 
                            type=submit 
                            class="btn" 
                            value="Submit"
                        />
                    </form>
                </div>

                <div class="flex flex-col md:ml-8">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Catching</legend>
                        <label>
                            Catch
                            <input 
                                type="checkbox" 
                                class="checkbox"
                                id="box-catch"
                                ${this.catching?.isCatch ? 'checked' : ''}
                            />
                        </label>
                    </fieldset>
                </div>
                
            </section>

            <loader-spin
                data-active=${this.loading}
            >
            </loader-spin>
        `;
    }
}