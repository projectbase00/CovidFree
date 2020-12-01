export class constants{
    public static readonly TOKEN_KEY = 'auth-token';
    public static readonly CITIZEN_ID = 'citizen-id';
    public static readonly PHONE_NUMBER = 'phone-number';
    public static readonly HASH_CODE = 'hash-code';

    public static readonly API_SERVER = 'http://192.168.1.14:8080/api/';
    public static readonly LOGIN = 'mobile-users/getphonenumberbyid/';
    public static readonly REGISTER = '/mobile-users/register';
    public static readonly SMS_CODE = '/mobile-users/getmessagecodebycitizen';
    public static readonly HASHCODE = '/mobile-users/gethashcodebycitizen';

    public static readonly UI_SMSVERIFICATION_VISIBLE_NUMBER_COUNT = 3;
}