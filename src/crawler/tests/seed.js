module.exports = {
  "https://example.com/": `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home</title>
    </head>
    <body>
      HOME
      <a href="about.html">about</a>
      <a href="tos.html">tos</a>
      <a href="https://example.com/contact.html">contact</a>
      <a href="https://google.com">should not visit</a>
    </body>
  </html>
  `,
  "https://example.com/about.html/": `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About</title>
    </head>
    <body>
      About
      <a href="/other.html">other</a>
      <a href="/">home</a>
    </body>
  </html>
  `,
  "https://example.com/contact.html/": `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact</title>
    </head>
    <body>
      Contact
      <a href="/">home</a>
    </body>
  </html>
  `,
  "https://example.com/other.html/": `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Other</title>
    </head>
    <body>
      Other
    </body>
  </html>
  `,
  "https://example.com/tos.html/": `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TOS</title>
    </head>
    <body>
      TOS
    </body>
  </html>
  `,
};
