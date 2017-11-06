var clicker;
var hatchery;
var chickens = [];
var numChickens;
var housing = [];
var GUI;

function setup() {
	createCanvas(400, 400);
	numChickens = 0;
	clicker = new Clicker();
	hatchery = new Hatchery();
	housing.push(new Housing(35, 30));
	housing.push(new Housing(150, 30));
	housing.push(new Housing(265, 30));
	GUI = new GUI();
}

function draw() {
	background(200);
	for (var i = 0; i < housing.length; i++) {
		for (var j = 0; j < chickens.length; j++) {
			if (objectCollision(housing[i], chickens[j])) {
				chickens.splice(j, 1);
				j--;
			}
		}
	}
	clicker.draw();
	for (var i = 0; i < chickens.length; i++) {
		chickens[i].update();
	}
	hatchery.draw();	
	for (var i = 0; i < housing.length; i++) {
		housing[i].draw();
	}
	GUI.draw();
}

function mousePressed() {
	if (collision(mouseX, mouseY, clicker)) {
		clicker.click();
	}
}

function objectCollision(obj1, obj2) {
	//Ensure x and y are aligned with pos
	if (obj1.hasOwnProperty('pos')) {
		obj1.x = obj1.pos.x;
		obj1.y = obj1.pos.y;
	}
	if (obj2.hasOwnProperty('pos')) {
		obj2.x = obj2.pos.x;
		obj2.y = obj2.pos.y;
	}

	return (obj1.x + obj1.width > obj2.x &&
			obj1.x < obj2.x + obj2.width &&
			obj1.y + obj1.height > obj2.y &&
			obj1.y < obj2.y + obj2.height);
}

function collision(x, y, obj) {
	return (x > obj.x &&
			x < obj.x + obj.width &&
			y > obj.y &&
			y < obj.y + obj.height);
}

function spawnChicken() {
	var chicken = new Chicken();
	chickens.push(chicken);
	numChickens++;
}