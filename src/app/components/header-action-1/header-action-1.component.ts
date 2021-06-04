import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-action-1',
  templateUrl: './header-action-1.html',
  styleUrls: ['./header-action-1.scss']
})
export class HeaderAction1 implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showAlert() {
    alert('Acción 1 - Usuario');
  }
}
