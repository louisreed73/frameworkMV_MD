import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headermain',
  templateUrl: './headermain.component.html',
  styleUrls: ['./headermain.component.scss']
})
export class HeadermainComponent implements OnInit {


  constructor(private rout:Router) { }

  ngOnInit() {
  }

}
