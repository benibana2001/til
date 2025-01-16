const express = require("express");
const router = express.Router();

const allowList = [
  "http://localhost:3000",
  "http://site.example:3000",
]

router.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  if(req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token")
  }
  next();
})

router.get("/", (req, res) => {
  // res.setHeader("Content-Security-Policy", "default-src 'self'")
  res.set("Content-Security-Policy", "default-src 'self'");
  res.send({ message: "Hello"});
})

router.use(express.json())
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body)
  res.end()
})

module.exports = router;