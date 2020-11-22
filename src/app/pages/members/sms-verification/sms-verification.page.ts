import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/models/login';
import { Storage } from '@ionic/storage';
import { constants} from '../../../utils/constants'
import { HttpClient } from '@angular/common/http';
import { smsCode } from 'src/app/models/smsCode';
import { hashCode } from 'src/app/models/hashCode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.page.html',
  styleUrls: ['./sms-verification.page.scss'],
})
export class SmsVerificationPage implements OnInit {
  smsPath: string = 'http://192.168.1.13:8080/api/mobile-users/getmessagecodebycitizen'
  hashPath: string = 'http://192.168.1.13:8080/api/mobile-users/gethashcodebycitizen'

  _login: login = {} as login;

  constructor(private storage: Storage, private http: HttpClient, private router: Router) { 
    this.getInformationfromStorage(); 
  }

  postData = {
    phoneNumber: '',
    smsCode: ''
  };

  getInformationfromStorage(){
    this.storage.get(constants.PHONE_NUMBER).then(res=>{
      this._login.phoneNumber = res;
      this.postData.phoneNumber = this.formatPhoneNumber(res);
      this.storage.get(constants.CITIZEN_ID).then(res=>{
        this._login.citizenId = res;
      })
    })
  }

  formatPhoneNumber(phoneNumber: string): string{
    let lastIndex: number = phoneNumber.length;
    let visibleIndex = constants.UI_SMSVERIFICATION_VISIBLE_NUMBER_COUNT;
    let privateLastIndex = lastIndex - visibleIndex - visibleIndex;

    //formatting can be improved, no logic is: first 3 char and last 3 char visible only
    let firstVisiblePart = phoneNumber.substr(0, visibleIndex);
    let privatePart = "x".repeat(privateLastIndex);
    let lastVisiblePart = phoneNumber.substr(privateLastIndex + visibleIndex, lastIndex);

    return firstVisiblePart + privatePart + lastVisiblePart;
  }

  ngOnInit() {
  }

  getCode(){
    this._login.smsCode = "1234";
    /*
    const body = { "citizenId": this._login.citizenId, "phoneNumber": this._login.phoneNumber };
    this.http.post<smsCode>(this.smsPath, body).toPromise().then(data => {
      this._login.smsCode = data.code;
    });
    */
  }

  loginAndGetHash(){
    this.storage.set(constants.HASH_CODE, "1");
    this.router.navigate(['members', 'dashboard']);

    const body = { "citizenId": this._login.citizenId, "phoneNumber": this._login.phoneNumber, "code": this._login.smsCode };
    this.http.post<hashCode>(this.hashPath, body).toPromise().then(data => {
        this.storage.set(constants.HASH_CODE, data.hash);
        this.router.navigate(['members', 'dashboard']);
    });
  }
}
