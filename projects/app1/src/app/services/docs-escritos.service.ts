import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
     providedIn: "root",
})
export class DocsEscritosService {
     docsEscritosSource$: BehaviorSubject<{}> = new BehaviorSubject({});

     constructor() {}
}
