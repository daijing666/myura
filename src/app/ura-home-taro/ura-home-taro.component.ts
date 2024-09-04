import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { IonicModule } from '@ionic/angular'; // 导入 IonicModule
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-ura-home-taro',
  templateUrl: './ura-home-taro.component.html',
  styleUrls: ['./ura-home-taro.component.scss'],
})
export class UraHomeTaroComponent implements OnInit {
  public myOnlyQA= "";
  public myOnlyResult= "";

  timerId: any;
  loading: any;

  
  constructor(private alertController: AlertController,private loadingCtrl: LoadingController,private apiService: ApiService,private globalService: GlobalService) { 
    
    this.myOnlyQA='请称呼我为'+this.globalService.name+this.globalService.sex+',假如你是占卜师,请从属相,星座,塔罗牌,八字这四个角度帮我占卜一下,我的属相是'+this.globalService.zodiac+',星座是'+this.globalService.constellation+',我的塔罗牌是'+this.globalService.card+',我的八字是'+this.globalService.eightCharacters+'。我只要'+this.globalService.language+'的翻译版本';
  }

  ngOnInit() { }

  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: '神様と通信中...(約30秒)',
    });
    this.loading.present();
    this.Mytest();
  }

 

  startTimer() {
    this.timerId = setTimeout(() => {
      this.showLoading();
    }, 300);
  }

  stopTimer() {
    clearTimeout(this.timerId);
  }

   Mytest() {
    this.apiService.generateText(this.myOnlyQA).then((result: string) => {
      // 在这里处理结果
     this.myOnlyResult=result;
     if(this.myOnlyResult!=""){
      this.loading?.dismiss();
     }
    }).catch((error: any) => {
      // 在这里处理错误
      console.error(error);
      this.loading?.dismiss();
      this.presentAlert();
      
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '残念!',
      subHeader: 'すみません',
      message: '神様は留守です',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
