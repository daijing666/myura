import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { UraBirthdayComponent } from './ura-birthday/ura-birthday.component';
import { UraHomeConstellationComponent } from './ura-home-constellation/ura-home-constellation.component';
import { UraHomeMainComponent } from './ura-home-main/ura-home-main.component';
import { UraHomeTaroComponent } from './ura-home-taro/ura-home-taro.component';
import { UraHomeComponent } from './ura-home/ura-home.component';
import { UraOtherComponent } from './ura-other/ura-other.component';
import { UraConfirmComponent } from './ura-confirm/ura-confirm.component';
const routes = [
  { path: '', component: IndexComponent },
  { path: 'ura-birthday', component: UraBirthdayComponent },
  { path: 'ura-other', component: UraOtherComponent },
  { path: 'ura-confirm', component: UraConfirmComponent },
  { path: 'ura-home', component: UraHomeComponent },
  { path: 'ura-main', component: UraHomeMainComponent },
  { path: 'ura-taro', component: UraHomeTaroComponent },
  { path: 'constellation', component: UraHomeConstellationComponent }
  ,
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UraBirthdayComponent,
    UraOtherComponent,
    UraConfirmComponent,
    UraHomeComponent,
    UraHomeMainComponent,
    UraHomeTaroComponent,
    UraHomeConstellationComponent

  ],
  imports: [BrowserModule, IonicModule.forRoot(), RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
