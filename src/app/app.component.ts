import { UserProvider } from './../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/pacinte/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'InicioPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public userProvider: UserProvider
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages =[
      { title: 'Home', component: HomePage },
      { title: 'Pacientes', component: ListPage },
      { title: 'Medicos', component: 'MedicoPage' },
      { title: 'Clinicas', component: 'ClinicaPage' },
      { title: 'Sobre', component: 'SobrePage' },
      { title: 'Configurações', component: 'ConfigPage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        this.userProvider.lerLocal().then(_usuario => {
          console.log('AP COMPONENT', _usuario);

          if(_usuario && _usuario.length > 0) {
          // if(_usuario && _usuario.email > 0) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = 'InicioPage';
          }
        })
      });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
