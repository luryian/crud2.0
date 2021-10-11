import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPacientePage } from './filter-paciente';

@NgModule({
  declarations: [
    FilterPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPacientePage),
  ],
})
export class FilterPacientePageModule {}
