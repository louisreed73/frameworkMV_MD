import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

/**
 *
 * InfoService
 * service for rendering info
 * about all types of documents
 * searching
 * acumulated Documentos / Total Consulta Documentos
 * acumulated Escritos / Total Consulta Escritos
 * acumulated Resoluciones / Total Consulta Resoluciones
 *
 */
@Injectable({
  providedIn: "root",
})
export class InfoService {
  /**
   *
   * documentosInfoAcumLength$
   * Acumulated number of Documentos
   * from API Buscador consulta + filters applied
   *
   */
  documentosInfoAcumLength$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   *
   * documentosInfoTotalLength$
   * number of total Documentos
   * from API Buscador consulta + filters applied
   *
   */
  documentosInfoTotalLength$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   *
   * resolucionesInfoAcumLength$
   * Acumulated number of Resoluciones
   * from API Buscador consulta + filters applied
   *
   */
  resolucionesInfoAcumLength$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   *
   * resolucionesInfoTotalLength$
   * number of total Resoluciones
   * from API Buscador consulta + filters applied
   *
   */
  resolucionesInfoTotalLength$: BehaviorSubject<any> = new BehaviorSubject(
    null
  );

  /**
   *
   * escritosInfoAcumLength$
   * Acumulated number of Escritos
   * from API Buscador consulta + filters applied
   *
   */
  escritosInfoAcumLength$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   *
   * escritosInfoTotalLength$
   * number of total Escritos
   * from API Buscador consulta + filters applied
   *
   */
  escritosInfoTotalLength$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   *
   * infoPath$
   * Subject send info about actual
   * page in new Search
   *
   */
  infoPath$: BehaviorSubject<any> = new BehaviorSubject("documentos");

  /**
   *
   * httpErrorInfo$
   * Subject sending
   * http errors
   * messages
   *
   */
  httpErrorInfo$: Subject<any> = new Subject();

  /**
   * Constructor Initializes Service
   *
   */
  constructor() {}
}
