const cheerio = require("cheerio");

const extractLinksFromHTMLPage = (rawHTML) => {
  const $ = cheerio.load(rawHTML);

  const links = $("a")
    .filter((_, link) => link.attribs.href !== null)
    .map((_, link) => link.attribs.href)
    .get();

  return links;
};

module.exports = {
  extractLinksFromHTMLPage,
};
