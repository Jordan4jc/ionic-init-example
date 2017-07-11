import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  scanData: any = {};
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, storage: Storage) {
    storage.ready().then(()=>{
      storage.get('events').then((events)=>{
        // if(events){
        //   console.log(events);
        // }else{
        //   console.log('load events');
        // }
      }).catch(console.log);
    });
  }

  ngOnInit() {
    console.log('init');
  }

  startScanner(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scanData = barcodeData;
    }, (err) => {
        // An error occurred
    });
  }

}
