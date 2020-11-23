var database ,dog,dog1,dog2
var foodS
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
 

  var food = database.ref('Food');
  food.on("value", readfoodS);

  var fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    Lastfeed = data.val();
  })

feed = createButton("FEED DRAGO")
feed.position(500,15)
feed.mousePressed(FeedDog)

add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

}



function draw(){
  background(46,139,87);
 foodobject.display()
 
 
 drawSprites();
  
  fill(255,255,254);
 textSize(15);
if(Lastfeed>=12){
  text("Last Feed : "+Lastfeed%12 + "PM",200,30)
}else{
  text("Last Feed : "+Lastfeed + "AM",200,30)
}
  
 
  //add styles here
}
function readfoodS(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS)
  
}

function writefoodS(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    Food: x
  })

}
function AddFood(){
foodS++
database.ref('/').update({
  Food:foodS
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour()
 })
}
