import { Component, Input, OnInit } from "@angular/core";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";

@Component({
  selector: "app-resume-document",
  templateUrl: "./resume-document.component.html",
  styleUrls: ["./resume-document.component.scss"],
})
export class ResumeDocumentComponent implements OnInit {
  @Input() documento: any;
  fuzzyString: string;
  pdfDownload_Name: string;
  pdfDownload_Src:string="";
  constructor(private searchTriggerServ: SearchTriggerService) {}

  ngOnInit() {
    // this.pdfDownload_Name = `documento_${this.documento.id}.pdf`;
    console.log(this.documento);
    this.pdfDownload_Name = `documento_${this.documento.id}.pdf`;
    this.pdfDownload_Src='data:application/pdf;base64,'+this.documento.data.pdf;
    console.log(this.pdfDownload_Name);
    console.log(this.pdfDownload_Src);
  }

  fuzzySearch() {
    console.log("fuzzy searching!!!!");

    this.searchTriggerServ.fuzzySearch.next(this.fuzzyString);
  }
}
