import { ReplaceUnderDashPipe } from "./replace-under-dash.pipe";

describe("ReplaceUnderDashPipe", () => {
  it("create an instance", () => {
    const pipe = new ReplaceUnderDashPipe();
    expect(pipe).toBeTruthy();
  });
  it("replace _ character", () => {
    const pipe = new ReplaceUnderDashPipe();
    let a = "lo_que_sea";
    expect(pipe.transform(a)).toEqual("lo que sea");
  });
  it("replace _ character if is included", () => {
    const pipe = new ReplaceUnderDashPipe();
    let a = "lo que sea";
    expect(pipe.transform(a)).toEqual("lo que sea");
  });
});
