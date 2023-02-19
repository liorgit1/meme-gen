'use strict'
var gElCanvas;
var gCtx


function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    renderGallery()
}


function resizeCanvas(img = gMyURL) {
    var elContainer = document.querySelector('.canvas-container');
    if (img) {
        elContainer.style.height = img.height;
        elContainer.style.width = img.width;
    } else {

        let height = elContainer.offsetHeight
        let width = elContainer.offsetWidth

        gElCanvas.height = height;
        gElCanvas.width = width;
    }
}

function renderGallery() {
    let images = getImgsForDisplay()
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


function onUpdateMeme(imgNum) {
    updateMeme(imgNum)
}


function drawText() {
    const currMeme = getMeme()

    const memeText = getImgText()

    currMeme.lines.forEach(function (line) {

        gCtx.lineWidth = '2';
        gCtx.fillStyle = line.fillColor
        gCtx.strokeStyle = line.color
        gCtx.textAlign = 'center';
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y) //img,x,y,xend,yend
    })

}

function onShowGallery() {
    showGallery()
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
    removeLine()
    renderCanvas()
}


function onAling(pos) {
    aling(pos)
}



function onChangeColor(color) {
    changeColor(color)
}

function onChangeFilColor(color) {
    changeFilColor(color)
}


function onSearchImg() {
    renderGallery();
}

function onChangeFont(font) {
    changeFont(font)
}

