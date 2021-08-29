const createParsedURL = require("./ParsedURL");

class Link {
  constructor(linkURL, parent = null) {
    this.linkURL = linkURL;
    this.parent = parent;
  }
}

const createLinkObject = (url, parent = null, baseURL = null) => {
  if (!url) {
    return null;
  }

  // Remove '#' from the link in case it contains it.
  let validURL = url.split("#")[0];

  if (validURL[validURL.length - 1] !== "/") {
    validURL += "/";
  }

  if (!validURL) {
    return null;
  }

  let parsedURL = createParsedURL(validURL);

  // The link is a full URL.
  if (parsedURL) {
    return new Link(validURL, parent);
  }

  // Absolute path.
  if (validURL.indexOf("/") === 0) {
    if (!baseURL) {
      console.error(
        `failed to create link object for ${url}. mainURL is undefined`
      );
      return null;
    }

    const linkURL = baseURL.protocol + "//" + baseURL.hostname + validURL;

    return new Link(linkURL, parent);
  }

  if (!parent) {
    console.error(
      `failed to create link object for ${url}. parent is undefined`
    );
    return null;
  }

  // Relative path to the current link.
  return new Link(parent.linkURL + validURL, parent);
};

const createLinkObjects = (links, parent, baseURL) => {
  return links.reduce((linkObjects, link) => {
    const linkObj = createLinkObject(link, parent, baseURL);
    if (linkObj) {
      linkObjects.push(linkObj);
    }
    return linkObjects;
  }, []);
};

module.exports = {
  createLinkObject,
  createLinkObjects,
};
