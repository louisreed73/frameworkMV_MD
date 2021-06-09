import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
     providedIn: "root",
})
export class SpinnerService {
     requestSpinner$: Subject<boolean> = new Subject();

     constructor() {}
}
