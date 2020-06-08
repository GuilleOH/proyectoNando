import { Component,OnInit, ViewChild, NgZone} from '@angular/core';
import { ToastController, LoadingController, ModalController, IonSearchbar, NavParams } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit{

 zoom:number;
 location: {
  address: string; //direccion del sitio elegido
  name: string; //nombre del sitio elegido (puede estar en blanco)
  latitude: number;
  longitude: number;
} = {
  address: '',
  name: '',
  latitude: null,
  longitude: null,
};
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
    private ngZone: NgZone,
    private navParams : NavParams
  ) {}


  ngOnInit(){


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
          this.location.address = place.formatted_address;
          this.location.name = place.name;
          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }


  /**
  Usando geolocalización buscamos nuestras coordenadas y nuestra dirección
  */
  private setCurrentLocation() {
    if ('geolocation' in navigator) {

      if(this.navParams.data.loc){
        this.location = this.navParams.data.loc;
        this.zoom = 15;
      }

      else{
        navigator.geolocation.getCurrentPosition((position) => {
          this.getAddress(position.coords.latitude, position.coords.longitude);
        }, (err)=>{

          this.locationDefecto();
          this.zoom = 15;
          this.getAddress(this.location.latitude, this.location.longitude);
        });
      }

    }
  }


/**
//Ponemos coordenadas de Valencia por defecto si falla la geolocalizacion
*/
  private locationDefecto(){
    this.location.latitude = 39.4697500;
    this.location.longitude = -0.3773900;
    this.location.address = '';
    this.location.name = 'Valencia, España'
  }


/**
A partir de unas coordenadas buscamos una direccion.
Si todo va bien guardamos las variables latitude, longitude y address
*/
 getAddress(latitude, longitude) {
   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
     if (status === 'OK') {
       if (results[0]) {
         this.zoom = 15;
         this.location.latitude = latitude;
         this.location.longitude = longitude;
         this.location.address = results[0].formatted_address;
         this.location.name = null;
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
    this.location.latitude = event.coords.lat;
    this.location.longitude = event.coords.lng;
    this.getAddress(this.location.latitude, this.location.longitude);
}

  onGoBack(){
    this.modalCtrl.dismiss({
      location: this.location
    });
  }
}
