import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authentocationState = new BehaviorSubject(false);
  
  constructor(private storage: Storage, private plt: Platform) { 
      this.plt.ready().then(()=> {
          this.checkToken();
      });

  }


  login(){
      return this.storage.set(TOKEN_KEY, 'TOKEN KEY WILL PLACE HERE').then(res => {
        this.authentocationState.next(true);
      });
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
