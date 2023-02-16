'use strict'
var gElCanvas;
var gCtx
const fileInput = document.getElementById('file-input');

function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    renderGallery()
}



function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    let height = elContainer.offsetHeight
    let width = elContainer.offsetWidth

    gElCanvas.height = height;
    gElCanvas.width = width;
}

function renderGallery() {
    let images = getAllImages()
    console.log('images :>> ', images);
    let strHtml = images.map(function (img) {
        return `
        <a href="#">
        <img onclick="onUpdateMeme(${img.id})" id="${img.id}" src="${img.url}"></a>
        `
    })

    let elGallery = document.querySelector('.grid-container')
    elGallery.innerHTML = strHtml.join('')
}


function renderCanvas(imgStartX = 0, imgStartY = 0, imgUrl = getImgUrl() || gMyURL) {
    var img = new Image()
    if (gMyURL) imgUrl = gMyURL


    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, imgStartX, imgStartY, 500, 500)
        drawText()
    }

}



function updateMeme(imgNum) {
    var currMeme;
    currMeme = gImgs.filter(function (img) {
        return (img.id === imgNum);
    })
    gMeme.selectedImgId = currMeme[0].id;
    renderCanvas()
}

function drawText() {
    const currMeme = getMeme()

    const memeText = getImgText()

    currMeme.lines.forEach(function (line) {

        gCtx.lineWidth = '2';
        gCtx.fillStyle = 'white';
        gCtx.textAlign = 'center';
        gCtx.font = `${line.size}px Impact`;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y); //img,x,y,xend,yend
    })

}




function setMemeText() {
    var givenText = document.querySelector('#text').value;
    updateText(givenText)
    renderCanvas()
}

function onChangeFontSize(size) {
    changeFontSize(size)
    renderCanvas()
}


function onChangeTextPos(pos) {
    changeTextPos(pos);
    renderCanvas();

}
function onAddNewLine() {
    addLine();
    renderCanvas();

}

function onSwichLine() {
    switchLine()
}


function onRemoveLine() {
    if (gMeme.lines.length === 1) return;
    removeLine()
    renderCanvas()


}


function onAling(pos) {
    aling(pos)





}



