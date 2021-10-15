import { ClinicaProvider } from './../../providers/clinica/clinica';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExportProvider } from '../../providers/export/export';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map;
  clinicasArr = [];

  constructor(public navCtrl: NavController,
    public clinicaProvider: ClinicaProvider,
    public exportProvider: ExportProvider,
    ) {

      this.clinicaProvider.listarFS().subscribe(_data =>{
        console.log('clinicas', _data)
        this.clinicasArr = _data

        for(let i = 0;  i < _data.length; i++ ){
          const item = _data[i];

          let lat = item.value.lat;
          let lng = item.value.lng;
          let local = item.value.local;
        }
      })

  }

  ionViewDidLoad(){
    this.map = this.createMap(this.mapElement)

    //let arrMarkers = [{lat: -5.081357184675141, lng: -39.70482921223503, nome: "Boa Viagem", abrev:"B"},
    //{lat: -5.125021220823475, lng: -39.729510918850245, nome: "Hospital", abrev:"H"}];

    this.clinicaProvider.listarFS().subscribe(_data =>{
      console.log('clinicas', _data)

      for(let i = 0;  i < _data.length; i++ ){
        const element = _data[i];

        let _lat = element.value.lat;
        let _lng = element.value.lng;
        let _local = element.value.local;

        let item={
          lat: _lat,
          lng: _lng,
          nome: _local,
          abrev: ""
        }

        this.carregaDadosMapa(item);
      }
    })
  }

  carregaDadosMapa(item){


      const infowindow = this.addInfoWindow(item.nome)

      const marker = this.addMarker(item.lat, item.lng, item.nome, item.abrev)

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: this.map
        });
      });

      marker.setMap(this.map)

  }

  createMap(mapElement){
  if(mapElement !== null && mapElement.nativeElement !== null && google ){
    let options = {
      zoom: 7,
      center: {lat: -5.081357184675141, lng: -39.70482921223503}
    };

    return new google.maps.Map(mapElement.nativeElement, options)
  }
  return undefined
}

  addMarker(_lat,_lng,abrev,nome){
    return new google.maps.Marker({
      position: {lat: _lat , lng: _lng  },
      title: nome,
      icon: new google.maps.MarkerImage(
        'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=' + abrev
      )
    })
  }

  addInfoWindow(texto: string){

    let contentHtml = `
    | local: ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }

  gerarPDF(){
    this.exportProvider.gerarPDF(this.exportarDados(),'clinicas')
  }

  gerarExel(){
    this.exportProvider.gerarExel(this.exportarDados(),'clinicas')
  }

  gerarCSV(){
    this.exportProvider.gerarCSV(this.exportarDados(),'clinicas')
  }

  private exportarDados(){
    const jsonArr = [];

    for (let i = 0; i<this.clinicasArr.length; i++){

      const element = this.clinicasArr[i];

      const key = element.key
      const value = element.value

      value.cidade;
      value.estado;
      value.lat;
      value.lng;
      value.local;
      value.nome;

      let _item = {
        'Cidade':value.cidade,
        'Estado':value.estado,
        'Latidute':value.lat,
        'Longitude':value.lng,
        'Local':value.local,
        'Nome':value.nome
      };
      jsonArr.push(_item)
    }
    return jsonArr;
  }

}
