import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/public/authentication/authentication.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  path: string = 'http://192.168.1.14:8080/api/mobile-users/getphonenumberbyid/'
  _login: login = {} as login;

  //TODO: Update for multilang properties
  params = {
    name: "Hizir Cagin Bektas"
  };

  postData = {
    citizenId: ''
  };

  constructor(private authService: AuthenticationService, private http: HttpClient, private storage: Storage) {}

  ngOnInit() {
  }

  login(postData: any){
    this.getPhoneNumber(this.postData.citizenId);
  }

  
  getPhoneNumber(citizenId: any) {
    this._login.citizenId = 1;
    this._login.phoneNumber = "300300300300";

    this.authService.login(this._login);
    /*
    this.http.get<login>(this.path + citizenId).toPromise().then(data => {
      console.log(data);
      this._login.citizenId = data.citizenId;
      this._login.phoneNumber = data.phoneNumber;

      this.authService.login(this._login);
    });
    */
  }
}
