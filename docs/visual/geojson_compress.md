# geojson 压缩

利用 echarts 里面 geojson 压缩的方法可以大大缩小 geojson 文件的大小

300kb 压缩后 12kb 十倍以上

## 压缩

```js
const fs = require("fs");

fs.readFile("目标文件", "utf8", (err, data) => {
  const res = encodeGeo(JSON.parse(data));
  fs.writeFileSync("结果文件", JSON.stringify(res));
});

// begin: 压缩算法
function encodePolygon(coordinate, encodeOffsets) {
  var result = "";
  var prevX = quantize(coordinate[0][0]);
  var prevY = quantize(coordinate[0][1]);
  // Store the origin offset
  encodeOffsets[0] = prevX;
  encodeOffsets[1] = prevY;
  for (var i = 0; i < coordinate.length; i++) {
    var point = coordinate[i];
    result += encode(point[0], prevX);
    result += encode(point[1], prevY);
    prevX = quantize(point[0]);
    prevY = quantize(point[1]);
  }
  return result;
}

function encode(val, prev) {
  // Quantization
  val = quantize(val);

  val = val - prev;
  if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
    //WTF, 8232 will get syntax error in js code
    val--;
  }
  // ZigZag
  val = (val << 1) ^ (val >> 15);
  // add offset and get unicode
  return String.fromCharCode(val + 64);
}
function quantize(val) {
  return Math.ceil(val * 1024);
}

function encodeGeo(geo) {
  // 压缩标识
  geo.UTF8Encoding = true;
  geo.UTF8Scale = 1024;

  for (let f_i = 0; f_i < geo.features.length; f_i++) {
    var geometry = geo.features[f_i].geometry;
    if (geometry.type === "Polygon") {
      var coordinates = geometry.coordinates;
      geometry.encodeOffsets = Array(coordinates.length);
      for (let c = 0; c < coordinates.length; c++) {
        var offset = Array(2);
        var codeStr = encodePolygon(coordinates[c], offset);
        coordinates[c] = codeStr;
        geometry.encodeOffsets[c] = offset;
      }
    } else if (geometry.type === "MultiPolygon") {
      var coordinates = geometry.coordinates;
      geometry.encodeOffsets = Array(coordinates.length);
      for (let c = 0; c < coordinates.length; c++) {
        var coordinate = coordinates[c];
        geometry.encodeOffsets[c] = Array(coordinate.length);

        for (let c2 = 0; c2 < coordinate.length; c2++) {
          var offset = Array(2);
          var codeStr = encodePolygon(coordinate[c2], offset);
          coordinate[c2] = codeStr;
          geometry.encodeOffsets[c][c2] = offset;
        }
      }
    }
  }
  return geo;
}
```

## 解压

```js
function decode(json) {
  if (!json.UTF8Encoding) {
    return json;
  }
  var features = json.features;

  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    var geometry = feature.geometry;
    var coordinates = geometry.coordinates;
    var encodeOffsets = geometry.encodeOffsets;

    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c];

      if (geometry.type === "Polygon") {
        coordinates[c] = decodePolygon(coordinate, encodeOffsets[c]);
      } else if (geometry.type === "MultiPolygon") {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2];
          coordinate[c2] = decodePolygon(polygon, encodeOffsets[c][c2]);
        }
      }
    }
  }
  // Has been decoded
  json.UTF8Encoding = false;
  return json;
}

function decodePolygon(coordinate, encodeOffsets) {
  var result = [];
  var prevX = encodeOffsets[0];
  var prevY = encodeOffsets[1];

  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64;
    var y = coordinate.charCodeAt(i + 1) - 64;
    // ZigZag decoding
    x = (x >> 1) ^ -(x & 1);
    y = (y >> 1) ^ -(y & 1);
    // Delta decoding
    x += prevX;
    y += prevY;

    prevX = x;
    prevY = y;
    // Dequantize
    result.push([x / 1024, y / 1024]);
  }

  return result;
}
```
