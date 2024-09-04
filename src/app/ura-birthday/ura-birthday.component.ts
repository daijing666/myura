import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { stringify } from 'querystring';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ura-birthday',
  templateUrl: './ura-birthday.component.html',
  styleUrls: ['./ura-birthday.component.scss'],
})
export class UraBirthdayComponent implements OnInit {
  @ViewChild('myDatetime') myDatetime!: IonDatetime;
  public name = undefined;


  constructor(private globalService: GlobalService, private alertController: AlertController, private router: Router) { }

  ngOnInit() { }
  next() {
    console.log("next")
    console.log(this.myDatetime.value)
    if (typeof this.myDatetime.value === 'undefined'||typeof this.name === 'undefined') {
      this.globalService.presentAlert()
    } else {
      this.globalService.birthday = this.myDatetime.value as string;
      this.globalService.name = this.name;
      this.router.navigateByUrl('/ura-other')
    }
  }
}
