import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replaceUnderDash",
})
export class ReplaceUnderDashPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.split("").includes("_") ? value.replace("_"," ") : value + "";
  }
}
