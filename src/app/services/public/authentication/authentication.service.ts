import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { constants } from '../../../utils/constants';


const TOKEN_KEY = 'auth-token';
const CITIZEN_ID = 'citizen-id';
const PHONE_NUMBERr = 'phone-number';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authentocationState = new BehaviorSubject(false);
  
  constructor(private storage: Storage, private plt: Platform, private router: Router) { 
      this.plt.ready().then(()=> {
          this.checkToken();
      });

  }

  login(loginInfo: login){
    //this.storage.set(TOKEN_KEY, 'TOKEN KEY WILL PLACE HERE').then(res => {
     // this.authentocationState.next(true);
    //});
     this.storage.set(constants.TOKEN_KEY, 'TOKEN KEY WILL PLACE HERE');
     this.storage.set(constants.CITIZEN_ID, loginInfo.citizenId);
     this.storage.set(constants.PHONE_NUMBER, loginInfo.phoneNumber);
     this.router.navigate(['members', 'qr-scanner']);
  }
  logout(){
          return this.storage.remove(TOKEN_KEY).then(res => {
        this.authentocationState.next(false);
      });
  }
  isAuthenticated(){
      return this.authentocationState.value;
  }
  checkToken(){
      return this.storage.get(TOKEN_KEY).then(res => {
        if(res){
          //TODO: Check some token validty.
          this.authentocationState.next(true);
        }
      }); 
  }
}
