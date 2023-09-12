function concatSvg(svgList) {
  let fileData = [];
  svgList.forEach((svg, index) => {
    fileData.push(getMainContent(svg, index));
  });
  var resSVG = svgList[0].cloneNode("svg");
  resSVG.innerHTML = fileData.join("");
  return resSVG;
}

function getMainContent(svg, index) {
  return '<g id="' + index + '">' + svg.innerHTML + "</g>";
}
