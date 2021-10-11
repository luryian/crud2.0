import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  nome = ''
  senha = ''
  email = ''
  constructor(public navCtrl: NavController,
    public UserProvider: UserProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrar(){

    let usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }

    //this.UserProvider.salvarusuario(usuario)
    this.UserProvider.cadastro(usuario)
    this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Cadastro Realizado',
      subTitle: 'Cadastro realizado com sucesso',
      buttons: [
        {
          text: 'OK',
      handler: data => {
        this.navCtrl.pop();
        }}]
    });
    alert.present();
  }

}
