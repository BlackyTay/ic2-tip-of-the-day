import { Component, OnInit, ViewChild } from '@angular/core';
import { TipsService } from '../services/tips.service';
import { IonContent } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService } from '../services/storage.service';
import { IonicStorageModule } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  color: Array<string> = ["#BBDEFB", "#D1C4E9", "#C5CAE9", "#FFCDD2", "#B2EBF2", "#DCEDC8"];
  today = new Date().getDay();
  dateCheck: number;
  tip: string;

  constructor(private tipsService: TipsService, private sanitizer: DomSanitizer, private nativeStorage: NativeStorage, private storageService: StorageService) {
    // this.nativeStorage.getItem('date')
    // .then(
    //   data => this.dateCheck = data.dateCheck,
    //   error => console.error(error)
    // );
    this.storageService.get('dateCheck').then(result => {
      if (result!=null) {
        console.log('Data Get');
        this.dateCheck = result;
      }
    }).catch(e => {
      console.error(e);
    });
  }

  ngOnInit() {
    if(this.dateCheck != this.today) {
      this.tipsService.getTips().subscribe(tips => {
        let x=0;
        tips.foreach(tip => {
          x++;
        });
        let num = Math.floor(Math.random()*x);
        this.tip = tips[num].tip;
        console.log('Tip', this.tip); 
      });
    }
    // this.nativeStorage.setItem('date', {dateCheck: this.today});
    this.storageService.set('dateCheck', this.today).then(result => {
      console.log('Data saved');
    }).catch(e => {
      console.error(e);
    });
    console.log('today : ', this.today);
    console.log('datecheck : ', this.dateCheck);
  }

  randomColor() {
    let col = this.color[Math.floor(Math.random()*this.color.length)];
    console.log('Get color : ', col);
    return this.sanitizer.bypassSecurityTrustStyle('--randomcolor: '+col);
  }

}
