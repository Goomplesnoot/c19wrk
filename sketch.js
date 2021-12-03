var spaceImg, space;
var astoroidImg, astoroid, astoroidGroup;
var starImg , star, starGroup;
var spaceshipImg, spaceship
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload(){
    spaceshipImg = loadImage("spaceship.png")
    astoroidImg = loadImage("asteroid.png")
    starImg = loadImage("star.jpeg")
    spaceImg = loadImage("Space.png")
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300,600,600);
    space.addImage("space",spaceImg);
    space.velocityY = 5;
    astoroidGroup=new Group()
    starGroup=new Group()
    invisibleBlockGroup=new Group()
    spaceship=createSprite(300,300,50,50)
    spaceship.addImage(spaceshipImg)
    spaceship.scale=0.3
}

function draw() {
    background(200);
    if(gameState==="play"){
        if(space.y > 400){
          space.y = 300
        }
        if(keyDown("space")){
          spaceship.velocityY=-5
        }
        ghost.velocityY=ghost.velocityY + 0.5
        if(keyDown("RIGHT_ARROW")){
            spaceship.x += 3
        }
        if(keyDown("LEFT_ARROW")){
            spaceship.x -= 3
        }
        if(astoroidGroup.isTouching(spaceship)){
            ghost.velocityY=0
        }
        if(invisibleBlockGroup.isTouching(spaceship) || spaceship.y > 600){
            ghost.destroy()
            gameState="end"
        }
        spawnAstoroids()
    }
    drawSprites()
    if(gameState ==="end"){
        background(0,0,0)
        stroke("green")
        fill("green")
        textSize(30)
        text("GAME OVER",300,300)
        
      }


}
function spawnAstoroids(){
    if(frameCount % 240 === 0){
        astoroid=createSprite(200,-50)
        astoroid.addImage(astoroidImg)
        astoroid.x=Math.round(random(100,500))
        astoroid.velocityY=1.5
        astoroid.lifetime=600
        astoroidGroup.add(astoroid)
        invisibleBlock=createSprite(200,15)
        invisibleBlock.width=astoroid.width
        invisibleBlock.height=2
        invisibleBlock.x=astoroid.x
        invisibleBlock.velocityY=1.5
        invisibleBlock.lifetime=600
        invisibleBlock.visible=false
        invisibleBlockGroup.add(invisibleBlock)
    }
}
