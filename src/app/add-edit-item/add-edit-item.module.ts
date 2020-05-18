import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditItemPageRoutingModule } from './add-edit-item-routing.module';

import { AddEditItemPage } from './add-edit-item.page';

// import { MapPageModule } from '../map/map.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditItemPageRoutingModule,
    // MapPageModule
  ],
  declarations: [AddEditItemPage]
})
export class AddEditItemPageModule {}
