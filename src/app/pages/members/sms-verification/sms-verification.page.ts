import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/models/login';
import { Storage } from '@ionic/storage';
import { constants} from '../../../utils/constants'

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.page.html',
  styleUrls: ['./sms-verification.page.scss'],
})
export class SmsVerificationPage implements OnInit {
  _login: login = {} as login;

  constructor(private storage: Storage) { 
    this.getInformationfromStorage(); 
  }

  postData = {
    phoneNumber: ''
  };

  getInformationfromStorage(){
    this.storage.get(constants.PHONE_NUMBER).then(res=>{
      this._login.phoneNumber = res;
      this.postData.phoneNumber = this.formatPhoneNumber(res);
      this.storage.get(constants.CITIZEN_ID).then(res=>{
        this._login.citizenId = res;
        console.log(JSON.stringify(this._login));
      })
    })
  }

  formatPhoneNumber(phoneNumber: string): string{
    let lastIndex: number = phoneNumber.length;
    let privateLastIndex = lastIndex - constants.UI_SMSVERIFICATION_VISIBLE_NUMBER_COUNT;
    let privatePart = "x".repeat(privateLastIndex);
    let visiblePart = phoneNumber.substr(privateLastIndex, lastIndex);
    return privatePart + visiblePart;
  }

  ngOnInit() {
  }

}
