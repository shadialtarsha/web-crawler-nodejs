const { expect } = require("chai");
const rewire = require("rewire");
const Crawler = rewire("../index");
const seed = require("./seed");

describe("Crawler", () => {
  Crawler.__set__("htmlFetcher", {
    fetchHTMLContent: function (url) {
      if (!seed[url]) {
        return null;
      }
      return seed[url];
    },
  });

  it("should throw an error in case the startURL is invalid", () => {
    const startURL = "invalid URL";

    expect(() => new Crawler(startURL)).to.throw("startURL is invalid");
  });

  it("should only visit the start URL when the page doesn't have more links", async () => {
    const startURL = "https://example.com/other.html/";

    const crawler = new Crawler(startURL, false);
    await crawler.run();

    expect(Object.keys(crawler.visitedLinks)).to.eql([
      "https://example.com/other.html/",
    ]);
  });

  it("should visit all the links when the page has more links", async () => {
    const startURL = "https://example.com/";

    const crawler = new Crawler(startURL, false);
    await crawler.run();

    expect(Object.keys(crawler.visitedLinks)).to.eql([
      "https://example.com/",
      "https://example.com/about.html/",
      "https://example.com/tos.html/",
      "https://example.com/contact.html/",
      "https://example.com/other.html/",
    ]);
  });
});
