import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = "SELECTED_LANGUAGE";

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  selected = '';
  defaultLanguage = 'tr';
  constructor(private translate: TranslateService, private storage: Storage) { }

  setInitialAppLanguage(){
    //this.defaultLanguage = something something to get default language of the device.
    this.translate.setDefaultLang(this.defaultLanguage);

    this.storage.get(LNG_KEY).then(val => {
        if(val){
          this.setLanguage(val);
          this.selected = val;
        }
    })
  }
  getLanguages(){
    return [
      {text: 'English', value: 'en'},
      {text: 'Turkish', value: 'tr'}
    ]
  }
  setLanguage(lng){
      this.translate.use('tr');
      this.selected = lng;
      this.storage.set(LNG_KEY, lng)
  }
}
