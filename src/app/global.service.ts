import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public birthday!: string;
  public sex = undefined;
  public positionSN = undefined;
  public positionEW = undefined;
  public card = undefined;
  public name = undefined;
  public language = undefined;
  public constellation!: string;
  public zodiac!: string;
  public eightCharacters!: string;
  public japaneseEra!: string;

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '警告！',
      message: '情報を補完してください',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
