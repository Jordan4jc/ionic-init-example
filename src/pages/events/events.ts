import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  scanData: any = {};
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  startScanner(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scanData = barcodeData;
    }, (err) => {
        // An error occurred
    });
  }

}
