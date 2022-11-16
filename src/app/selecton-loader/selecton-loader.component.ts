import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecton-loader',
  templateUrl: './selecton-loader.component.html',
  styleUrls: ['./selecton-loader.component.scss']
})
export class SelectonLoaderComponent implements OnInit {

  @Input() Cwidth: any;
  @Input() Cheight: any;
  @Input() circle: any;

  constructor() { }

  ngOnInit(): void {
  }
  getMyStyles():any{
    let myStyles={
      'width.px':this.Cwidth? this.Cwidth: "",
      'height.px':this.Cheight? this.Cheight: "", 
      'border-radius': this.circle? "50%":""
    }
    return myStyles
  }
}
