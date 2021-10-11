import { ClinicaProvider } from './../../providers/clinica/clinica';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map;

  constructor(public navCtrl: NavController,
    public clinicaProvider: ClinicaProvider,
    ) {

      this.clinicaProvider.listarFS().subscribe(_data =>{
        console.log('clinicas', _data)

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

}
