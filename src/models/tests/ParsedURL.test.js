const { expect } = require("chai");
const createParsedURL = require("../ParsedURL");

describe("createParsedURL(url)", () => {
  it("should parse the URL string and return host, domain and protocol", () => {
    let url = "https://www.example.com";
    expect(createParsedURL(url)).to.eql({
      url: "https://www.example.com",
      protocol: "https:",
      hostname: "example.com",
    });

    url = "https://example.com";
    expect(createParsedURL(url)).to.eql({
      url: "https://example.com",
      protocol: "https:",
      hostname: "example.com",
    });

    url = "http://www.another-one.com";
    expect(createParsedURL(url)).to.eql({
      url: "http://www.another-one.com",
      protocol: "http:",
      hostname: "another-one.com",
    });

    url = "https://www.example.org/a/b/";
    expect(createParsedURL(url)).to.eql({
      url: "https://www.example.org/a/b/",
      protocol: "https:",
      hostname: "example.org",
    });
  });

  it("should parse the URL string and return subdomain in case it exists", () => {
    let url = "https://www.jobs.example.com";
    expect(createParsedURL(url)).to.eql({
      url: "https://www.jobs.example.com",
      protocol: "https:",
      hostname: "jobs.example.com",
    });

    url = "https://www.jobs.example.org/a/b/";
    expect(createParsedURL(url)).to.eql({
      url: "https://www.jobs.example.org/a/b/",
      protocol: "https:",
      hostname: "jobs.example.org",
    });
  });

  it("should return NULL in case the URL string is invalid", () => {
    let url = "";
    expect(createParsedURL(url)).to.be.null;

    url = "this is invalid url";
    expect(createParsedURL(url)).to.be.null;

    url = 123;
    expect(createParsedURL(url)).to.be.null;
  });
});
