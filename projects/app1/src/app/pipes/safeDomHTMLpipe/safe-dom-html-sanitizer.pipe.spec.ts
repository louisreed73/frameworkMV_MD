import { TestBed } from "@angular/core/testing";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { SafeDomHtmlSanitizerPipe } from "./safe-dom-html-sanitizer.pipe";

describe("SafeDomHtmlSanitizerPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });
  it("create an instance", () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new SafeDomHtmlSanitizerPipe(domSanitizer);
    expect(pipe).toBeTruthy();
    // console.log(a);
    // expect(pipe.transform("este")).toBe("este");
  });
});
