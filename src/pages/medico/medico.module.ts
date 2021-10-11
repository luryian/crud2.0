import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicoPage } from './medico';

@NgModule({
  declarations: [
    MedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicoPage),
  ],
})
export class MedicoPageModule {}
