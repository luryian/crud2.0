import { MyApp } from './app.component';
import { ListPage } from '../pages/pacinte/list';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { initializeApp } from "firebase/app";

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/Database';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PacientesProvider } from '../providers/pacientes/pacientes';
import { MedicoProvider } from '../providers/medico/medico';
import { ClinicaProvider } from '../providers/clinica/clinica';
import { firebaseConfig } from '../env/env';
import { FirebaseStorageProvider } from '../providers/firebase-storage/firebase-storage';
import { AngularFireStorageModule } from 'angularfire2/storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    PacientesProvider,
    MedicoProvider,
    ClinicaProvider,
    FirebaseStorageProvider,

  ]
})
export class AppModule {}
