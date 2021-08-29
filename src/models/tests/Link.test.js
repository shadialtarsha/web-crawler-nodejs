const { expect } = require("chai");
const { createLinkObject } = require("../Link");
const createParsedURL = require("../ParsedURL");

describe("createLinkObject(url)", () => {
  it("should create a link object for full URL", () => {
    let url = "https://example.com/";
    expect(createLinkObject(url, null, null)).to.eql({
      linkURL: url,
      parent: null,
    });

    url = "https://example.com/a/b/";
    expect(createLinkObject(url, null, null)).to.eql({
      linkURL: url,
      parent: null,
    });
  });

  it("should create a link object for full URL and trim all # found", () => {
    let url = "https://example.com#overview";
    expect(createLinkObject(url, null, null)).to.eql({
      linkURL: "https://example.com/",
      parent: null,
    });

    url = "https://example.com/a/b#section1";
    expect(createLinkObject(url, null, null)).to.eql({
      linkURL: "https://example.com/a/b/",
      parent: null,
    });
  });

  it("should create a link object for full URL and set its parent", () => {
    const parent = createLinkObject("http://thesource.com");
    let url = "https://example.com/";

    expect(createLinkObject(url, parent, null)).to.eql({
      linkURL: url,
      parent,
    });

    url = "https://example.com/a/b/";
    expect(createLinkObject(url, parent, null)).to.eql({
      linkURL: url,
      parent,
    });
  });

  it("should create a link object from an absolute path", () => {
    const mainURL = createParsedURL("https://example.com/");

    const parent = createLinkObject("http://thesource.com/");
    let url = "/about.html";

    expect(createLinkObject(url, parent, mainURL)).to.eql({
      linkURL: mainURL.protocol + "//" + mainURL.hostname + url + "/",
      parent,
    });

    url = "/about.html#overview";
    expect(createLinkObject(url, parent, mainURL)).to.eql({
      linkURL: mainURL.protocol + "//" + mainURL.hostname + "/about.html" + "/",
      parent,
    });

    url = "/about.html";
    expect(createLinkObject(url, parent, null)).to.null;
  });

  it("should create a link object from a relative path", () => {
    const parent = createLinkObject("http://thesource.com/");
    let url = "about.html";

    expect(createLinkObject(url, parent, null)).to.eql({
      linkURL: parent.linkURL + url + "/",
      parent,
    });

    url = "about.html#overview";
    expect(createLinkObject(url, parent, null)).to.eql({
      linkURL: parent.linkURL + "about.html" + "/",
      parent,
    });

    url = "about.html";
    expect(createLinkObject(url, null, null)).to.null;
  });
});
