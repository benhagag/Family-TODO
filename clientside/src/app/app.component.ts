import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BEN HAGAG TEST TODO-FAMILY';


  constructor(private _router: Router) {
  }
  ngOnInit() {
    this._router.navigate(['/family']);
  }

}
