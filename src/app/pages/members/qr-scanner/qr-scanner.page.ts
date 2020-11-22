import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage{

  
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  constructor(private barcodeScanner: BarcodeScanner, public toastController: ToastController) { }

  async presentToast(m: string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

    }).catch(err => {
      this.presentToast(err)
    });
  }

 
}
