const { default: axios } = require("axios");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const htmlFetcher = require("../index");

const expect = chai.expect;
chai.use(sinonChai);

describe("fetchHTMLContent(url)", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should return raw HTML", async () => {
    const htmlRawContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home</title>
        </head>
        <body>
          HOME
          <a href="about.html">about</a>
          <a href="tos.html">tos</a>
        </body>
      </html>
    `;

    const axiosGetStub = sandbox
      .stub(axios, "get")
      .resolves({ data: htmlRawContent, status: 200 });

    const html = await htmlFetcher.fetchHTMLContent("https://example.com");

    expect(html).to.eql(htmlRawContent);
    expect(axiosGetStub).to.be.calledOnceWith("https://example.com");
  });

  it("should return null if no url was provided", async () => {
    const htmlRawContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home</title>
        </head>
        <body>
          HOME
          <a href="about.html">about</a>
          <a href="tos.html">tos</a>
        </body>
      </html>
    `;

    const axiosGetStub = sandbox
      .stub(axios, "get")
      .resolves({ data: htmlRawContent, status: 200 });

    const html = await htmlFetcher.fetchHTMLContent();

    expect(html).to.be.null;
    expect(axiosGetStub).to.not.calledOnceWith;
  });

  it("should return null if the status code is not 200", async () => {
    const htmlRawContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home</title>
        </head>
        <body>
          HOME
          <a href="about.html">about</a>
          <a href="tos.html">tos</a>
        </body>
      </html>
    `;

    const axiosGetStub = sandbox
      .stub(axios, "get")
      .resolves({ data: null, status: 400 });

    const html = await htmlFetcher.fetchHTMLContent("https://example.com");

    expect(html).to.be.null;
    expect(axiosGetStub).to.not.calledOnceWith;
  });
});
