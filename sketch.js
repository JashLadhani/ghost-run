var gamestate = play 
var play = 1
var end = 0
var ghost , ghostimage
var tower , towerimage
var climber , climberimage
var door , doorimage

function preload(){
  climberimage = loadImage("climber.png")
  ghostimage = loadImage("ghost-standing.png")
  towerimage = loadImage("tower.png")
  doorimage = loadImage("door.png")
}
function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage(towerimage)
  tower.velocityY = -1
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleblocksgroup = new Group()
  ghost = createSprite(200,200,50,50)
  ghost.scale = 0.3
  ghost.addImage("ghost",ghostimage)
}
function draw (){
  background(0)
  if (gamestate==="play"){
    if (keyDown("leftarrow")){
      ghost.x = ghost.x - 3
    }
  if (keyDown("rightarrow")){
    ghost.x = ghost.x + 3
  }
  if(keyDown("space")){
    ghost.velocityY = -7
  }

ghost.velocityY = ghost.velocityY + 0.8
  
  if (tower.y > 400){
    tower.y = 300
  }
spawnDoors()
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if (invisibleblocksgroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy()
    gamestate = "end"
  }
  
  drawSprites()
}

if (gamestate==="end"){
  stroke("yellow")
  fill("yellow")
  textSize(30)
  text("GameOver",230,250)
}
}
function spawnDoors(){
if (frameCount%240===0){
  var door = createSprite(200,-50)
  var climber = createSprite(200,10)
  var invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.heigth = 2
  door.x = Math.round(random(120,400))
  climber.x = door.x
  invisibleBlock.x = door.x
   door.addImage(doorimage);
    climber.addImage(climberimage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleblocksgroup.debug = true;
    climbersGroup.add(climber);
    invisibleblocksgroup.add(invisibleBlock);
  
}
}