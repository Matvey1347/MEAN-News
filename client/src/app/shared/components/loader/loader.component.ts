import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() fontSize!: string;
  @Input() color!: string;
  @Input() loader!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
