import { Component, OnInit } from '@angular/core';
import { AuthenticationService }  from '@mova/components/core';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.html',
  styleUrls: ['./user-profile-view.scss']
})
export class UserProfileView implements OnInit {

  // objeto con las credenciales
  globalCredentials: any;

  constructor(
    private _authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // Credenciales consultadas
    this.globalCredentials = this._authenticationService.getCredentials();
  }

}
