import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  email: '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public UserProvider: UserProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

 recuperar() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde",
      duration: 3000
    });
    loader.present();

    this.UserProvider.senha(this.email);

    loader.dismiss()
    this.showAlert()

  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Oi',
      subTitle: 'Mandamos um E-mail para você',
      buttons: ['OK']
    });
  }

}
