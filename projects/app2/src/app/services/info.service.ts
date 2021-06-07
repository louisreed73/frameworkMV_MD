import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  documentosInfoTotalLength$:BehaviorSubject<any>=new BehaviorSubject(null);
  documentosInfoAcumLength$:BehaviorSubject<any>=new BehaviorSubject(null);
  resolucionesInfoTotalLength$:BehaviorSubject<any>=new BehaviorSubject(null);
  resolucionesInfoAcumLength$:BehaviorSubject<any>=new BehaviorSubject(null);
  escritosInfoTotalLength$:BehaviorSubject<any>=new BehaviorSubject(null);
  escritosInfoAcumLength$:BehaviorSubject<any>=new BehaviorSubject(null);

  httpErrorInfo$:Subject<any>=new Subject();

  constructor() { }
}
