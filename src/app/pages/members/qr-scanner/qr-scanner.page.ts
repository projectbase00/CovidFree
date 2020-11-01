import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  scanActive=false;
  scanResult='asd';
  videoElement:any;
  canvasElement:any;
  canvasContext:any;

  loading: HTMLIonLoadingElement;

  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  constructor(private loadingCtrl: LoadingController) { }

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
  }

  reset(){

  }

  async scanCode(){
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'}
      });
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute('playsinline', true);
      this.videoElement.play();

      this.loading = await this.loadingCtrl.create({});
      await this.loading.present();
      requestAnimationFrame(this.scan.bind(this));
  }

  async scan(){
    console.log('scan');
      if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
        if(this.loading){
          await this.loading.dismiss();
          this.loading = null;
          this.scanActive = true;
        }

        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;

        this.canvasContext.drawImage(
          this.videoElement,
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );

        const imageData = this.canvasContext.getImageData(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        console.log(code);

        if(code){
            this.scanActive = false;
            this.scanResult = code.data;
        } else {
          if(this.scanActive)
            requestAnimationFrame(this.scan.bind(this));
        }
      } else {
        requestAnimationFrame(this.scan.bind(this));
      }
  }

  stopScan(){
      this.scanActive = false;
  }

}
