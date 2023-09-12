var dpiList = [300, 400, 600];

var paperList = {
  A1: [59.4, 84.1],
  A1SQR: [59.4, 59.4],
  A1BIGSQR: [84.1, 84.1],
  A2: [42.0, 59.4],
  A2SQR: [42.0, 42.0],
  A2BIGSQR: [59.4, 59.4],
  A3: [29.7, 42.0],
  A3SQR: [29.7, 29.7],
  A3BIGSQR: [42.0, 42.0],
  A4: [21.0, 29.7],
  A4SQR: [21.0, 21.0],
  A5: [14.8, 21.0],
  A5SQR: [14.8, 14.8],
  A6: [10.5, 14.8],
  A6SQR: [10.5, 10.5],
  A7: [7.4, 10.5],
  A8: [5.2, 7.4],
  A9: [3.7, 5.2],
  C4: [32.4, 23.1], // C4 Envelope-ish
  C5: [23.2, 16.2], // C5 Envelope-ish
  C6: [16.2, 11.4], // C6 Envelope-ish
  FN: [9, 14], //  Field Notes notebook
  NB1: [15.3, 21.5],
  LT1: [9, 15], // LEUCHTTURM 1917
  TW: [12.8, 21.1], // TWSBI notepad
  PL: [8.9, 10.8], // Polaroid.
  iP6S: [7, 14], // iPhone 6s
  LISQ1: [9.6, 10], // Lino square1
  RM: [15.6, 20.9], // ReMarkable 2
  SC: [8.8, 8.8], // Scratch cards
  IGA: [15, 15], // Ingraving aluminium
  CSMSQR: [4.8, 4.8], // Ingraving copper small square
  CLRGSQR: [10, 10], // Ingraving copper small square
  CSMRECT: [10, 15], // Ingraving copper small square
  MAX: [130, 130], // 1.5m
  DEFAULT: [534, 755], // pixels
};

function resizePage(size, canvasList, dpi) {
  var width = Math.floor(size[0] * 0.393701 * dpi);
  var height = Math.floor(size[1] * 0.393701 * dpi);
  if (size[0] === paperList.DEFAULT[0] && size[1] === paperList.DEFAULT[1]) {
    width = size[0];
    height = size[1];
  }
  console.log(width);
  console.log(height);
  canvasList.forEach(function (canvas) {
    canvas.width = width;
    canvas.height = height;
  });
  return [width, height];
}
