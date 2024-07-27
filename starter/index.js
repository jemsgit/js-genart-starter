let canvas = document.querySelector("#canvas");

// palettes
// https://github.com/studioyorktown/coloryorktownhall/tree/main
// https://studioyorktown.github.io/coloryorktownhall/

const withRandom = false;
const randomFill = true;

const cellSize = 20;
const padding = 10;

var canvasSVGContext = new CanvasSVG.Deferred();
canvasSVGContext.wrapCanvas(canvas);
var ctx = canvas.getContext("2d");

var canvasList = [canvas];
var ctxList = [ctx];

var pageParams = {
  width: paperList.DEFAULT[0],
  height: paperList.DEFAULT[1],
  forCard: false, // for recording video
  left: 0,
  top: 0,
  color1: "#ffd200", // RGB array
  color2: "#5ec5ee", // RGB array
  color3: "#e51f23", // RGB array
  dpi: dpiList[0],
  size: "DEFAULT",
  lineWidth: 1.5,
  redraw: draw,
  export: save,
  exportPng: savePng,
};

const wrappreId = "canvas-wrapper";

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

function savePng2() {
  let data = ctx1.getSVG();
  var resSvg = data.cloneNode("svg");
  resSvg.setAttribute(
    "style",
    "padding: 20px; padding-left: 20px; border: 1px black solid; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2)"
  );
  let filename = "concat.png";
  saveSvgAsPng(resSvg, filename);
}

// new saving to png (didnt test for multi canvas)
function savePng() {
  let data = ctx.getSVG();
  let width = data.width.baseVal.value;
  let height = data.height.baseVal.value;
  const padding = 30;
  const borderWidth = 1;
  // Create a new SVG element with extra space for padding and border
  const resSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  resSvg.setAttribute("width", width + padding * 2 + borderWidth * 2);
  resSvg.setAttribute("height", height + padding * 2 + borderWidth * 2);
  resSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  // Create a background rectangle with padding and border
  const backgroundRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  backgroundRect.setAttribute("x", 0);
  backgroundRect.setAttribute("y", 0);
  backgroundRect.setAttribute("width", width + padding * 2 + borderWidth * 2);
  backgroundRect.setAttribute("height", height + padding * 2 + borderWidth * 2);
  backgroundRect.setAttribute("fill", "white"); // Optional, set background color
  backgroundRect.setAttribute("stroke", "black");
  backgroundRect.setAttribute("stroke-width", borderWidth);

  // Append the background rectangle to the new SVG
  resSvg.appendChild(backgroundRect);

  // Clone the original SVG content into the new SVG element
  const clonedSvg = data.cloneNode(true);
  clonedSvg.setAttribute("x", padding + borderWidth);
  clonedSvg.setAttribute("y", padding + borderWidth);
  resSvg.appendChild(clonedSvg);
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

function setForCardCb() {
  if (pageParams.forCard) {
    const wrapper = document.getElementById(wrappreId);
    wrapper.style.removeProperty("border");
    wrapper.style.setProperty("padding", "30px");
    const helper = document.getElementById("frame-helper");
    helper.style.setProperty("display", "block");
  } else {
    const wrapper = document.getElementById(wrappreId);
    wrapper.style.setProperty("border", "1px black solid");
    wrapper.style.removeProperty("padding", "30px");
    const helper = document.getElementById("frame-helper");
    helper.style.setProperty("display", "none");
  }
  canvasList.forEach(function (can) {
    can.setAttribute("width", pageParams.width);
    can.setAttribute("height", pageParams.height);
  });
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
  gui.add(pageParams, "lineWidth").min(1).step(0.5).max(8).onFinishChange(draw);

  gui.add(pageParams, "export");
  gui.add(pageParams, "exportPng");
  gui.add(pageParams, "forCard").onFinishChange(setForCardCb);

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
