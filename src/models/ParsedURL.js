class ParsedURL {
  constructor(originalURL, protocol, hostname) {
    this.url = originalURL;
    this.protocol = protocol;
    this.hostname = hostname;
  }
}

const createParsedURL = (url) => {
  try {
    const urlObject = new URL(url);

    const protocol = urlObject.protocol;
    let hostname = urlObject.hostname;

    const hostnameComponents = hostname.split(".");
    if (hostnameComponents[0] === "www") {
      hostname = hostnameComponents.slice(1).join(".");
    }

    return new ParsedURL(url, protocol, hostname);
  } catch (err) {
    return null;
  }
};

module.exports = createParsedURL;
