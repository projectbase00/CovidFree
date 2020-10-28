import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/public/authentication/authentication.service';
import { Router } from '@angular/router';
import { LanguageService } from './services/public/helpers/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private languageService: LanguageService 
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authentocationState.subscribe(state => {
        console.log('Auth State: ', state); //TODO: Remove this.
          if (state){
            this.router.navigate(['members', 'dashboard']);
          } else {
            this.router.navigate(['login']);
          }
      });
      this.languageService.setInitialAppLanguage();
    });
  }
}
