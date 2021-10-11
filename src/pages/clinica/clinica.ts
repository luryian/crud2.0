import { Component } from '@angular/core';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';

/**
 * Generated class for the ClinicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinica',
  templateUrl: 'clinica.html',
})
export class ClinicaPage {

  clinicas = []

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public clinicaProvider: ClinicaProvider,
    public navParams: NavParams) {

      this.carregarLista()

}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ClinicaPage');
  }

  addclinica(){
    this.navCtrl.push('FormClinicaPage');
}

  editItem(item){
    const clinicaID = item.key;
    const clinica = item.value;

    this.navCtrl.push('FormPacientePage', {itemID: clinicaID, item: clinica } );
  }


  openFilter(){
    const modal = this.modalCtrl.create('FilterClinicaPage');

    modal.onDidDismiss(_data => {
      if(_data !== undefined){

        if(_data.isLimpar){

          this.carregarLista()

      }

        }

        else {
        let cidade = _data.cidade;
        let estado = _data.estado;
        console.log(cidade)

        this.clinicaProvider.buscarFS(estado,cidade).subscribe(_data => {
          console.log('buscar',_data);
          this.clinicas = _data;
    })
  }


    });

    modal.present();
  }

  carregarLista(){
    this.clinicaProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.clinicas = _data;
})
  }

  }


