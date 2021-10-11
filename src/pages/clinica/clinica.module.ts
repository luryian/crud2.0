import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicaPage } from './clinica';

@NgModule({
  declarations: [
    ClinicaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicaPage),
  ],
})
export class ClinicaPageModule {}
