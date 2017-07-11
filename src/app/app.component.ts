import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {JwtHelper} from "angular2-jwt";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      storage.ready().then(()=>{
        storage.get('token').then((token)=>{
          if(!this.jwtHelper.isTokenExpired(token)){
            storage.get('profile').then((profile)=>{
              if(profile){
                console.log('go to events page');
                this.rootPage = 'EventsPage';
              }else{
                this.rootPage = 'LoginPage';
              }
            }).catch(console.log);
          }else{
            storage.remove('profile');
            storage.remove('token');
            this.rootPage = 'LoginPage';
          }
        }).catch(()=>{
          this.rootPage = 'LoginPage';
        });
      });
      splashScreen.hide();
    });
  }
}

