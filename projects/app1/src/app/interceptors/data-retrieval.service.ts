import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { SpinnerService } from "../services/spinner.service";


/**
 *
 * DataRetrievalInterceptor
 * Interceptor responsible of
 * activate spinner on http call
 * and deactivate spinner on http response
 *
 */
@Injectable({
  providedIn: "root",
})
export class DataRetrievalInterceptor implements HttpInterceptor {
  
  
  /**
   *
   * param: spinner {Service} Spinner Service
   * Service observable
   * communicate activation of Spinner
   * and deactivation
   *
   */  
  constructor(private spinner: SpinnerService) {}
  
  /**
   *
   * intercept Method
   * method Contract
   * returns request and
   * after running some logic
   * next Handler
   * In this case activate
   * and deactivate Spinner
   *
   */  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    /**
     *
     * next
     * Handler for running
     * after logic
     *
     */    
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        this.spinner.requestSpinner$.next(true);
        if (event instanceof HttpResponse) {
          this.spinner.requestSpinner$.next(false);
        }
        return event;
      })
    );
  }
}
