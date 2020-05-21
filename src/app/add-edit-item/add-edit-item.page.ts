import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController} from '@ionic/angular';
import { ListService } from '../list.service';
import { Validators } from '@angular/forms';
import { MapPage } from '../map/map.page';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.page.html',
  styleUrls: ['./add-edit-item.page.scss'],
})

export class AddEditItemPage {
  item: any;
  tabIndex: number;
  itemIndex: number;
  iconos: Array <string>;
  colores: Array< { valor: string, fondo: string, texto: string}>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController,
              private modalCtrl: ModalController,

              private ListService: ListService) {

    this.iconos = ["person", "heart", "beer", "cart"];

    this.colores = [{valor: "urgente", fondo: "urgente-bg" , texto: "Urgent"},
                    {valor: "atencion" , fondo: "atencion-bg", texto: "Attention"},
                    {valor: "normal" , fondo: "normal-bg", texto: "Normal"}
                    ];

                    // Mejor hacer con ngClass

    this.tabIndex = +this.route.snapshot.paramMap.get('tab');
    this.itemIndex = +this.route.snapshot.paramMap.get('item');
    if (this.itemIndex >= 0) {
      this.item = Object.assign({}, this.ListService.getItem(this.tabIndex, this.itemIndex));
      this.item.date = new Date(this.item.date).toISOString();
    }
    else {
      this.item = { date: new Date().toISOString(), task: '', icon: 'radio-button-off'};
    }
  }

  async error(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  save() {
    if (!this.item.task.length) {
      this.error('The task cannot be empty');
    }
    else {
      if (this.itemIndex >= 0) {
        this.ListService.setItem(this.tabIndex, this.item, this.itemIndex);
      }
      else {
        this.ListService.setItem(this.tabIndex, this.item);
      }
      this.router.navigate(['/home']);
    }
  }

  async onOpenMap(){
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: {
      },
      backdropDismiss: false,
      cssClass:'modalAncho'
    });
    await modal.present();
    /*Al salir de la pagina del mapa cogemos la direccion seleccionada y la guardamos en el item
    (no entiendo bien porque viene en data.data.address y no directamente en data.address pero así funciona)*/
    modal.onDidDismiss().then((data:any)=>{
      this.item.location = data.data ?  data.data.address: '';
    });
  }
}
