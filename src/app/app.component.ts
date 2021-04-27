import { Component, OnInit } from '@angular/core';
import { Marker } from './model/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-maps';
  zoom: number = 15;
  defaultLat = -7.224424;
  defaultLng = -35.882311;

  markers: Marker[] = [
    {
      lat: this.defaultLat,
		  lng: this.defaultLng,
		  draggable: true
    }
  ];

  ngOnInit(): void {
    
  }

  mapClicked($event: any) {
    console.log($event.coords);
  }

  async setCurrentLocation() {
    const currentPosition = await this.getCurrentPosition();
    this.refreshMarker(currentPosition);
  }

  markerDragEnd(marker: Marker, $event: MouseEvent) {
    console.log('dragEnd', marker, $event);
  }

  getCurrentPosition(): Promise<any> {
    return new Promise<any>((resolve) => {
      navigator.geolocation.getCurrentPosition((res) => {
        resolve(res.coords);
      });
    });
  }

  refreshMarker(currentPosition: any) {
    this.markers.pop();
    this.markers.push({
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
      draggable: true,
    });
  }
}
