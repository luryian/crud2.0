import { FirebaseStorageProvider } from './../../providers/firebase-storage/firebase-storage';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  @ViewChild('fileUserPhoto') fileUserPhoto;

  item = new User();
  foto = '/src/assets/imgs/userIMG.png';
  isUploaded = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public afsp: FirebaseStorageProvider,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {

      const loader = this.loadingCtrl.create({
        content: "aguarde",
      });
      loader.present();

    console.log('ionViewDidLoad ConfigPage');

    this.userProvider.lerLocal().then(_userID =>{
      this.userProvider.byId(_userID).subscribe(_user =>{

        this.item = new User();
        this.item.id = _userID
        this.item.nome = _user['nome']
        this.item.email = _user['email']

        const path = '/user/' + this.item.id + '/foto.jpg'
        this.afsp.downloadImageStorage(path).then(_data => {
          console.log('foto', _data)

          this.foto = _data
          loader.dismiss();
        });

      })
    })
  }

  salvar(){
    this.afsp.uploadImagemStorage(this.foto, '/user/' + this.item.id + '/foto.jpg');
  }

  escolherFoto() {
    this.fileUserPhoto.nativeElement.click();
  }

  processWebImage($event){
    this.afsp.processWebImage($event, (imageBase64, w, h) => {
      this.foto = imageBase64;
      this.isUploaded = true;
    });
  }
}
