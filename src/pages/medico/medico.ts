import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { MedicoProvider } from '../../providers/medico/medico';

/**
 * Generated class for the MedicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medico',
  templateUrl: 'medico.html',
})
export class MedicoPage {

  medicos = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public medicoProvider: MedicoProvider,
    public modalCtrl: ModalController
    ) {

      this.medicoProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.medicos = _data;

      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicoPage');
  }

  addmedico(){
    this.navCtrl.push("FormMedicoPage");
  }

  editItem(item){
    const medicoID = item.key;
    const medico = item.value;

    this.navCtrl.push('FormMedicoPage', {itemID: medicoID, item: medico } );
  }

  openFilter(){
    const modal = this.modalCtrl.create('FilterMedicoPage');

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

        this.medicoProvider.buscarFS(estado,cidade).subscribe(_data => {
          console.log('buscar',_data);
          this.medicos = _data;
    })
  }


    });

    modal.present();
  }

  carregarLista(){
    this.medicoProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.medicos = _data;
})
  }

  }
