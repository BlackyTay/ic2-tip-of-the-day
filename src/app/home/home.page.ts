import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { TipsService } from '../services/tips.service';
import { IonContent, IonCard } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService } from '../services/storage.service';
import { IonicStorageModule } from '@ionic/storage';
// import { * as anime } from 'animejs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild('tipcard', {read: ElementRef, static: false}) tipcard;
  color: Array<string> = ["#BBDEFB", "#D1C4E9", "#C5CAE9", "#FFCDD2", "#B2EBF2", "#DCEDC8"];
  today = new Date().getDay();
  date = new Date().toLocaleString();
  dateCheck: number;
  tip: string;
  col: string;

  constructor(private tipsService: TipsService, private sanitizer: DomSanitizer, private nativeStorage: NativeStorage, private storageService: StorageService,
    public renderer: Renderer) {
    // this.nativeStorage.getItem('date')
    // .then(
    //   data => this.dateCheck = data.dateCheck,
    //   error => console.error(error)
    // );
  }

  async ngOnInit() {
    await this.storageService.get('dateCheck').then(result => {
      if (result!=null) {
        console.log('Data Get');
        this.dateCheck = result;
        console.log(this.dateCheck);
      }
    }).catch(e => {
      console.error(e);
    });
    if(this.dateCheck != this.today) {
      this.newTip();
    } else {
      await this.storageService.get('tip').then(result => {
        if(result!=null){
          this.tip = result;
          console.log('Tip :',this.tip);
        }else{
          console.log('No tip');
        }
      }).catch(e => {
        console.error(e);
      })
    }
    console.log('today : ', this.today);
    console.log('datecheck : ', this.dateCheck);
    this.col = this.color[Math.floor(Math.random()*this.color.length)];
  }

  randomColor() {
    console.log('Get color : ', this.col);
    return this.sanitizer.bypassSecurityTrustStyle('--randomcolor: '+this.col);
  }

  async newTip() {
    await this.renderer.setElementStyle(this.tipcard.nativeElement,'transform','rotateY(360deg) scale(0)' );
    this.date = new Date().toLocaleString();
    await this.tipsService.getTips().subscribe(tips => {
      let x=0;
      tips.forEach(tip => {
        x++;
      });
      let num = Math.floor(Math.random()*x);
      this.tip = tips[num].tip;
      console.log('Tip', this.tip); 
      this.storageService.set('tip', this.tip).then(result => {
        console.log('Tip saved');
      }).catch(e => {
        console.error(e);
      }).then()
    });
    this.renderer.setElementStyle(this.tipcard.nativeElement,'transform','rotateY(360deg) scale(1)' );
    // this.nativeStorage.setItem('date', {dateCheck: this.today});
    this.storageService.set('dateCheck', this.today).then(result => {
      console.log('Data saved');
    }).catch(e => {
      console.error(e);
    });
  }

}
