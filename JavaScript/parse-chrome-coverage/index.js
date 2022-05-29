const path = require("path");
const fs = require("fs");
let json = [
  {
    url: "http://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js",
    ranges: [
      { start: 0, end: 173 },
      {
        start: 272,
        end: 668,
      },
    ],
    text: "hoge",
  },
  {
    url: "example.com",
    ranges: [],
    text: null,
  },
];

json = JSON.parse(fs.readFileSync("Coverage.json"));
const OUT_FILE = "dist/out.json";
const OUT_FILE_PATH = path.join(__dirname, OUT_FILE); // absolute path
const getTextLength = (text) => (text ? text.length : 0);
const getUsedBytes = (ranges) => {
  if (!ranges || !ranges.length) return 0;
  return ranges.map(({ start, end }) => end - start).reduce((n, m) => n + m);
};

const getUsedBytesPercentate = (totalBytes) => (usedBytes) =>
  (usedBytes / totalBytes) * 100;

/**
 * 拡張子ごとに挙動が異なるためCSSのみに限定して書き出す
 */
fs.writeFileSync(
  OUT_FILE_PATH,
  JSON.stringify(
    json
      .filter(({ url }) => url.slice(-4) === ".css") // filter only CSS file.
      .map(({ url, ranges, text }) => {
        const totalBytes = getTextLength(text);
        const usedBytes = getUsedBytes(ranges);
        const usedBytesPer = getUsedBytesPercentate(totalBytes)(usedBytes);
        return {
          url,
          totalBytes,
          usedBytes,
          usedBytesPer,
          unUsedBytes: totalBytes - usedBytes,
          unUsedBytesPer: (totalBytes - usedBytes) / totalBytes * 100,
        };
      })
  )
);
