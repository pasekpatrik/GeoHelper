import { CatchingDAO } from '../storage/CatchingDAO';
import L from 'leaflet';
import 'leaflet-routing-machine';

export class CatchingService {
    private catchingDAO = new CatchingDAO();

    public createCatching = (id: string, name: string) => {
        this.catchingDAO.create({
            id: id,
            name: name
        })
    }

    public getCatching = (id: string) => {
        return this.catchingDAO.find(id);
    }

    public getAllCatchings = () => {
        return this.catchingDAO.findAll();
    }

    public getParams = (param: string) => {
        let params = new URLSearchParams(document.location.search);
        return params.get(param); 
    }

    public initMap = (latitude: number, longitude: number, idElement: string) => {
        const map = L.map(idElement).setView([latitude, longitude], 13);

	    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    maxZoom: 19,
		    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	    }).addTo(map);

        const marker = L.marker([latitude, longitude]).addTo(map)

        const control = L.Routing.control({
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