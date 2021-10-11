import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterClinicaPage } from './filter-clinica';

@NgModule({
  declarations: [
    FilterClinicaPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterClinicaPage),
  ],
})
export class FilterClinicaPageModule {}
