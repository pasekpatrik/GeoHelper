import L from 'leaflet';
import 'leaflet-routing-machine';

export class MapService {
    private map: any;
    private pathLayer: any;
    private routingControl: any = null;

    public initMap = (idElement: string) => {
        console.log('Start - init map');

        if (this.map) {
            this.map.remove();
        }

        this.map = L.map(idElement).fitWorld();

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    maxZoom: 19,
		    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	    }).addTo(this.map);

        this.map.on('click' , () => {
            document.getElementById(idElement)?.requestFullscreen();
        })

        this.pathLayer = L.layerGroup().addTo(this.map);

        console.log('End - init map');
    }

    public startMap = async () => {
        console.log('Start - start map');

        const coords = await this.getGeoLocation();

        this.map?.setView([coords.latitude, coords.longitude], 16);

        L.marker([coords.latitude, coords.longitude]).addTo(this.map);

        console.log('End - start map');
    }

    public findPath = async (latitude: number, longitude: number) => {
        console.log('Start - findPath');

        this.pathLayer?.clearLayers();
        const coords = await this.getGeoLocation();

        if (this.routingControl) {
            this.map?.removeControl(this.routingControl);
            this.routingControl = null;
        }

        this.routingControl = L.Routing.control({
            waypoints: [
              L.latLng(coords.latitude, coords.longitude),
              L.latLng(latitude, longitude)
            ],
            router: (L as any).Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                profile: 'foot',
            }),
             // @ts-ignore
            lineOptions: {
                styles: [{ color: 'green', opacity: 0.7, weight: 5 }]
            },
            show: false,
            addWaypoints: false
        }).addTo(this.map);

        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 30
        }).addTo(this.map);

        console.log('End - findPath');
    } 

    public getGeoLocation = (): Promise<{ latitude: number, longitude: number }> => {
        return new Promise((resolve, reject) => {
            console.log('Start - getGeoLocation');

            if (!navigator.geolocation) {
                console.warn('Warn: geolocation is not supported!');
                reject('Geolocation not supported');
                return;
            }
    
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                }, 
                (error) => {
                    console.error('Error with getting current position!', error);
                    reject(error);
                }
            );

            console.log('End - getGeoLocation');
        });
    }
}