var canvas = document.querySelector("#canvas");

var canvasSVGContext = new CanvasSVG.Deferred();
canvasSVGContext.wrapCanvas(canvas);
var ctx = canvas.getContext("2d");

var canvasList = [canvas];
var ctxList = [ctx];

var pageParams = {
  width: paperList.DEFAULT[0], // 600
  height: paperList.DEFAULT[1], // 840
  left: 0,
  top: 0,
  color1: "#ff3f1f",
  color2: "#5ebafd",
  color3: [0, 128, 255], // RGB array
  dpi: dpiList[0],
  size: "DEFAULT",
  redraw: draw,
  export: save,
  exportPng: savePng,
};

// var customParams = {
//   withRandom: true
// }

setCanvasSize(pageParams.width, pageParams.height);

function draw() {
  ctx.clearRect(0, 0, pageParams.width, pageParams.height);
  ///your draw code here
  console.log("call draw");
}

// redefine in there is multilayer sketch
function save() {
  let data = ctx.getSVG();
  let filenamePadding = "concat-padding.svg";
  let filename = "test2.svg";
  // var resSvg = concatSvg(getSvgData()); // in case of multilayer svg export
  saveSvg(data, filename);
  setTimeout(function () {
    resSvg.setAttribute(
      "style",
      "padding: 20px; padding-left: 20px; border: 1px black solid; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2)"
    );
    saveSvg(resSvg, filenamePadding);
  }, 2000); //to save image with paddings and border to easy caplture node in dev tools
}

function savePng() {
  let data = ctx1.getSVG();
  var resSvg = data.cloneNode("svg");
  resSvg.setAttribute(
    "style",
    "padding: 20px; padding-left: 20px; border: 1px black solid; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2)"
  );
  let filename = "concat.png";
  saveSvgAsPng(resSvg, filename);
}

// in case of multilayer
function getSvgData() {
  return ctxList.map(function (ctxItem) {
    return ctxItem.getSVG();
  });
}

function setCanvasSize(width, height) {
  canvasList.forEach(function (can) {
    can.setAttribute("width", width);
    can.setAttribute("height", height);
  });
}

draw();

///////// GUI init ///////

function dimentionsChangeCb() {
  setCanvasSize(pageParams.width, pageParams.height);
  draw();
}

function setSizeCallback() {
  var newSize = resizePage(
    paperList[pageParams.size],
    canvasList,
    pageParams.dpi
  );
  pageParams.width = newSize[0];
  pageParams.height = newSize[1];
  draw();
}

function initGui() {
  var gui = new dat.gui.GUI();
  gui.remember(pageParams);
  gui
    .add(pageParams, "width")
    .min(50)
    .max(1200)
    .step(1)
    .onFinishChange(dimentionsChangeCb);
  gui
    .add(pageParams, "height")
    .min(50)
    .max(1200)
    .step(1)
    .onFinishChange(dimentionsChangeCb);
  gui.add(pageParams, "left").min(0).step(1).max(100).onFinishChange(draw);

  gui.add(pageParams, "top").min(0).step(1).max(100).onFinishChange(draw);
  gui.add(pageParams, "dpi", dpiList).onFinishChange(draw);
  gui
    .add(pageParams, "size", Object.keys(paperList))
    .onFinishChange(setSizeCallback);
  gui.addColor(pageParams, "color1").onFinishChange(draw);
  gui.addColor(pageParams, "color2").onFinishChange(draw);
  gui.addColor(pageParams, "color3").onFinishChange(draw);
  gui.add(pageParams, "redraw");
  gui.add(pageParams, "export");
  gui.add(pageParams, "exportPng");

  // var folder = gui.addFolder("Custom");
  // folder.add(customParams, "withRandom").onFinishChange(draw);
  // folder
  //   .add(customParams, "randomFillThreshold")
  //   .min(0.05)
  //   .max(1)
  //   .step(0.05)
  //   .onFinishChange(draw);
}

initGui();
