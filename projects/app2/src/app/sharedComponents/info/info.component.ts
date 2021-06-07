import { Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { BehaviorSubject, combineLatest, Subject, Subscription } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { InfoService } from "projects/app2/src/app/services/info.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit, OnDestroy {
  documentosInfo$ = this.infoServ.documentosInfoTotalLength$.pipe(
    shareReplay(1)
  );
  documentosAcumInfo$ = this.infoServ.documentosInfoAcumLength$.pipe(
    shareReplay(1)
  );
  resolucionesInfo$ = this.infoServ.resolucionesInfoTotalLength$.pipe(
    tap(console.log),
    shareReplay(1)
  );
  resolucionesAcumInfo$ = this.infoServ.resolucionesInfoAcumLength$.pipe(
    tap(console.log),
    shareReplay(1)
  );
  escritosInfo$ = this.infoServ.escritosInfoTotalLength$.pipe(
    tap(console.log),
    shareReplay(1)
  );
  escritosAcumInfo$ = this.infoServ.escritosInfoAcumLength$.pipe(
    tap(console.log),
    shareReplay(1)
  );
  httpErrorInfo$ = this.infoServ.httpErrorInfo$;

  // vmD$=combineLatest([
  //      this.infoServ.documentosInfoTotalLength$,
  //      this.infoServ.documentosInfoAcumLength$
  // ])
  // .pipe(
  //      map(([total,acum])=>({total,acum})),
  //      tap(console.log),
  //      shareReplay(1),
  // )
  // httpErrorInfo$=this.infoServ.documentosInfo$;

  actualURL$: BehaviorSubject<string> = new BehaviorSubject("/documentos");
  constructor(private infoServ: InfoService, private location: Location) {
    // this.url=this.location.path();
    // this.getURL()
    // console.log(this.actualURL)
  }

  // set url(v:string) {
  //      console.log("Cambiando url")

  //      this.actualURL$.next(v)
  // }
  // get url() {
  //      return true;
  // }

  ngOnInit() {
    // this.actualURL$.next("pepe")
    // this.actualURL$.next(this.location.path());

    // console.log(this.router.url.split("\/")[1]);
    this.location.onUrlChange((urlS) => {
      // console.log(urlS);
      // this.actualURL$.next(urlS)
      // this.getURL()
      // this.url=urlS;
    });
    // this.location.subscribe((url) => {
    //      console.log(url);
    // });
  }

  ngOnDestroy() {}
}
