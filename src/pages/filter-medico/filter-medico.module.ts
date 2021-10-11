import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterMedicoPage } from './filter-medico';

@NgModule({
  declarations: [
    FilterMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterMedicoPage),
  ],
})
export class FilterMedicoPageModule {}
