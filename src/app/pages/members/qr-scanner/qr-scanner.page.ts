import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage{
  isPositive = false;
  scannedData: any;
  constructor(private barcodeScanner: BarcodeScanner, public toastController: ToastController) {
    this.scanBarcode()
   }

  async presentToast(m: string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      disableAnimations: true,
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: false,
      torchOn: false,
      prompt: '',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedData = barcodeData;

      let num: number = Math.floor(Math.random() * 11);
      if  (num % 2 == 0)
        this.isPositive = true;
      else
        this.isPositive = false;

    }).catch(err => {
      this.presentToast(err)
    });
  }
}
