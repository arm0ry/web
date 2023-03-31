import axios from "axios";

const encodeImageAsBase64 = async (url) => {
  const image = await axios(url, { responseType: "arraybuffer" });
  const contentType = image.headers['content-type']
  const imageBuffer = image.data;

  return `data:${contentType};base64,${Buffer.from(imageBuffer).toString(
    "base64"
  )}`;
};
const replaceAsync = async (url, title) => {
  const _url = url.split(" ")[0];
  const base64 = await encodeImageAsBase64(_url);
  const r = "![](" + base64 + " " + (title ? " " + title : "") + ")";
  return r;
};

export const replaceMarkdownImageUrltoBase64 = async (markdown) => {
  const regexp = /!\[[^\]]*\]\(\s*(?<url>.*?)(?=\"|\))(?<title>\".*\")?\)/g;
  // const regexp = /!\[[^\]]*\]\(\s*(?<url>.*?)(?=\s|\)).*?(?=\")(?<title>\".*\")?\)/g;
  // const regexp = /!\[[^\]]*\]\((?<url>.*?)(?=\"|\))(?<title>\".*\")?\)/g;
  // const regexp = /\[[^\]]*\]\:\s*(?<url>.*?)(?=\s).*?(?=\"|\n)(?<title>\".*\")?/g;
  //   TODO
  let promises = [];
  markdown.replace(regexp, async (match, url, title, offset, str) => {
    const r = replaceAsync(url, title);
    promises.push(r);
  });
  const data = await Promise.all(promises);
  return markdown.replace(regexp, () => data.shift());
};
