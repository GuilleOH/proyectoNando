import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyA_gfyFSV_DqJsXRd21nHTh45n9Z8QmjuQ'  //Apikey Google Nando
    }),
  ],
  declarations: [MapPage],
  entryComponents: [MapPage],
})
export class MapPageModule {}
