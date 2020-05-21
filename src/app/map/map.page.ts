import { Component,OnInit, ViewChild, NgZone} from '@angular/core';
import { ToastController, LoadingController, ModalController, IonSearchbar } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit{


 location: any;
 latitude: number;
 longitude: number;
 zoom:number;

 address: string;
 private geoCoder;


@ViewChild("mySearch",{static:false}) searchbar: IonSearchbar;


/**
La idea es usar esta página como un modal que se abra desde add-edit-item.page al pinchar en Location

Entonces al seleccionar un punto del mapa (ya veré si con click o con doble click) y mediante reverse geocoding
tendré que cerrar este modal con la direccion elegida
*/

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}


  ngOnInit(){//load Places Autocomplete
    this.mapsAPILoader.load().then(async () => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      //Por cada cambio en la barra buscadora autocompletamos las referencias
      let autocomplete = new google.maps.places.Autocomplete(await this.searchbar.getInputElement());
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }


  /**
  Usando geolocalización buscamos nuestras coordenadas y nuestra dirección
  */
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getAddress(position.coords.latitude, position.coords.longitude);
      }, (err)=>{
        //Ponemos coordenadas de Valencia por defecto si falla la geolocalizacion
        this.latitude = 39.4697500;
        this.longitude = -0.3773900;
        this.zoom = 13;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


/**
A partir de unas coordenadas buscamos una direccion.
Si todo va bien guardamos las variables latitude, longitude y address
*/
 getAddress(latitude, longitude) {
   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
     if (status === 'OK') {
       if (results[0]) {
         this.zoom = 12;
         this.latitude = latitude;
         this.longitude = longitude;
         this.address = results[0].formatted_address;
       } else {
         window.alert('No results found');
       }
     } else {
       window.alert('Geocoder failed due to: ' + status);
     }

   });
 }

 /**
Funcion que se hace al hacer click sobre el mapa
 */
  onClick(event){
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
}

  onGoBack(){
    this.modalCtrl.dismiss({
      address: this.address
    });
  }
}
