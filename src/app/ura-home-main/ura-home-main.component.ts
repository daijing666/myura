import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-ura-home-main',
  templateUrl: './ura-home-main.component.html',
  styleUrls: ['./ura-home-main.component.scss'],
})
export class UraHomeMainComponent implements OnInit {

  public birthday!: string;
  public sex = undefined;
  public positionSN = undefined;
  public positionEW = undefined;
  public card = undefined;
  public name = undefined;

  public constellation!: string;
  public zodiac!: string;
  public eightCharacters!: string;
  public japaneseEra!: string;
  public area!: string;

  constructor(private globalService: GlobalService, private router: Router) {
    this.name = this.globalService.name
    this.sex = this.globalService.sex
    this.positionSN = this.globalService.positionSN
    this.positionEW = this.globalService.positionEW
    this.card = this.globalService.card
    this.birthday = this.globalService.birthday
    this.area = this.getDirection(this.globalService.positionSN, this.globalService.positionEW);

    const date = new Date(this.extractDateFromISO8601String(this.birthday));
    this.constellation = this.getConstellation(date);
    this.globalService.constellation = this.constellation

    const year = this.extractYearFromISO8601String(this.birthday);
    this.zodiac = this.getChineseZodiac(year);
    this.globalService.zodiac = this.zodiac


    this.eightCharacters = this.getBaziFromISO8601String(this.birthday);
    this.globalService.eightCharacters = this.eightCharacters

    this.japaneseEra = this.getJapaneseEraFromISO8601String(this.birthday);

  }

  getDirection(sn: string | undefined, ew: string | undefined): string {
    const n = sn ?? "";
    const s = ew ?? "";
    return n + s + '方位';
  }

  ngOnInit() { }

  extractDateFromISO8601String(dateString: string): string {
    const match = dateString.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
      return match[1];
    }
    throw new Error('Invalid date string');
  }

  extractYearFromISO8601String(dateString: string): number {
    const match = dateString.match(/^(\d{4})/);
    if (match) {
      return parseInt(match[1], 10);
    }
    throw new Error('Invalid date string');
  }

  getChineseZodiac(year: number): string {
    const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    return zodiacs[(year - 4) % 12];
  }

  getBaziFromISO8601String(dateString: string): string {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(5, 7), 10);
    const day = parseInt(dateString.substring(8, 10), 10);
    const hour = parseInt(dateString.substring(11, 13), 10);
    const offset = parseInt(dateString.substring(19, 22), 10);
    console.log(year + "!!!" + month + "!!!" + day + "!!!" + hour + "!!!" + offset)
    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dayInYear = daysInMonth.slice(0, month - 1).reduce((sum, days) => sum + days, day);

    const baziEarthlyBranch = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const baziHeavenlyStem = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

    const yearIndex = (year - 4) % 60;
    const yearEarthlyBranch = baziEarthlyBranch[yearIndex % 12];
    const yearHeavenlyStem = baziHeavenlyStem[yearIndex % 10];

    const monthHeavenlyStem = baziHeavenlyStem[(yearIndex % 5 * 12 + month - 2) % 10];
    const monthEarthlyBranch = baziEarthlyBranch[(month - 1 + 2) % 12];

    const dayHeavenlyStem = baziHeavenlyStem[(dayInYear + hour - 1) % 10];
    const dayEarthlyBranch = baziEarthlyBranch[(dayInYear + hour - 1) % 12];

    const offsetHeavenlyStem = baziHeavenlyStem[Math.floor(offset / 2) % 10];

    const offsetEarthlyBranch = baziEarthlyBranch[offset % 12];

    return yearHeavenlyStem + yearEarthlyBranch + monthHeavenlyStem + monthEarthlyBranch + dayHeavenlyStem + dayEarthlyBranch + offsetHeavenlyStem + offsetEarthlyBranch;
  }

  getJapaneseEraFromISO8601String(dateString: string): string {
    const year = parseInt(dateString.substring(0, 4), 10);
    const eraList = [
      { name: '令和', startYear: 2019, offset: 1 },
      { name: '平成', startYear: 1989, offset: 0 },
      { name: '昭和', startYear: 1926, offset: 25 },
      { name: '大正', startYear: 1912, offset: 10 },
      { name: '明治', startYear: 1868, offset: 45 }
    ];

    let japaneseEra = '';
    for (const era of eraList) {
      if (year >= era.startYear) {
        const eraYear = year - era.startYear + era.offset;
        japaneseEra = `${era.name}${eraYear}年`;
        break;
      }
    }
    return japaneseEra;
  }
  getConstellation(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    switch (month) {
      case 1:
        return day <= 19 ? '摩羯座（やぎ座）' : '水瓶座（みずがめ座 ）';
      case 2:
        return day <= 18 ? '水瓶座（みずがめ座）' : '双鱼座（うお座 ）';
      case 3:
        return day <= 20 ? '双鱼座（うお座）' : '白羊座（おひつじ座）';
      case 4:
        return day <= 19 ? '白羊座（おひつじ座）' : '金牛座（おうし座）';
      case 5:
        return day <= 20 ? '金牛座（おうし座）' : '双子座（ふたご座）';
      case 6:
        return day <= 21 ? '双子座（ふたご座）' : '巨蟹座（かに座）';
      case 7:
        return day <= 22 ? '巨蟹座（かに座）' : '狮子座（しし座）';
      case 8:
        return day <= 22 ? '狮子座（しし座）' : '处女座（おとめ座）';
      case 9:
        return day <= 22 ? '处女座（おとめ座）' : '天秤座（てんびん座）';
      case 10:
        return day <= 23 ? '天秤座（てんびん座）' : '天蝎座（さそり座）';
      case 11:
        return day <= 22 ? '天蝎座（さそり座）' : '射手座（いて座）';
      case 12:
        return day <= 21 ? '射手座（いて座）' : '摩羯座（やぎ座）';
      default:
        throw new Error('Invalid date');
    }
  }

  next() {
    this.router.navigateByUrl('/ura-taro')
  }


}
