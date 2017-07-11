import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      storage.ready().then(()=>{
        // pretend we loaded a JWT and verified it
        this.rootPage = 'EventsPage';
      });
      splashScreen.hide();
    });
  }
}

