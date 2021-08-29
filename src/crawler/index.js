const htmlFetcher = require("../html_fetcher");
const htmlParser = require("../html_parser");
const createParsedURL = require("../models/ParsedURL");
const { createLinkObject, createLinkObjects } = require("../models/Link");

class Crawler {
  constructor(startURL, printLinks = true) {
    // visitedLinks is a hash map to keep track of the already visited links.
    this.visitedLinks = {};

    // linksToVisitQueue is a queue that holds the links that the crawler will visit.
    this.linksToVisitQueue = [];

    // mainURL defines the main URL that the crawler will crawl.
    this.mainURL = createParsedURL(startURL);

    // printLinks is a flag to control printing the results of the crawler.
    this.printLinks = printLinks;

    if (this.mainURL) {
      this.startLink = createLinkObject(startURL, null, this.mainURL);
    } else {
      throw new Error("startURL is invalid");
    }
  }

  async run() {
    this.addToLinksToVisitQueue(this.startLink);

    try {
      // The crawler does breadth-first traversal on the problem space.
      // That means for each page, the crawler will visit the links on this page before moving to the next one.
      while (!this.isLinksToVisitQueueEmpty()) {
        const currentLink = this.linksToVisitQueue.shift();

        // Fetch the link's HTML content.
        const html = await htmlFetcher.fetchHTMLContent(currentLink.linkURL);

        // Extract links from the HTML content.
        let extractedLinks = [];
        if (html) {
          extractedLinks = createLinkObjects(
            htmlParser.extractLinksFromHTMLPage(html),
            currentLink,
            this.mainURL
          );
        }

        // Print all the found links.
        if (this.printLinks) {
          this.printResult(currentLink, extractedLinks);
        }

        // Add new links to "linksToVisit" queue.
        extractedLinks.forEach((extractedLink) =>
          this.addToLinksToVisitQueue(extractedLink)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  isLinksToVisitQueueEmpty() {
    return this.linksToVisitQueue.length === 0;
  }

  addToLinksToVisitQueue(link) {
    const parsedLink = createParsedURL(link.linkURL);
    if (!parsedLink) {
      return;
    }

    // Only add a link to "linksToVisit" queue if it belongs to the same domain and it hasn't been visited yet.
    if (
      this.mainURL.hostname === parsedLink.hostname &&
      !this.visitedLinks[link.linkURL]
    ) {
      this.linksToVisitQueue.push(link);
      this.visitedLinks[link.linkURL] = link;
    }
  }

  printResult(currentLink, extractedLinks) {
    console.log(
      `Link: ${currentLink.linkURL} has ${extractedLinks.length} links`
    );
    extractedLinks.forEach((link) => console.log(link.linkURL));
    console.log("************************************************************");
  }
}

module.exports = Crawler;
