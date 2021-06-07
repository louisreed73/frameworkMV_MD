import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
     providedIn: "root",
})
export class DocsResolucionesService {
     docsResolucionesSource$: BehaviorSubject<{}> = new BehaviorSubject({})

     constructor() {}
}
