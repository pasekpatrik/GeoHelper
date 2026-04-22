import './Map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png?url';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png?url';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png?url';

export class Map extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.setIconPaths();
        this.render();
    }

    public render = () => {
        this.innerHTML = `
            <div id="map"></div>
        `
    }

    private setIconPaths() {
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconUrl: iconUrl,
            iconRetinaUrl: iconRetinaUrl,
            shadowUrl: shadowUrl,
        });
    }
}

customElements.define('map-help', Map);