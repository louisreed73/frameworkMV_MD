import { SafeDomHtmlSanitizerPipe } from './safe-dom-html-sanitizer.pipe';

describe('SafeDomHtmlSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeDomHtmlSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
