import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GuitarsComponent } from './pages/guitars/guitars.component';
import { BassComponent } from './pages/bass/bass.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeadermainComponent } from './components/headermain/headermain.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainguitarsComponent } from './components/mainguitars/mainguitars.component';
import { MainBassComponent } from './components/main-bass/main-bass.component';
import { MainContactComponent } from './components/main-contact/main-contact.component';

const appRoutes:Routes=[
  {path:"segura-view" ,component:HomeComponent},
  {path:"guitars2" ,component:GuitarsComponent},
  {path:"bass" ,component:BassComponent},
  {path:"contact" ,component:ContactComponent}
]

const providers:Array<any>=[];

@NgModule({})
export class App2Module { 
  static forRoot():ModuleWithProviders<any> {
    return {
      ngModule:AppModule,
      providers:providers
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuitarsComponent,
    BassComponent,
    ContactComponent,
    HeadermainComponent,
    MainHomeComponent,
    MainguitarsComponent,
    MainBassComponent,
    MainContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
