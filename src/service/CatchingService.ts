import { Repository } from '../storage/Repository';
import L from 'leaflet';
import 'leaflet-routing-machine';

export class CatchingService {
    private repository = new Repository('catching');

    public createCatching = (id: string, name: string) => {
        this.repository.create({
            id: id,
            name: name
        })
    }

    public getCatching = (id: string) => {
        return this.repository.find(id);
    }

    public getAllCatchings = () => {
        return this.repository.findAll();
    }

    public deleteCatching = (id: string) => {
        this.repository.delete(id);
    }

    public getParams = (param: string) => {
        let params = new URLSearchParams(document.location.search);
        return params.get(param); 
    }

    public initMap = (latitude: number, longitude: number, idElement: string) => {
        const map = L.map(idElement).setView([latitude, longitude], 13);

	    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    maxZoom: 19,
		    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	    }).addTo(map);

         L.marker([latitude, longitude]).addTo(map)

         L.Routing.control({
            waypoints: [
              L.latLng(latitude, longitude),
              L.latLng(50.0900, 14.4500)
            ],
            routeWhileDragging: true
          }).addTo(map);

        map.on('click' , () => {
            document.getElementById(idElement)?.requestFullscreen();
        })
    }

    public getGeoLocation = (): Promise<{ latitude: number, longitude: number }> => {
        return new Promise((resolve, reject) => {
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
        });
    }
}