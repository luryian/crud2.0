import { Clinica } from './../../models/clinica';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the FormClinicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-clinica',
  templateUrl: 'form-clinica.html',
})
export class FormClinicaPage {

  titulo = '';
  clinica = new Clinica();
  clinicaID = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clinicaProvider: ClinicaProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {

      const clinicaID = this.navParams.get('itemID')
      const clinica = this.navParams.get('item')

      if (clinicaID){
        this.clinicaID = clinicaID
        this.clinica = clinica;
        }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormClinicaPage');
  }

  salvar(){

    this.clinica.lat = parseFloat(this.clinica.lat + '')
    this.clinica.lng = parseFloat(this.clinica.lng + '')

    if(this.clinicaID) {

      this.titulo = 'Editar Clinica'
      this.clinicaProvider.atualizarFS(this.clinicaID, this.clinica).then(_ =>{
      this.presentToast('Clinica atualizado com sucesso');
      })

    }else{

      this.titulo = 'Cadastrar clinica'
      this.clinicaProvider.inserirFS(this.clinica).then(_ => {
        this.presentToast('Clinica incerido com sucesso');
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
              this.clinicaProvider.removerFS(this.clinicaID).then(_ => {
              })
            console.log('Agree clicked');
          }
        }
      ]
    });
  }

}
