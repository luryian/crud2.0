import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Medico } from '../../models/medico';
import { MedicoProvider } from '../../providers/medico/medico';

/**
 * Generated class for the FormMedicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-medico',
  templateUrl: 'form-medico.html',
})
export class FormMedicoPage {

  titulo = '';
  medico = new Medico();
  medicoID = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public medicoProvider : MedicoProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {

      const medicoID = this.navParams.get('itemID')
      const medico = this.navParams.get('item')

      if (medicoID){
        this.medicoID = medicoID
        this.medico = medico;
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormMedicoPage');
  }

  salvar(){

    if(this.medicoID) {

      this.titulo = 'Editar Medico'
      this.medicoProvider.atualizarFS(this.medicoID, this.medico).then(_ =>{
      this.presentToast('Medico atualizado com sucesso');
      })

    }else{

      this.titulo = 'Cadastrar Medico'
      this.medicoProvider.inserirFS(this.medico).then(_ => {
        this.presentToast('Medico incerido com sucesso');
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
      title: 'Excluir Medico?',
      message: 'Deseja excluir esse medico?',
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
              this.medicoProvider.removerFS(this.medicoID).then(_ => {
              })
            console.log('Agree clicked');
          }
        }
      ]
    });
  }

}
