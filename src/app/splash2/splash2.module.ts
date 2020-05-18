import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Splash2PageRoutingModule } from './splash2-routing.module';

import { Splash2Page } from './splash2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Splash2PageRoutingModule
  ],
  declarations: [Splash2Page]
})
export class Splash2PageModule {}
