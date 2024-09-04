import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ura-home-constellation',
  templateUrl: './ura-home-constellation.component.html',
  styleUrls: ['./ura-home-constellation.component.scss'],
})
export class UraHomeConstellationComponent implements OnInit {
  public constellation= "undefined";
  public mytext:string = "undefined";
  constructor(private apiService: ApiService) { 
   
  }
  
  ngOnInit() { }

  Mytest() {
    this.apiService.generateText('加入你是一个占卜师，告诉我狮子座今天的运势怎么样，写一份中文并且把翻译成日语').then((result: string) => {
      // 在这里处理结果
     this.constellation=result
    }).catch((error: any) => {
      // 在这里处理错误
      console.error(error);
    });
  }
}
