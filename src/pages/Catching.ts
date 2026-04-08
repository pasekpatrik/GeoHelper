import { CatchingService } from '../service/CatchingService';
import Page from './Page';
// @ts-ignore
import { Map } from '../components/Map/Map';
import type { CatchingInterface } from '../types/CatchingInterface';

export class Catching extends Page {
    private catchingService = new CatchingService();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    public pageIsAvailable = async () => {
       // this.catchingService.initMap();
       const coords = await this.catchingService.getGeoLocation();
       this.catchingService.initMap(coords.latitude, coords.longitude, 'map');
    }

    override render = () => {
        const id: string = this.catchingService.getParams('id') ?? '';
        const catching: CatchingInterface = this.catchingService.getCatching(id);

        return `
            <h1 class="text-5xl font-bold m-4">${catching?.name}</h1>
            <map-help></map-help>
            <div class="flex ml-8 mt-4">

                <div class="" data-theme="light">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Latitude</legend>
                        <input type="text" class="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Longitude</legend>
                        <input type="text" class="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <!--
                <div class="ml-8 flex flex flex-col" data-theme="light">
                    <label>
                        Catch
                        <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
                    </label>
                    <label>
                        Catch
                        <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
                    </label>
                    <label>
                        Catch
                        <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
                    </label>
                    <label>
                        Catch
                        <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
                    </label>
                </div>
                -->
            </div>
            
            
        `;
    }
}