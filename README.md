# NodeJS Web Crawler

A simple web crawler is written in Javascript. Given a starting URL, the crawler visits each URL it finds on the same domain.

## Installation

The host where the app is being run must have NodeJS (min. v14) and NPM.

```bash
cd /path/to/project
```

Install dependencies

```bash
npm install
```

## Run

After making sure you did the installation step above, run the following command:

```bash
npm start -- startURL=<URL to crawl>
```

Provide the URL that you want to crawl to the `startURL` command.  
For example:

```bash
npm start -- startURL="https://www.chaijs.com/"
```

## Running Tests

To run tests, run the following command

```bash
npm test
```

## How does it work?

- Starting with a valid `startURL`.
- Extract the domain from provided URL to define under what domain the crawler should run.
- Maintain `visitedLinks` list, to keep track of visited links to not visit them again.
- Add `startURL` to `linksToVisit` queue.
- As long as the `linksToVisit` queue is not empty:
  - Dequeue the first link from the queue `currentLink`.
  - Fetch the HTML content of `currentLink`.
  - Parse that HTML content and extract all the links from it.
  - Print the result.
  - Check the extracted links and add them to the queue in case the crawler hasn't visited them yet and they are under the same base domain that we obtained from `startURL`.
  - Mark the links as visited.

## Some Notes

- The crawling is happening in BFS (Breadth-first search) traversal fashion. I believe that BFS is more performant here than DFS (Depth-first search) because the depth of DFS traversal might be very deep compared to visiting all the links on one page before moving to the next one (unless a page has thousands of links, in this case, yes DFS would better)
- `printResult` prints all the links that are found on the page and not only the links that the crawler will visit.

## Architecture explanation

### Crawler

It contains the core logic of the web crawler.

### HTML Fetcher

It contains the logic of fetching the HTML content of a given URL.

### HTML Parser

It contains the logic of parsing HTML content and exposes a function to extract all the links from it.

### Models

The app has 2 types of models.

1. ParsedURL: An instance of this model holds some URL metadata like the protocol and the hostname.
2. Link: An instance of this model has information about a link like a link URL and the parent that we visited the link from.

## Deploy to Production

Before putting this application on production, I would like the checkbox the following addition:

- [ ] Create a better CLI solution, and provide a more detailed explanation of the options that you can use with the app.
- [ ] Add some timeouts to not overheat the website server that we are crawling, this might lead to rate limiting the IP that this crawler is running on by that server.
- [ ] Improve the output. Right now I don't think it is that useful.
- [ ] Add some business/performance metrics. Like, how many links the crawler is visiting per second, or how much CPU we are consuming, etc.
- [ ] Improve logging as right now it is very basic.
- [ ] Containerizing the application.
- [ ] Further filtering and covering for edge cases should be added.
- [ ] Add more tests for the crawler.

## Author

[Shadi Altarsha](https://github.com/shadialtarsha)
