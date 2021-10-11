import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-paciente',
  templateUrl: 'filter-paciente.html',
})
export class FilterPacientePage {

  cidade=""

  estado=""

  cidadeArr = [
  'Boa Viagem',
  'Fortaleza',
  'Aquiraz',
  'Eusebio'
  ]

  estadoArr = [
    'CE',
    'SP',
    ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewcrtl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPacientePage');
  }

  fechar(){
    this.viewcrtl.dismiss();
  }

  filtrar(){
    const params = {cidade: this.cidade,
      estado: this.estado,
      isLimpar: false
    };
    this.viewcrtl.dismiss(params);
  }

  limpar(){
    const params = {cidade: this.cidade,
      estado: this.estado,
    isLimpar: true
    };
    this.viewcrtl.dismiss(params);
  }
}
