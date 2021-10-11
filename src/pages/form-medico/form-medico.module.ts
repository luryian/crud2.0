import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormMedicoPage } from './form-medico';

@NgModule({
  declarations: [
    FormMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormMedicoPage),
  ],
})
export class FormMedicoPageModule {}
