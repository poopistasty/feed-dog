var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var feedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  textSize(30);
  foodObj.display();
feedTime=database.ref("FeedTime")
feedTime.on("value",function(data){
  lastFed=data.val();
})
  //write code to read fedtime value from the database 
  if(lastFed>=12){
    text("last fed: "+lastFed%12+"PM",350,30)
  }
  else if(lastFed===0){
    text("Last fed: 12 AM",370,30)
  }
  else{
    text("last fed: "+lastFed+"AM",390,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStock=foodObj.getFoodStock()
  if(foodStock<=0){
    foodObj.updateFoodStock(foodStock*0)
  }
  else{
    foodObj.updateFoodStock(foodStock-1)
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
