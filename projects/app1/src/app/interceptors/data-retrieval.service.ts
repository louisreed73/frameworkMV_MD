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

@Injectable({
     providedIn: "root",
})
export class DataRetrievalInterceptor implements HttpInterceptor {
     constructor(private spinner: SpinnerService) {}
     intercept(req: HttpRequest<any>, next: HttpHandler) {
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
