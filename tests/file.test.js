const response = require("./../src/lib/response");
const fs = require("node:fs");

const svg = `<?xml version="1.0"><svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="1" height="1" fill="black" /></svg>`;

beforeEach(() => {
  fs.writeFileSync("temp.svg", Buffer.from(svg));
});

afterEach(() => {
  fs.unlinkSync("temp.svg");
});

test("file response", () => {
  const res = response();

  res.file("temp.svg", "image/svg+xml");

  expect(res.getResponse()).toEqual({
    body: Buffer.from(svg).toString("base64"),
    headers: { "Content-Type": "image/svg+xml" },
    isBase64Encoded: true,
    statusCode: 200,
  });
});
