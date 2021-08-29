const { expect } = require("chai");
const htmlParser = require("../index");

describe("extractLinksFromHTMLPage(rawHTML)", () => {
  it("should extract all links from one level HTML page", () => {
    const rawHTML = `
    <h1> Testing my web crawler </h1>
    <a href="https://localhost:8888/about.html"></a>
    <p> End of test</p>
    `;
    expect(htmlParser.extractLinksFromHTMLPage(rawHTML)).to.eql([
      "https://localhost:8888/about.html",
    ]);
  });

  it("should extract all links from all the levels inside an HTML page", () => {
    const rawHTML = `
    <h1> Testing my web crawler </h1>
    <a href="https://localhost:8888/about.html"></a>
    <a></a>
    <section>
      <p>
        <a href="https://localhost:8888/contact.html"></a>
      </p>
    </section>
    <p> End of test</p>
    `;
    expect(htmlParser.extractLinksFromHTMLPage(rawHTML)).to.eql([
      "https://localhost:8888/about.html",
      "https://localhost:8888/contact.html",
    ]);
  });

  it("should return an empty list if there is no link in the page", () => {
    const rawHTML = `
    <h1> Testing my web crawler </h1>
    <p> End of test</p>
    `;
    expect(htmlParser.extractLinksFromHTMLPage(rawHTML)).to.eql([]);
  });
});
