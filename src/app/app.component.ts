import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  // @ViewChild('myAd3',{static:true})
  // public myslide!:IonSlides
  @ViewChild('myScroll',{static:true})
  public myInfinite!:IonInfiniteScroll
  public list=[7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875,7875]
  ngOnInit(){
    // console.log("中国人")
    // console.log(this.myslide)
    // console.log("美国人")
    // this.myslide.startAutoplay()
  }
  constructor(private alertcontroller:AlertController) {}
  doQuit(){
    this.alertcontroller.create({
      header:'确认退出',
      message:'您确认吗？',
      buttons:['确认','取消']
    }).then((myAlert)=>{
      myAlert.present()
    })
  }
  doClick(){
    console.log("myClick");
  }

  loadMore(){
    console.log("正在加载更多")
    setTimeout(()=>{
      for(let i=0;i<10;i++){
        let n=Math.floor( Math.random()*9000+1000)
        this.list.push(n)
        this.myInfinite.complete()
      } 
    },3000)
  }

  myopt={
    initialSlide:2,
    speed:10
  }
  
}
