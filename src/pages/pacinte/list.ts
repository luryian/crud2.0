import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  pacientes = []

  constructor(public navCtrl:
    NavController,
    public navParams: NavParams,
    public pacienteProvider: PacientesProvider,
    public modalCtrl: ModalController,
    ) {

      this.pacienteProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.pacientes = _data;

      })

}

  addpaciente(){
    this.navCtrl.push('FormPacientePage');
  }

  editItem(item){
    const pacienteID = item.key;
    const paciente = item.value;

    this.navCtrl.push('FormPacientePage', {itemID: pacienteID, item: paciente } );
  }

  openFilter(){
    const modal = this.modalCtrl.create('FilterPacientePage');

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

        this.pacienteProvider.buscarFS(estado,cidade).subscribe(_data => {
          console.log('buscar',_data);
          this.pacientes = _data;
    })
  }


    });

    modal.present();
  }

  carregarLista(){
    this.pacienteProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.pacientes = _data;
})
  }

  }

