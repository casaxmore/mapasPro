import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService) {}

  ngAfterViewInit(): void {

    if(!this.placesService.useLocation) throw Error('No hay placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation,
      zoom: 14, // starting zoom
    });

    const poup = new Popup()
      .setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({color: 'red'})
      .setLngLat(this.placesService.useLocation)
      .setPopup(poup)
      .addTo(map)
  }
}
