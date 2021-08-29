const axios = require("axios").default;

const fetchHTMLContent = async (url) => {
  if (!url) {
    return null;
  }

  try {
    const response = await axios.get(url, { validateStatus: () => true });
    if (response.status === 200) {
      return response.data;
    }

    console.error(
      `couldn't get the content of ${url} - code: ${response.status}`
    );

    return null;
  } catch (err) {
    console.error(`failed to fetch the content of ${url}`, err);
    return null;
  }
};

module.exports = {
  fetchHTMLContent,
};
