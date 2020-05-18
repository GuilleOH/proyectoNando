import { Component } from '@angular/core';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage{

  location = {
    lat: 39.4561165,
    lng: -0.3545661,
  };

/**
La idea es usar esta página como un modal que se abra desde add-edit-item.page al pinchar en Location

Entonces al seleccionar un punto del mapa (ya veré si con click o con doble click) y mediante reverse geocoding
tendré que cerrar este modal con la direccion elegida
*/

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    
    // private mapsAPILoader: MapsAPILoader
  ) {}




    onClick(event){
      console.log(event);
       //
       // this.mapsAPILoader.load().then((f) => {
       //
       //  });
    }

    getCurrentLocation() {
      // this.mapsAPILoader.load().then(() => {
      //   let geocoder = new google.maps.Geocoder;
      //   let latlng = {lat: this.location.lat, lng: this.location.lng};
      //   let that = this;
      //   geocoder.geocode({'location': latlng}, function(results) {
      //       if (results[0]) {
      //         that.zoom = 11;
      //         that.currentLocation = results[0].formatted_address;
      //         //console.log(that.currentLocation);
      //       } else {
      //         console.log('No results found');
      //       }
      //   });
      // });
    }

    onGoBack(){
      this.modalCtrl.dismiss();
    }
}
