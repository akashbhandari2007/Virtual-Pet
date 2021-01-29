var dog, dogImg, happyDogImg, database, food , foodStock;

function preload()
{
  domImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg");

}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {  
background("green");
if(food!== undefined){
  textSize(20);
  fill(255);
  text("Note: Press Up Arrow to feed Drago milk", 50,50);
  text("Food Remaining: "+foood, 150,150);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(food === 0){
    food = 20;
  }

  drawSprites();
}  
}

function writeStock(x){
  if(x<=0){
    x= 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food:x
  });

}

function readStock(data){
  food = data.val();
}

