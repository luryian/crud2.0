import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEndereçoPage } from './form-endereço';

@NgModule({
  declarations: [
    FormEndereçoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormEndereçoPage),
  ],
})
export class FormEndereçoPageModule {}
