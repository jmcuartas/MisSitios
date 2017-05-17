import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Db } from '../providers/Db';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { MisTabs } from '../pages/mis-tabs/mis-tabs';
import { Inicio } from '../pages/inicio/inicio';
import { Listado } from '../pages/listado/listado';
import { Info } from '../pages/info/info';
import { ModalNuevoSitio } from '../pages/modal-nuevo-sitio/modal-nuevo-sitio';
import { ModalDetalleSitio } from '../pages/modal-detalle-sitio/modal-detalle-sitio';

@NgModule({
  declarations: [
    MyApp,
    MisTabs,
    Inicio,
    Listado,
    Info,
    ModalNuevoSitio,
    ModalDetalleSitio
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MisTabs,
    Inicio,
    Listado,
    Info,
    ModalNuevoSitio,
    ModalDetalleSitio
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Geolocation, Camera, Db, SQLite
  ]
})
export class AppModule {}
