import { Component, ViewChild, ElementRef } from '@angular/core';;
import { NavController, AlertController, ActionSheetController, App, Config } from 'ionic-angular';
import * as $ from 'jquery';
import { toPublicName } from '../../../node_modules/@angular/compiler/src/i18n/serializers/xmb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Tabs</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content></ion-content>
  `
})
export class HomePage {
  deneme123: any;

  SifreSayisal = false;// checkbox hide - show
  DesifreSayisal = false;// checkbox hide - show

  SifreButtonClickFonksiyon: any; // home.htmlde dönüştürme yapan buttonun click özelliğine veriliyor
  DesifreButtonClickFonksiyon: any


  SifrelencekMetin: any;
  SifrelencekMetinClearNumber = 0;
  DesifrelenmisMetin: any;

  DesifrelenecekMetin: any;
  DesifrelenecekMetinClearNumber = 0;
  DesifreAcikMetin: any;

  DesifrelenmisMetinPlaceHolder = " ";
  DesifreAcikMetinPlaceHolder = " ";

  BenzersizSifreleme: BenzersizMatris;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  }
  ionViewDidLoad() {
    this.buttonGizle(true, true, 0);
    this.buttonGizle(false, true, 0);
    this.BenzersizSifreleme = new BenzersizMatris();
    let nesnem = new MatrisKafaktor();
    nesnem.setMatris(this.BenzersizSifreleme.getAnahtar());
    nesnem.kofaktorMatrisİslem();
    this.BenzersizSifreleme.setTersAnahtar(MatrisTersleme.matrisTersle(nesnem.getKafaktorMatrs(), this.BenzersizSifreleme.getAnahtar()));
  }
  Sifrele() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sifrele',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tekil Olmayan Matris Sifrele',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("tekilMatrisSifrele", true);
            this.textareaPlaceHolder("3*3 matris için Anahtar girebilirsiniz (, ile ayırarak)", 1);
            this.temizleSonucTextarea(1);
            this.buttonGizle(true, false, 1300);
          }
        },
        {
          text: 'Cesar Şifreleme',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("cesarSifrele", true);
            this.textareaPlaceHolder(" ", 1);
            this.temizleSonucTextarea(1);
            this.buttonGizle(true, true, 1300);
          }
        },
        {
          text: 'Vigenere Şifreleme',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("vigenereSifrele", true);
            this.textareaPlaceHolder("Her Harf İçin Anahtar Harf Giriniz.", 1);
            this.temizleSonucTextarea(1);
            this.buttonGizle(true, true, 1300);
          }
        },
        {
          text: 'Polybius Şifreleme',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("polybiusSifrele", true);
            this.textareaPlaceHolder(" ", 1);
            this.temizleSonucTextarea(1);
            this.buttonGizle(true, true, 1300);
          }
        },
        {
          text: 'Columnar Şifreleme',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("columnarSifrele", true);
            this.textareaPlaceHolder(" ", 1);
            this.temizleSonucTextarea(1);
            this.buttonGizle(true, true, 1300);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  SifreCoz() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Desifrele',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tekil Olmayan Matris Sifre Çöz',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("tekilMatrisCoz", false);
            this.textareaPlaceHolder("3*3 matris için Anahtar girebilirsiniz (, ile ayırarak)", 0);
            this.temizleSonucTextarea(0);
            this.buttonGizle(false, false, 1300);
          }
        },
        {
          text: 'Cesar Şifrele Çöz',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("cesarSifreCoz", false);
            this.textareaPlaceHolder(" ", 0);
            this.temizleSonucTextarea(0);
            this.buttonGizle(false, true, 1300);
          }
        },
        {
          text: 'Vigenere Şifrele Çöz',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("vigenereSifreCoz", false);
            this.textareaPlaceHolder("Her Harf İçin Anahtar Harf Giriniz.", 0);
            this.temizleSonucTextarea(0);
            this.buttonGizle(false, true, 1300);
          }
        },
        {
          text: 'Polybius Şifrele Çöz',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("polybiusSifreCoz", false);
            this.textareaPlaceHolder(" ", 0);
            this.temizleSonucTextarea(0);
            this.buttonGizle(false, true, 1300);
          }
        },
        {
          text: 'Columnar Şifrele Çöz',
          icon: 'calculator',
          handler: () => {
            this.buttonClickFonksiyon("columnarSifreCoz", false);
            this.textareaPlaceHolder(" ", 0);
            this.temizleSonucTextarea(0);
            this.buttonGizle(false, true, 1300);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  clearNumberReset() // textarea'ya yazma işlemlerinde tıklamalar olursa text temizlenmesin diye clear number resetlenir.
  {
    this.SifrelencekMetinClearNumber = 0;
    this.DesifrelenecekMetinClearNumber = 0;
  }
  temizleTextarea(TextareaIndex) {
    if (TextareaIndex) {

      this.SifrelencekMetinClearNumber += 2; // 4 tıklamada silinicek metin
      if (this.SifrelencekMetinClearNumber == 4) {
        this.SifrelencekMetin = "";
        this.SifrelencekMetinClearNumber = 0;
      }
    }

    else {

      this.DesifrelenecekMetinClearNumber += 2
      if (this.DesifrelenecekMetinClearNumber == 4) {
        this.DesifrelenecekMetin = "";
        this.DesifrelenecekMetinClearNumber = 0;
      }
    }

  }
  temizleSonucTextarea(TextareaIndex) {
    if (TextareaIndex) this.DesifrelenmisMetin = "";
    else this.DesifreAcikMetin = "";
  }
  textareaPlaceHolder(holderString, secim) {
    if (secim)
      this.DesifrelenmisMetinPlaceHolder = holderString;
    else
      this.DesifreAcikMetinPlaceHolder = holderString;
  }
  buttonClickFonksiyon(fonksiyonAdi, secenek: boolean) {
    if (secenek)
      this.SifreButtonClickFonksiyon = fonksiyonAdi;
    else
      this.DesifreButtonClickFonksiyon = fonksiyonAdi;
  }
  buttonGizle(slideKontrol, Kontrol, sure) {
    if (slideKontrol) {
      if (Kontrol)
        $("#SifreAnahtarButton, #SifretToggle").fadeOut(sure);
      else
        $("#SifreAnahtarButton, #SifretToggle").slideDown(sure);
    }
    else {
      if (Kontrol)
        $("#DesifreAnahtarButton, #DesifreToggle").fadeOut(sure);
      else
        $("#DesifreAnahtarButton, #DesifreToggle").slideDown(sure);
    }


  }

  kontrol(metin)
  {
    if(!metin) this.alertOlustur("Metni Eksik Girdiniz");
    else this.DesifreAcikMetin = metin;
  }
  //////////////////
  tekilMatrisSifrele() {
    this.DesifrelenmisMetin = Kriptolama.Sifrele(this.BenzersizSifreleme.setSifreSayisal(this.SifreSayisal), this.SifrelencekMetin);
    // this.el.nativeElement.className = 'myCSSclass';
  }
  tekilMatrisCoz() {
    this.kontrol( Kriptolama.sifreCoz(this.BenzersizSifreleme.setSifreSayisal(this.DesifreSayisal), this.DesifrelenecekMetin) );
  }
  //////////////////////////////////////////////////////
  cesarSifrele() {

    this.DesifrelenmisMetin = Kriptolama.Sifrele(new Ceasar(), this.SifrelencekMetin);
  }
  cesarSifreCoz() {
    this.DesifreAcikMetin = Kriptolama.sifreCoz(new Ceasar(), this.DesifrelenecekMetin);
  }
  /////////////////////////////////////
  vigenereSifrele() {

    let metin = Kriptolama.Sifrele(new Vigenere().setAnahtar(this.DesifrelenmisMetin).setTurkceAnahtar(), this.SifrelencekMetin);

    if (metin == 1) {
      this.alertOlustur("Lütfen anahtar ve şifrelencek metni aynı uzunlukta giriniz");
    }
    else if (metin == 2) {
      this.alertOlustur("Anahtar ve Metindeki Büyük ve Kücük harfler eşit olmalıdır");
    }
    else
      this.DesifrelenmisMetin = metin;
  }
  vigenereSifreCoz() {
    this.DesifreAcikMetin = Kriptolama.sifreCoz(new Vigenere().setAnahtar(this.DesifreAcikMetin).setTurkceAnahtar(), this.DesifrelenecekMetin);
  }
  ///////////////////
  polybiusSifrele() {
    let metin = "abcdefgğhijklmnoprsştuvyz";

    this.DesifrelenmisMetin = Kriptolama.Sifrele(new Polybius().setAnahtar(metin).setHaricKarakterler(), this.SifrelencekMetin);
  }
  polybiusSifreCoz() {
    let anahtar = "abcdefgğhijklmnoprsştuvyz";
    this.kontrol( Kriptolama.sifreCoz(new Polybius().setAnahtar(anahtar).setHaricKarakterler(), this.DesifrelenecekMetin) );
  }
  /////////////////
  columnarSifrele() {
    this.DesifrelenmisMetin = Kriptolama.Sifrele(
      new Sutun().
        SifrelencekMetinSetSatırSutun(this.SifrelencekMetin).
        matriOlustur().
        SifrelencekMetinSetMatris(this.SifrelencekMetin),
      this.SifrelencekMetin
    );
  }

  columnarSifreCoz() {
    this.DesifreAcikMetin = Kriptolama.sifreCoz(
      new Sutun().
        DesifrelencekMetinSetSatırSutun(this.DesifrelenecekMetin).
        matriOlustur().
        DesifrelencekMetinSetMatris(this.DesifrelenecekMetin),
      this.DesifrelenecekMetin
    );
  }
  /////////////
  alertOlustur(alertMetin) {
    let alert = this.alertCtrl.create({
      title: 'HATA',
      subTitle: alertMetin,
      buttons: ['OK']
    });
    alert.present();
  }

  matrisGir(Durum) {
    let array;
    if (Durum)
      array = this.DesifrelenmisMetin.split(',');
    else
      array = this.DesifreAcikMetin.split(',');

    if (array.length == 9) {

      let matris = this.matrisDoldur(array);

      if (this.determinantKontrol(matris))
        this.anahtarSetle(matris);
      else {
        this.alertOlustur("Girmiş olduğunuz matrisin determinantı 1 veya -1 olmalıdır");
      }
    }
    else {
      this.alertOlustur("Lütfen 3x3lük matris giriniz");
    }
  }
  matrisDoldur(array) // textboxa girilen matrisi parcalayıp, parse ettikten sonra matris dizisine atama yapıyor.
  {
    let matris = [];
    let metinIndex = 0;

    for (let satir = 0; satir < 3; satir++) {
      matris.push([]);
      for (let sutun = 0; sutun < 3; sutun++) {

        matris[satir][sutun] = parseInt(array[metinIndex++]);
      }
    }
    return matris;
  }
  determinantKontrol(matris) // parametre olarak verilen matrisin determinant değerinin -1 veya 1 olmasının kontrol işlemi
  {
    let nesnem = new MatrisKafaktor();
    nesnem.setMatris(matris);
    nesnem.kofaktorMatrisİslem();
    let determinant = Determinant.determinantHesapla(nesnem.getKafaktorMatrs(), matris);
    if (determinant == -1 || determinant == 1) return true;
    else return false;


  }
  anahtarSetle(matris) { // BenzersizMatris sınıfının nesnesinin anahtarını setleme işlemi
    for (let satir = 0; satir < 3; satir++)
      for (let sutun = 0; sutun < 3; sutun++) {
        this.BenzersizSifreleme.setAnahtar(satir, sutun, matris[satir][sutun]);
      }
    let nesnem = new MatrisKafaktor();
    nesnem.setMatris(this.BenzersizSifreleme.getAnahtar());
    nesnem.kofaktorMatrisİslem();
    this.BenzersizSifreleme.setTersAnahtar(MatrisTersleme.matrisTersle(nesnem.getKafaktorMatrs(), this.BenzersizSifreleme.getAnahtar()));
  }
}
interface KriptoInterface {
  /**
   * name
   */
  sifrele(String);
  sifreCoz(String);


}
export class Kriptolama {

  public static Sifrele(nesnem: KriptoInterface, metin: String) {
    return nesnem.sifrele(metin);
  }
  public static sifreCoz(nesnem: KriptoInterface, metin: String) {
    return nesnem.sifreCoz(metin);
  }
}
export class Sutun implements KriptoInterface {
  private matris = [];
  private satırSutun = 0;

  SifrelencekMetinSetSatırSutun(metin: string) {
    let metinLength = metin.length;
    for (let satir = 1; satir < metinLength; satir++) {

      if ((metinLength / satir) < satir) {
        this.satırSutun = satir;
        break;
      }

    }
    return this;
  }

  DesifrelencekMetinSetSatırSutun(metin: string) {
    let metinLength = metin.length;
    for (let satir = 1; satir < metinLength; satir++) {

      if (Math.sqrt(metin.length) == satir) { // 5*5
        this.satırSutun = satir;
        break;
      }

    }
    return this;
  }

  private getSatırSutun() {
    return this.satırSutun;
  }

  SifrelencekMetinSetMatris(metin: string) {
    let MetinUzunlugu = metin.length;
    let metinIndex = 0;
    for (let satir = 0; satir < this.getSatırSutun(); satir++) {
      for (let sutun = 0; sutun < this.getSatırSutun(); sutun++) {
        if (metinIndex < MetinUzunlugu)
          this.setMatris(satir, sutun, metin[metinIndex++]);
        else
          this.setMatris(satir, sutun, " "); // metin uzunluğu gecidiği anda boşluklarla doldurma işlemi
      }

    }
    return this;
  }
  DesifrelencekMetinSetMatris(metin: string) {
    let metinIndex = 0;
    for (let satir = 0; satir < this.getSatırSutun(); satir++)
      for (let sutun = 0; sutun < this.getSatırSutun(); sutun++)
        this.setMatris(satir, sutun, metin[metinIndex++]);
    return this;
  }
  matriOlustur() {
    for (let satir = 0; satir < this.getSatırSutun(); satir++)
      this.getMatris().push([]);
    return this;
  }
  private setMatris(satir, sutun, value) {
    this.getMatris()[satir][sutun] = value;
  }
  private getMatris() {
    return this.matris;
  }

  private MetinDonusum() {
    let metin = "";
    for (let satir = 0; satir < this.getSatırSutun(); satir++)
      for (let sutun = 0; sutun < this.getSatırSutun(); sutun++)
        metin += this.getMatris()[sutun][satir];

    return metin;
  }

  sifrele(Metin: string) {
    return this.MetinDonusum();
  }
  sifreCoz(Metin: string) {
    return this.MetinDonusum();
  }
}
export class Polybius implements KriptoInterface {
  private HaricKarakterler = {};
  private Anahtar = [];
  private Tek;
  private Cift;

  setAnahtar(Metin: string) {
    let metinİndex = 0;
    for (let satir = 0; satir < 5; satir++) {
      this.getAnahtar().push([]);
      for (let sutun = 0; sutun < 5; sutun++) {
        this.getAnahtar()[satir][sutun] = Metin[metinİndex++];
      }
    }
    return this;
  }
  setHaricKarakterler() {
    this.getHaricKarakterler()['ç'] = "02"; // verilen bu numaralar anahtar matrisindeki ingilizce harflerin satır ve sutun numaraları. Örneğin ç için c, ı için i satır numarası.
    this.getHaricKarakterler()['ı'] = "14";
    this.getHaricKarakterler()['ö'] = "30";
    this.getHaricKarakterler()['ü'] = "41";
    this.getHaricKarakterler()['q'] = "22";
    this.getHaricKarakterler()['w'] = "53";
    return this;
  }
  getHaricKarakterler() {
    return this.HaricKarakterler;
  }
  private getTek() { return this.Tek; }
  private setTek(Value) { this.Tek = Value; }

  private getCift() { return this.Cift; }
  private setCift(Value) { this.Cift = Value; }

  private getAnahtar() { return this.Anahtar; }

  sifrele(SifrelencekMetin: string) {
    this.setTek(1);
    this.setCift(0);
    let metin = "";

    for (let satir = 0; satir < SifrelencekMetin.length; satir++) {
      if (SifrelencekMetin[satir].charCodeAt(0) >= 97 && SifrelencekMetin[satir].charCodeAt(0) <= 122) {
        metin += this.karakterIndisBul(SifrelencekMetin[satir]);  // Karakterin anahtar matrisinde Satır ve Sutun numaraları bulunup, eklemeler yapılıp metin değişkenine eklenir
      }
      else if (SifrelencekMetin[satir].charCodeAt(0) >= 65 && SifrelencekMetin[satir].charCodeAt(0) <= 90) // büyük harfler kücüklere dönüştürülüyor
      {
        let harf = String.fromCharCode(SifrelencekMetin[satir].charCodeAt(0) + 32); // kücük harf dönüşüm
        metin += this.karakterIndisBul(harf);

      }
      else if (SifrelencekMetin[satir].charCodeAt(0) >= 199 && SifrelencekMetin[satir].charCodeAt(0) <= 351) // türkçe karakterler
      {
        let harf = "";
        switch (SifrelencekMetin[satir]) {
          case "İ": harf = "i"; break;
          case "Ğ": harf = "ğ"; break;
          case "Ş": harf = "Ş"; break;
          case "Ü": harf = "ü"; break;
          case "Ö": harf = "ö"; break;
          case "Ç": harf = "ç"; break;
          case "W": harf = "q"; break;
          case "W": harf = "w"; break;
          default:
          harf = SifrelencekMetin[satir];
            break;
        }
        if (this.getHaricKarakterler()[harf]) { // harf değişkeninde bulunun karakter, HariciKarakterler dizisinde olup olmadığı kontrol ediliyor.
          let SatirSutun = this.getHaricKarakterler()[harf];
          metin += (parseInt(SatirSutun[0]) + 1).toString() + (parseInt(SatirSutun[1]) + this.tekKontrol()).toString();
        }
        else
          metin += this.karakterIndisBul(harf); // ğ harfi anahtarda var. Harici karakterlerden değil.
      }

    }
    return metin;
  }
  sifreCoz(CozulcekMetin: string) {
    if(CozulcekMetin.length % 2 !=0 ) return 0;
    this.setTek(1);
    this.setCift(0);
    let metin = "";
    let satir, sutun;
    for (let index = 1; index < CozulcekMetin.length; index = index + 2) {
      satir = parseInt(CozulcekMetin[index - 1]) - 1;
      sutun = parseInt(CozulcekMetin[index]) - this.tekKontrol();
      metin += this.getAnahtar()[satir][sutun];
    }
    return metin;
  }

  private karakterIndisBul(Karakter: string) {
    for (let satir = 0; satir < 5; satir++)
      for (let sutun = 0; sutun < 5; sutun++)
        if (this.getAnahtar()[satir][sutun] == Karakter) {
          let metin = (satir + 1).toString() + (sutun + this.tekKontrol()).toString();
          return metin;
        }
  }
  /*
  tek ve çift kontrol sırasıyla 1 3 5 0 2 4 değerlerini 

  */
  private tekKontrol() {
    if (this.getTek() > 5) {
      return this.ciftKontrol();
    }
    else {
      let a = this.getTek();
      this.setTek(a + 2);
      return a;
    }

  }
  private ciftKontrol() {
    if (this.getCift() > 4) {
      this.setCift(0);
      this.setTek(1);
      return this.tekKontrol();
    }
    else {
      let a = this.getCift();
      this.setCift(a + 2);
      return a;

    }
  }

}
export class Vigenere implements KriptoInterface {
  private Anahtar: string;
  private TurkceAnahtar = {};

  setAnahtar(Anahtar: string) {
    this.Anahtar = Anahtar;
    return this;
  }

  private getAnahtar() { return this.Anahtar; }

  setTurkceAnahtar() {
    let string = "şüöğıçŞÜİÖĞÇ";
    let stringUzunluk = string.length;
    for (let satir = 0; satir < (stringUzunluk / 2); satir++) {

      this.getTurkceAnahtar()[string[satir]] = string[stringUzunluk - (satir + 1)];
      this.getTurkceAnahtar()[string[stringUzunluk - (satir + 1)]] = string[satir];
    }
    return this;
  }
  private getTurkceAnahtar() { return this.TurkceAnahtar; }

  private sifrelencekKarakter(BasNokta, UcNokta, AnahtarHarf, MetinHarf) {

    /*
       if sorgusunda yapılmak istenen; Anahtarımızın harfi s olsun. s harfinden zye kadar aralık alınır. Bu aralık 7 ediyor.
       Metindeki harfimizin sayısının değeri (a için 0 yani direk s basıcak. b icin 1, buda sden sonra gelen harfe t'ye denk gelir) 7 değerinden kücük ise başa dönmesine gerek yoktur.  
       Başa dönmesinden kastımız s den zye yazıp, tekarar adan s'ye gelmesi gerekiyor vigenere şifrelemede.
 
       Eğer başa dönerse baştan kacıncı harfe denk geldiğini bulmak icin aralık değerinden metindeki harfe kadar olan aralık cıkartılır.
       Yani s değeri icin aralığımız 7 idi. Metinimizde j değeri var. Bu a harfinden itibaren 9 uzaklık yapar. 9 - 7 = 2. Bu sonuc baştan 2 uzaklık anlamına gelir ve b değeri yazılır. 
       */

    let asciKodBastanUzakligi = (MetinHarf - BasNokta);
    let anahtarAraligi = UcNokta - AnahtarHarf;

    if (anahtarAraligi >= asciKodBastanUzakligi) {
      return String.fromCharCode(AnahtarHarf + asciKodBastanUzakligi);
    }
    else if (anahtarAraligi < asciKodBastanUzakligi) {
      let harfNoktası = (MetinHarf - BasNokta) - (UcNokta - AnahtarHarf);
      return String.fromCharCode(harfNoktası + (BasNokta - 1)); // 96dan başlamasının nedeni yukardan 1 ve 1den büyük sayılar geliyor. 1 a demek.
    }

  }

  ozelKarakterBul(SifrelencekMetin)//metindeki noktalama vb işaretlerin sayısını bulur.
  {
    let sayi = 0;
    for (let satir = 0; satir < SifrelencekMetin.length; satir++) {
      if (SifrelencekMetin[satir].charCodeAt(0) >= 32 && SifrelencekMetin[satir].charCodeAt(0) <= 63)
        sayi++;
    }
    return sayi;
  }

  sifrele(SifrelencekMetin: any) {
    if ((SifrelencekMetin.length - this.ozelKarakterBul(SifrelencekMetin)) == this.getAnahtar().length) {
      let metin = "";
      for (let metinIndex = 0, anahtarIndex = 0; anahtarIndex < this.getAnahtar().length; anahtarIndex++ , metinIndex++) {
        let metinCharcode = SifrelencekMetin[metinIndex].charCodeAt(0);
        let anahtarCharCode = this.getAnahtar()[anahtarIndex].charCodeAt(0);

        if (
          (metinCharcode >= 65 && metinCharcode <= 90)
          &&
          (anahtarCharCode >= 65 && anahtarCharCode <= 90)
        ) { // anahtar eğer büyük metin kücük harf gelir ise, şifreleme olur ancak şifrelenen karakter alfabe dışı karakter olur. Bunu istemiyoruz

          metin += this.sifrelencekKarakter(65, 90, anahtarCharCode, metinCharcode);
        }
        else if (
          (metinCharcode >= 97 && metinCharcode <= 122)
          &&
          (anahtarCharCode >= 97 && anahtarCharCode <= 122)
        ) {

          metin += this.sifrelencekKarakter(97, 122, anahtarCharCode, metinCharcode);
        }
        else if (metinCharcode >= 32 && metinCharcode <= 63) {
          anahtarIndex--;
          metin += SifrelencekMetin[metinIndex];
        }
        else if (metinCharcode >= 199 && metinCharcode <= 351) // turkçe karakter aralığı

          metin += this.getTurkceAnahtar()[SifrelencekMetin[metinIndex]];

        else // girilen metin ve anahtarda kücük - büyük harf uyuşmazlığı var
          return 2;
      }
      return metin;
    }
    else
      return 1; // girilen metin ve anahtarın harf uzunlukları aynı değil
  }

  cozulecekKarakter(BasNokta, UcNokta, AnahtarHarf, MetinHarf) {

    if (AnahtarHarf <= MetinHarf) {
      let AsciiCode = MetinHarf - AnahtarHarf;
      return String.fromCharCode(AsciiCode + BasNokta);
    }
    else if (AnahtarHarf > MetinHarf) {
      let AnahtarAraligi = UcNokta - AnahtarHarf;
      let AsciKodBastanUzakligi = (MetinHarf - BasNokta);
      return String.fromCharCode(AnahtarAraligi + AsciKodBastanUzakligi + (BasNokta + 1));
    }
  }

  sifreCoz(CozulcekMetin: string) {

    if ((CozulcekMetin.length - this.ozelKarakterBul(CozulcekMetin)) == this.getAnahtar().length) {
      let metin = "";
      for (let metinIndex = 0, anahtarIndex = 0; anahtarIndex < this.getAnahtar().length; anahtarIndex++ , metinIndex++) {
        let anahtarCharCode = this.getAnahtar()[anahtarIndex].charCodeAt(0);
        let metinCharcode = CozulcekMetin[metinIndex].charCodeAt(0);

        if (
          (metinCharcode >= 65 && metinCharcode <= 90)
          &&
          (anahtarCharCode >= 65 && anahtarCharCode <= 90)
        ) {
          metin += this.cozulecekKarakter(65, 90, anahtarCharCode, metinCharcode);
        }

        else if (
          (metinCharcode >= 97 && metinCharcode <= 122)
          &&
          (anahtarCharCode >= 97 && anahtarCharCode <= 122)

        ) {
          metin += this.cozulecekKarakter(97, 122, anahtarCharCode, metinCharcode);
        }

        else if (metinCharcode >= 32 && metinCharcode <= 63) {
          anahtarIndex--;
          metin += CozulcekMetin[metinIndex];
        }
        else if (metinCharcode >= 199 && metinCharcode <= 351) // turkçe karakter aralığı
          metin += this.getTurkceAnahtar()[CozulcekMetin[metinIndex]];
        else
          return 2;
      }
      return metin;
    }

    else
      return 1;
  }
}
export class Ceasar implements KriptoInterface {
  // a e ile yer değiştircek, e de ı
  // türkçe karakter sorunu için bir işlem yapılmadı. Direk şifrelenecek metne yazılıyor.
  sifrele(SifrelencekMetin: string) {
    let metinHarf = {};
    metinHarf["a"] = "e";
    metinHarf["e"] = "ı";
    let metin = "";
    for (let satir = 0; satir < SifrelencekMetin.length; satir++) {
      if (SifrelencekMetin[satir] == "a" || SifrelencekMetin[satir] == "e")
        metin += metinHarf[SifrelencekMetin[satir]];
      else if (
        (SifrelencekMetin[satir].charCodeAt(0) >= 65 && SifrelencekMetin[satir].charCodeAt(0) <= 85)
        ||
        (SifrelencekMetin[satir].charCodeAt(0) >= 97 && SifrelencekMetin[satir].charCodeAt(0) <= 117)
      ) {
        let AsciiCode = 5 + SifrelencekMetin[satir].charCodeAt(0); // 5 harf öteleme
        metin += String.fromCharCode(AsciiCode);
      }
      else if (
        (SifrelencekMetin[satir].charCodeAt(0) >= 86 && SifrelencekMetin[satir].charCodeAt(0) <= 90)
        ||
        (SifrelencekMetin[satir].charCodeAt(0) >= 118 && SifrelencekMetin[satir].charCodeAt(0) <= 122)
      ) {
        let AsciiCode = (SifrelencekMetin[satir].charCodeAt(0) + 5) % 90;
        //örneğin 86 sayısı için 86+5 91 değeri verir. 91 % 90 = 1 değeri verir.
        metin += String.fromCharCode(AsciiCode + 64);

      }
      else
        metin += SifrelencekMetin[satir];
    }
    return metin;
  }
  sifreCoz(SifrelencekMetin: string) {
    let metinHarf = {};
    metinHarf["e"] = "a";
    metinHarf["ı"] = "e";
    let metin = "";
    for (let satir = 0; satir < SifrelencekMetin.length; satir++) {
      if (SifrelencekMetin[satir] == "e" || SifrelencekMetin[satir] == "ı")
        metin += metinHarf[SifrelencekMetin[satir]];
      else if (
        (SifrelencekMetin[satir].charCodeAt(0) >= 70 && SifrelencekMetin[satir].charCodeAt(0) <= 90)
        ||
        (SifrelencekMetin[satir].charCodeAt(0) >= 102 && SifrelencekMetin[satir].charCodeAt(0) <= 122)
      ) {
        let AsciiCode = SifrelencekMetin[satir].charCodeAt(0) - 5; // 5 harf öteleme
        metin += String.fromCharCode(AsciiCode);
      }
      else if (
        (SifrelencekMetin[satir].charCodeAt(0) >= 65 && SifrelencekMetin[satir].charCodeAt(0) <= 69)
        ||
        (SifrelencekMetin[satir].charCodeAt(0) >= 97 && SifrelencekMetin[satir].charCodeAt(0) <= 101)
      ) {
        let AsciiCode = (SifrelencekMetin[satir].charCodeAt(0) - 5) % 60;

        metin += String.fromCharCode(AsciiCode + 86);

      }
      else
        metin += SifrelencekMetin[satir];
    }
    return metin;
  }

}
export class BenzersizMatris implements KriptoInterface {
  private SifreSayisal = false;
  private HarfMatris = {}; // harflere denk gelen sayıları tutuyor
  private SayiMatris = {}; // sayılara denk gelen harfleri tutuyor. 

  private TersAnahtar = []; // Deşifrelemede kullanılcak anahtar
  private Anahtar = [];

  public constructor() {
    this.anahtarMatris();
    this.setHarfSayiMatris();
  }
  public getAnahtar() { return this.Anahtar; }
  public setAnahtar(Satir, Sutun, Value) { this.getAnahtar()[Satir][Sutun] = Value; }

  private getTersAnahtar() { return this.TersAnahtar; }
  public setTersAnahtar(Anahtar) { this.TersAnahtar = Anahtar; }

  private getHarfMatris() { return this.HarfMatris; }
  private getSayiMatris() { return this.SayiMatris; }

  public setSifreSayisal(Durum: boolean) { this.SifreSayisal = Durum; return this; }
  private getSifreSayisal() { return this.SifreSayisal; }

  private setHarfSayiMatris()// karakterler ve onlara denk gelen karakter sayılarını dolduruyor.
  {
    let sutun = 70;
    for (let satir = 97; satir <= 122; satir++ , sutun++) {
      let harf = String.fromCharCode(satir);
      let harf2 = String.fromCharCode(satir - 32);
      this.getHarfMatris()[harf] = sutun;
      this.getSayiMatris()[sutun] = harf;

      this.getHarfMatris()[harf2] = sutun + 100;
      this.getSayiMatris()[sutun + 100] = harf2;

    }
    let string = "şüöğıçŞÜİÖĞÇ?,!'.\";:"
    for (let satir = 0; satir < string.length; satir++ , sutun++) {
      this.getHarfMatris()[string[satir]] = sutun;
      this.getSayiMatris()[sutun] = string[satir];

    }
    this.getHarfMatris()[' '] = 0;
    this.getSayiMatris()[0] = ' ';

  }
  private anahtarMatris() // Anahatara varsayılan değerleri atar
  {

    this.getAnahtar().push([]);
    this.getAnahtar().push([]);
    this.getAnahtar().push([]);

    this.setAnahtar(0, 0, 3);
    this.setAnahtar(0, 1, 2);
    this.setAnahtar(0, 2, 2);

    this.setAnahtar(1, 0, 0);
    this.setAnahtar(1, 1, 1);
    this.setAnahtar(1, 2, 0);

    this.setAnahtar(2, 0, 1);
    this.setAnahtar(2, 1, 0);
    this.setAnahtar(2, 2, 1);
  }
  private sifrelencekMetinSayiMatrisi(SifrelencekMetin: string) // Şifrelencek metindeki harfleri, HarfMatris'de belirtilen sayılar ile değiştiriliyor
  {
    let matris = [];
    let MetinIndex = 0;

    for (let satir = 0; satir < 3; satir++) {
      matris.push([]);
      for (let sutun = 0; sutun < Math.ceil(SifrelencekMetin.length / 3); sutun++) {
        if (MetinIndex < SifrelencekMetin.length)
          matris[satir][sutun] = this.getHarfMatris()[SifrelencekMetin[MetinIndex++]]; //harflere göre sayılar geliyor
        else
          matris[satir][sutun] = this.getHarfMatris()[' '];//eğer metin uzunluğu aşılmış ise sonuna boşluk ekleniyor
      }
    }
    return matris;
  }
  public sifrele(SifrelencekMetin: string) {

    let sifrelencekMetinSayiMatrisi = this.sifrelencekMetinSayiMatrisi(SifrelencekMetin);
    console.log("şifrelemede metinlerin sayıya dönüştüğü matris");
    console.log(sifrelencekMetinSayiMatrisi);
    let sifreliMetin = "";
    let toplamSayi = 0; // çarpma işlemindeki sonucu tutacak

    for (let satir = 0; satir < 3; satir++)
      for (let sutun = 0; sutun < Math.ceil(SifrelencekMetin.length / 3); sutun++) {
        toplamSayi = 0;
        for (let index3 = 0; index3 < 3; index3++)
          toplamSayi += this.getAnahtar()[satir][index3] * sifrelencekMetinSayiMatrisi[index3][sutun];
        console.log("toplam sayilar " + toplamSayi);
        if (this.getSifreSayisal()) {
          if (toplamSayi == 0) {
            sifreliMetin += "000";
          }
          else {
            let sayiMetin = toplamSayi.toString();

            sifreliMetin += sayiMetin.length > 2 ? sayiMetin : (sayiMetin + ".");
          }

        }
        else {
          if (toplamSayi == 0) // 0 değeri SayiMatris'de boşluktur
            sifreliMetin += " ";
          else
            sifreliMetin += String.fromCharCode(toplamSayi);
        }
      }
    return sifreliMetin;
  }
  private integerArray(DefsifrelencekMetin: string) {
    // şifrelerken 0 kokuyoruz metne. bu sıfır boşluk değeri. Normal sayılardanda sıfır gelebilir.
    // 3er 3er gidiyoruz burdan sıfırı alırız. başlangıcı sıfır olursa bu değer boşluktur
    if(DefsifrelencekMetin.length % 9 != 0) return 0;
    let metinUzunlugu = (DefsifrelencekMetin.length) / 9;
    let integreAray = [];
    let metinIndex = 2;
    for (let satir = 0; satir < 3; satir++) {
      integreAray.push([]);
      for (let sutun = 0; sutun < metinUzunlugu; sutun++) {
        if (DefsifrelencekMetin[metinIndex - 2] == "0") // baş harf sıfır olamaz. Eğer olursa boşluk değeri
        {
          integreAray[satir][sutun] = 0;
        }
        else {
          let sayi = DefsifrelencekMetin[metinIndex - 2] + DefsifrelencekMetin[metinIndex - 1];// DefsifrelencekMetin[metinIndex];
          sayi += DefsifrelencekMetin[metinIndex] == "." ? "" : DefsifrelencekMetin[metinIndex];
          integreAray[satir][sutun] = parseInt(sayi);
        }
        metinIndex += 3;
      }
    }
    return integreAray;
  }
  private asciiArray(DesifrelencekMetin: string) {
    console.log("naberrrr444");

    /*
      3 3 3  a b c d ...
      3 3 3  x y z t ...
      3 3 3  q w e r ...
      
      Şeklindeki 3x3 matris carpılması icin Satır uzunlukları aynı 3xY matris gerekmektedir. 
      örneğin 3x4 lük bir matris satır sayısı 12dir. Gelen metin uzunluğu ise 10. Aşağıdaki for icersinde bu kontrol edilip, metin uzunluğunu gectiği anda
      matrise belirlenen değer atanmaya başlanır

    */
    let asciArray = []; // verilen string metnin ascıı karşılığını tutacak

    let metinIndex = 0;
    for (let satir = 0; satir < 3; satir++) {
      asciArray.push([]);
      for (let sutun = 0; sutun < Math.ceil(DesifrelencekMetin.length / 3); sutun++) {
        if (metinIndex < DesifrelencekMetin.length) {
          if (DesifrelencekMetin[metinIndex].charCodeAt(0) == 32) // boşluk değeri
            asciArray[satir][sutun] = 0;
          else
            asciArray[satir][sutun] = DesifrelencekMetin[metinIndex].charCodeAt(0);

          metinIndex++;
        }
        else
          asciArray[satir][sutun] = 0;
      }
    }
    console.log("ascii arrayyy");
    console.log(asciArray);
    return asciArray;
  }
  public sifreCoz(DesifrelencekMetin: string) {
    let desifreArray = this.getSifreSayisal() ? this.integerArray(DesifrelencekMetin) : this.asciiArray(DesifrelencekMetin);
    if(!desifreArray) return 0
    let toplamSayi = 0; // çarpma işlemindeki sonucu tutacak
    let sifreliMetin = "";

    for (let satir = 0; satir < 3; satir++)
      for (let sutun = 0; sutun < desifreArray[0].length; sutun++) {
        toplamSayi = 0
        for (let sutun2 = 0; sutun2 < 3; sutun2++) {

          toplamSayi += this.getTersAnahtar()[satir][sutun2] * desifreArray[sutun2][sutun];

        }
        console.log("şifre çözz toplam sayi" + toplamSayi);
        sifreliMetin += this.getSayiMatris()[toplamSayi];
      }

    return sifreliMetin;
  }
}
export class MatrisKafaktor {

  private KafaktorMatrs = [];

  public getKafaktorMatrs() { return this.KafaktorMatrs; }
  private setKafaktorMatrs(Satir, Sutun, value) { this.getKafaktorMatrs()[Satir][Sutun] = value; }

  public setMatris(Matris) // ters ve kofaktör matrisleri oluşturulur.
  {
    let determinant = 0;
    for (let satir = 0; satir < 3; satir++) {
      this.getKafaktorMatrs().push([]);
      for (let sutun = 0; sutun < 3; sutun++) {
        determinant = this.minorMatrisDeterminant(satir, sutun, Matris);
        this.setKafaktorMatrs(satir, sutun, determinant);
      }
    }
  }

  private minorMatrisDeterminant(Satir, Sutun, Matris) {

    let sagSolKontrol = true;
    let ciftKontrol = 0;
    let sag = 1;
    let sol = 1;
    /*
    a b
    c d  matrisinin determinantı alınırken a*d (sağ) - b*c (sol) dir. Burda b ve c arka arkaya gelmektedir.
    Yani gelme sırası a  bc  ve d olucaktır. Arka arkaya(ciftlik) gelme durumunu(bc)  'ciftKontrol' değişkeni kontrol eder.
    */
    for (let satir = 0; satir < 3; satir++) {
      for (let sutun = 0; sutun < 3; sutun++) {

        if (satir != Satir && sutun != Sutun) {
          if (sagSolKontrol) {
            sag *= Matris[satir][sutun];
            sagSolKontrol = false;
          }
          else {
            sol *= Matris[satir][sutun];
            ciftKontrol++;
            if (ciftKontrol >= 2)
              sagSolKontrol = true;
          }
        }

      }
    }
    return sag - sol;
  }

  private minorKofaktor() // kafaktor matrisinin işaretleri değiştirip transpozu alınıyor. Bu işlemden sonra dizimiz kafaktor halini alıyor
  {
    let i = -1;
    let minor = [];
    minor.push([]); // pushlama for icersinde yapılmadı. Nedeni, minor matris sutun olarak ekleme yapıyor
    minor.push([]);
    minor.push([]);
    for (let satir = 0; satir < 3; satir++) {
      for (let sutun = 0; sutun < 3; sutun++) {
        i *= -1;
        this.setKafaktorMatrs(satir, sutun, this.getKafaktorMatrs()[satir][sutun] * i); // işaret değişimi
        minor[sutun][satir] = this.getKafaktorMatrs()[satir][sutun];  // transpoz

      }
    }
    return minor;
  }

  public kofaktorMatrisİslem() {

    let minor = this.minorKofaktor();
    for (let satir = 0; satir < 3; satir++)
      for (let sutun = 0; sutun < 3; sutun++)
        this.setKafaktorMatrs(satir, sutun, minor[satir][sutun]);
  }

}
export class MatrisTersleme {

  public static matrisTersle(Kafaktor, Matris) {

    let tersMatris = [];
    let determinant = Determinant.determinantHesapla(Kafaktor, Matris);

    for (let satir = 0; satir < 3; satir++) {
      tersMatris.push([]);
      for (let sutun = 0; sutun < 3; sutun++)
        tersMatris[satir][sutun] = Kafaktor[satir][sutun] * determinant;
    }


    return tersMatris;
  }
}
export class Determinant {

  public static determinantHesapla(Kafaktor, Matris) {
    let determinant = 0;
    for (let satir = 0; satir < 3; satir++)
      determinant += Kafaktor[satir][0] * Matris[0][satir];

    return determinant;
  }
}