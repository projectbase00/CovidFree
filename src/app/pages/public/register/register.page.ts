import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  croppedImagepath = "";
  imageData = "";
  isLoadingPick = false;
  isLoadingRegister = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  
  constructor(
    private camera: Camera,
    private http: HttpClient,
    public actionSheetController: ActionSheetController,
    private file: File
  ) { 
  }

  ngOnInit() {
  }
  path: string = 'http://192.168.1.13:8080/api/mobile-users/register'
  register(){
    this.isLoadingRegister = true;
      const body = { "citizenId": 1234333, 
          "phoneNumber": "123456",
          "base64Image": this.imageData
      };
      this.http.post<string>(this.path, body).toPromise().then(data => {
        console.log(data)
        this.croppedImagepath = "";
        this.isLoadingRegister = false;
      }, (err) =>  {
      console.log(err);
      });
  }

  pickImage(sourceType) {
    this.isLoadingPick = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.croppedImagepath = "data:image/png;base64," +  imageData;
      this.isLoadingPick = false;

      console.log("done")
      }, (err) => {
        console.log(err)
      });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
}
