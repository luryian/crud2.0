import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormPacientePage } from './form-paciente';

@NgModule({
  declarations: [
    FormPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(FormPacientePage),
  ],
})
export class FormPacientePageModule {}
