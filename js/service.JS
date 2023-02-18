

let gMyURL

function getAllImages() {
    let images = [...gImgs]
    images.sort((a, b) => b.id - a.id)
    return images
}


function drawCanvas(imgId) {
    var image = getImageById(imgId);
    console.log('image :>> ', image);
    var x = 0;
    var y = 0;
    gCtx.drawImage(image, x, y, gElCanvas.width, gElCanvas.height);
}





function getImageById(id) {
    for (var i = 0; i < gImgs.length; i++) {
        if (gImgs[i].id === id) {
            return gImgs[i];
        }
    }
    return null; // if no image is found with the given id
}

// var selectedImageId = 3;
// var selectedImage = getImageById(selectedImageId);
// console.log(selectedImage.url); // outputs the URL of the selected image
// console.log(selectedImage); // outputs the URL of the selected image

function getImgUrl() {
    return `imgs/${gMeme.selectedImgId}.jpg`
}



function updateMeme(imgNum) {
    document.querySelector('.app-container').classList.remove('hide')
    document.querySelector('.grid-container').classList.add('hide')
    var currMeme;
    currMeme = gImgs.filter(function (img) {
        return (img.id === imgNum);
    })
    gMeme.selectedImgId = currMeme[0].id;
    gMyURL = ''
    renderCanvas()
}

function getMeme() {
    return gMeme;
}


function getImgText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function updateText(txtFromUser) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txtFromUser
    drawText()
}

function changeFontSize(size) {
    if (size === '+') gMeme.lines[gMeme.selectedLineIdx].size += 2
    else gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function changeTextPos(pos) {
    if (pos === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
    else if (pos === 'up') gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
    else if (pos === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x -= 10
    else if (pos === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x += 10
}

function aling(pos) {
    console.log('aling :>> ', pos);
    if (pos === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x = 60
    if (pos === 'center') gMeme.lines[gMeme.selectedLineIdx].pos.x = 200
    if (pos === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x = 300


    renderCanvas()

}

function addLine() {
    if (gLineNum === 1) {
        newLine = { txt: 'new', size: 45, align: 'left', color: document.querySelector('.color').value, fillColor: document.querySelector('.fillColor').value, pos: { x: 250, y: 250 } }
        gLineNum++
    } else if (gLineNum === 2) {
        newLine = { txt: 'new', size: 45, align: 'left', color: document.querySelector('.color').value, fillColor: document.querySelector('.fillColor').value, pos: { x: 250, y: 300 } }
        gLineNum++
    } else if (gLineNum === 3) {
        return
    }


    gMeme.lines.push(newLine)
    switchLine()
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}


function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, gMeme.selectedLineIdx + 1);
    if (gMeme.selectedLineIdx !== 0) gMeme.selectedLineIdx--
    gLineNum--
    renderCanvas()
}

function changeFilColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
    drawText()
}


function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    drawText()
}
function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}

function filterImgs(imgs) {
    var userSearch = document.getElementById('search').value;
    if (userSearch === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}
function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
    renderCanvas()
    drawText()
}

function showGallery() {
    document.querySelector('.grid-container').classList.remove('hide')
    document.querySelector('.app-container').classList.add('hide')
    document.querySelector('#search').value=''
    renderGallery()
}