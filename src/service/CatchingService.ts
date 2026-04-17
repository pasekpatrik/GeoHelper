import { Repository } from '../storage/Repository';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { decimalToDegrees } from '../utils/calculator';

export class CatchingService {
    private repository = new Repository('catching');
    public map: any;
    public coords: any;

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

    public convertInputToDegree = (input: HTMLInputElement) => {
        let newInput = input.value.split(" ")
        let coordinates = []

        for (let coor of newInput) {
            coordinates.push(Number(coor))
        }

        return decimalToDegrees(coordinates[0] ?? 0, coordinates[1] ?? 0, coordinates[2] ?? 0)
    }

    public initMap = (idElement: string) => {
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
    }

    public startMap = (latitude: number, longitude: number, idElement: string) => {
        this.initMap(idElement);

        this.map.setView([latitude, longitude], 13);

        L.marker([latitude, longitude]).addTo(this.map)
    }

    public findPath = async (latitude: number, longitude: number, idElement: string) => {
        this.initMap(idElement);
        
        this.coords = await this.getGeoLocation();

        L.Routing.control({
            waypoints: [
              L.latLng(this.coords.latitude, this.coords.longitude),
              L.latLng(latitude, longitude)
            ],
            routeWhileDragging: true
        }).addTo(this.map);

        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 30
        }).addTo(this.map);
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