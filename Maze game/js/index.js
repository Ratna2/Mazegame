var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var maze, draw, player;
var cellSize;
var difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function () {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
        ctx.canvas.width = viewHeight - (viewHeight / 100);
        ctx.canvas.height = viewHeight - (viewHeight / 100);
    } else {
        ctx.canvas.width = viewWidth - (viewWidth / 100);
        ctx.canvas.height = viewWidth - (viewWidth / 100);
    }

    //Load and edit sprites
    sprite = new Image();
    sprite.src = "/media/sprite.png";
    sprite.onload = function () {
        sprite = changeBrightness(1.20, sprite);
    };
    finishSprite = new Image();
    finishSprite.src = "/media/finishSprite.png";
    finishSprite.onload = function () {
        finishSprite = changeBrightness(1.10, finishSprite);
    };

};

window.onresize = function () {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
        ctx.canvas.width = viewHeight - (viewHeight / 100);
        ctx.canvas.height = viewHeight - (viewHeight / 100);
    } else {
        ctx.canvas.width = viewWidth - (viewWidth / 100);
        ctx.canvas.height = viewWidth - (viewWidth / 100);
    }
    cellSize = mazeCanvas.width / difficulty;
    if (player != null) {
        draw.redrawMaze(cellSize);
        player.redrawPlayer(cellSize);
    }
};


function makeMaze() {
    //document.getElementById("mazeCanvas").classList.add("border");
    if (player != undefined) {
        player.unbindKeyDown();
        player = null;
    }
    var e = document.getElementById("diffSelect");
    difficulty = e.options[e.selectedIndex].value;
    cellSize = mazeCanvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);
    draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
    if (document.getElementById("mazeContainer").style.opacity < "100") {
        document.getElementById("mazeContainer").style.opacity = "100";
    }
}