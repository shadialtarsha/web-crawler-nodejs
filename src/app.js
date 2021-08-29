const Crawler = require("./crawler");

const valueFromCommandLine = () => {
  let url = null;

  const arguments = process.argv;
  // The first two elements - node and the path to your script. 
  // These will always be present - even if your program takes no arguments.
  if (arguments.length > 2) {
    url = arguments[2].split("=")[1]
  }

  return url; 
}

let startURL = valueFromCommandLine();

const crawler = new Crawler(startURL);

// Start crawling.
crawler.run();
