import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/public/authentication/authentication.service';
import { Storage } from '@ionic/storage';
import { hashCode } from 'src/app/models/hashCode';
import { constants} from '../../../utils/constants'
import { login } from 'src/app/models/login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  hashcode: hashCode = {} as hashCode;
  login: login = {} as login;
  constructor(private authService: AuthenticationService, private storage: Storage) { 
    this.getInformation(); 
  }

  ngOnInit() {
  }

  getInformation(){
    this.storage.get(constants.HASH_CODE).then(res=>{
      this.login.hashCode = res;
      this.storage.get(constants.CITIZEN_ID).then(res=>{
        this.login.citizenId = res;
      })
    })
  }

  logout(){
    this.authService.logout();
  }

}
