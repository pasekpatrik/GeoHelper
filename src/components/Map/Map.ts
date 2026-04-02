import styles from './Map.css?inline';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export class Map extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    public render = () => {
        this.innerHTML = `
            <style>${styles}</style>
            <div id="map"></div>
        `
    }
}

customElements.define('map-help', Map);