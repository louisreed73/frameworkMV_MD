import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeDomHtmlSanitizer'
})
export class SafeDomHtmlSanitizerPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value: any, ...args: any[]): any {
    // return "data:application/pdf;base64,"+value;
    // return this.sanitizer.bypassSecurityTrustUrl(value);
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);

  }

}
