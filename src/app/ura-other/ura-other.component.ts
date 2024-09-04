import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-ura-other',
  templateUrl: './ura-other.component.html',
  styleUrls: ['./ura-other.component.scss'],
})
export class UraOtherComponent implements OnInit {

  sex = undefined;
  positionSN = undefined;
  positionEW = undefined;
  card = undefined;
  language = undefined;
  constructor(private globalService: GlobalService, private router: Router) { }

  ngOnInit() {

  }

  next() {

    console.log("next2")
    console.log(this.globalService.birthday)
    console.log(this.sex)
    if (typeof this.sex === 'undefined' || typeof this.positionSN === 'undefined' || typeof this.positionEW === 'undefined' || typeof this.card === 'undefined' || typeof this.language === 'undefined') {
      console.log("warn")
      this.globalService.presentAlert()
    } else {
      this.globalService.sex = this.sex;
      this.globalService.positionSN = this.positionSN;
      this.globalService.positionEW = this.positionEW;
      this.globalService.card = this.card;
      this.globalService.language = this.language;
      this.router.navigateByUrl('/ura-main')
    }

  }
  handleSex(ev: any) {
    this.sex = ev.target.value;
    console.log(this.sex)
  }
  handleAnimal(ev: any) {
    this.card = ev.target.value;
  }
  handlePositionSN(ev: any) {
    this.positionSN = ev.target.value;
  }
  handlePositionEW(ev: any) {
    this.positionEW = ev.target.value;
  }
  handleLanguage(ev: any) {
    this.language = ev.target.value;
  }

}
