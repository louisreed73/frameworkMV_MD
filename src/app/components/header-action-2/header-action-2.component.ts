import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-action-2',
  templateUrl: './header-action-2.html',
  styleUrls: ['./header-action-2.scss']
})
export class HeaderAction2 implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showAlert() {
    alert('Acción 2 - Favorito');
  }
}
