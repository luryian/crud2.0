import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

@IonicPage()

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class InicioPage {

  email = '';
  senha = '';


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  entrar(){
    this.email;
    this.senha;

    const loader = this.loadingCtrl.create({
      content: "Aguarde",
      duration: 3000
    });
    loader.present();

    this.userProvider.login(this.email,this.senha)
      .then(user => {
        console.log('user', user)
        loader.dismiss()

        this.userProvider.salvarLocal(user.uid).then(_data => {
          this.navCtrl.setRoot(HomePage);
        })

      }).catch(error =>{
        loader.dismiss();
        this.showAlert()
      })
  }

  esqueciSenha(){
    this.navCtrl.push('RecuperarSenhaPage')
  }

  cadastro(){
    this.navCtrl.push('CadastroPage')
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error ao fazer login',
      buttons: ['OK']
    });
  }

}
