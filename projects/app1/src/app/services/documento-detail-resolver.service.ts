import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DetailDocumentResolveGuard implements Resolve<any> {
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        
        console.log("im going to resolve this document details!!!");

        return false;
        setTimeout(() => {
            // return of({documento:"resuelto",error:false});

            
        }, 1000);
    }
}
