import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmsVerificationPage } from './sms-verification.page';

describe('SmsVerificationPage', () => {
  let component: SmsVerificationPage;
  let fixture: ComponentFixture<SmsVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmsVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
