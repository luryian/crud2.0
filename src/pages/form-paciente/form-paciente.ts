import { Paciente } from './../../models/paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacientesProvider } from '../../providers/pacientes/pacientes';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the FormPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-paciente',
  templateUrl: 'form-paciente.html',
})
export class FormPacientePage {

  titulo = ''
  pacienteID = undefined
  paciente = new Paciente();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pacientesProvider: PacientesProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {

      const pacienteID = this.navParams.get('itemID')
      const paciente = this.navParams.get('item')

      if (pacienteID){
      this.pacienteID = pacienteID
      this.paciente = paciente;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPacientePage');
  }

  salvar(){

    if(this.pacienteID) {

      this.titulo = 'Editar paciente'
      this.pacientesProvider.atualizarFS(this.pacienteID, this.paciente).then(_ =>{
      this.presentToast('paciente atualizado com sucesso');
      })

    }else{

      this.titulo = 'Cadastrar paciente'
      this.pacientesProvider.inserirFS(this.paciente).then(_ => {
        this.presentToast('paciente incerido com sucesso');
        this.navCtrl.pop();

      });

    }
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      showCloseButton : true,
      closeButtonText : 'ok'
    });
    toast.present();
  }

  excluir() {
    const confirm = this.alertCtrl.create({
      title: 'Excluir paciente?',
      message: 'Deseja excluir esse paciente?',
      buttons: [
        {
          text: 'não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'sim',
          handler: () => {
              this.pacientesProvider.removerFS(this.pacienteID).then(_ => {
              })
            console.log('Agree clicked');
          }
        }
      ]
    });
  }
}
