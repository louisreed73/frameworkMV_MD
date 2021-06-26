import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 *
 * Spinner Service
 * Subject sending boolean
 * if new http call is happening
 * sending true if so
 * on http response we send false
 * mainly this service is
 * for http interceptor
 * Data Retrieval Interceptor
 * rendering Spinner if true
 *
 */
@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  /**
   *
   * requestSpinner$
   * Subject sending info
   * http call in process - true
   * http response - false
   * for rendering Spinner - true
   * hiding Spinner -false
   *
   */
  requestSpinner$: Subject<boolean> = new Subject();

  /**
   * Constructor Initializes Service
   *
   */
  constructor() {}
}
