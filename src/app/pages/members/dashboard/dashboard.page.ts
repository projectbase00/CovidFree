import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/public/authentication/authentication.service';
import { Storage } from '@ionic/storage';
import { hashCode } from 'src/app/models/hashCode';
import { constants} from '../../../utils/constants'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  hashcode: hashCode = {} as hashCode;

  constructor(private authService: AuthenticationService, private storage: Storage) { 
    this.getHashCode(); 
  }

  ngOnInit() {
  }

  getHashCode(){
    this.storage.get(constants.CITIZEN_ID).then(res=>{
      this.hashcode.hash = res;
      console.log(res);
    })
  }

  logout(){
    this.authService.logout();
  }

}
