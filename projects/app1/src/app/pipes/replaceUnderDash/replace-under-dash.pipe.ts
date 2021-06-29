import { Pipe, PipeTransform } from "@angular/core";

/**
 *
 * ReplaceUnderDashPipe
 * Pipe to transform
 * strings of Filters Titles
 * replacing "_" to ""
 * Forced due to change model
 * for API Buscador naming
 *
 */
@Pipe({
  name: "replaceUnderDash",
})
export class ReplaceUnderDashPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.split("").includes("_") ? value.replace("_", " ") : value + "";
  }
}
