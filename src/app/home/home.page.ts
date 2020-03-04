import { Component, OnInit, ViewChild } from '@angular/core';
import { TipsService } from '../services/tips.service';
import { IonContent } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  color: Array<string> = ["#BBDEFB", "#D1C4E9", "#C5CAE9", "#FFCDD2", "#B2EBF2", "#DCEDC8"];

  constructor(private tipsService: TipsService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.tipsService.getTips().subscribe(tips => {
      tips.forEach(tip => {
        console.log(tip.id);
      });
      this.randomColor();
    })
    // document.querySelector('ion-content').setAttribute = this.randomColor();
  }

  randomColor() {
    let col = this.color[Math.floor(Math.random()*this.color.length)];
    console.log('Get color : ', col);
    return this.sanitizer.bypassSecurityTrustStyle('--randomcolor: '+col);
  }

}
