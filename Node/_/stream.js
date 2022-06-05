const fs = require("fs");
/**
 * 3.2.1 ストリームの基本
 */
function copyFileWithStream(src, dest, cb) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on("finish", cb);
}
copyFileWithStream("./http.js", "./new.js", () => console.log("done"));
