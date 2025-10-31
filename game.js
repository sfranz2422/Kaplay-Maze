kaplay({

  background:[235,245,255]
})

// bean egg spike grass ghosty scoresound

loadSprite("bean", "./sprites/bean.png")
loadSprite("egg", "./sprites/egg.png")
loadSprite("spike", "./sprites/spike.png")
loadSprite("grass", "./sprites/grass.png")
loadSprite("ghosty", "./sprites/ghosty.png")
loadSprite("steel", "./sprites/steel.png")

loadSound("score", "./sounds/score.mp3")

let speed = 480
const enemySpeed = 160;  // Adjust speed as needed

// setGravity(2400)

let levelMap =
 [
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXDXXXXX",
  "X   X X    E        X   X           E     X         X",
  "X XXX X X XXXXX X XXXXX XXXXX XXXXXXXXX XXXXXXX X X X",
  "X     X X X     X   E   X       X               X X X",
  "XXXXX XXX XXXXX X XXXXXXXXXXXXXXXXXXXXXXX XXX XXXXX X",
  "X E   X   X     X       X       E         X     X   X",
  "XXXXX X X XXXXX XXXXXXX XXXXXXXXXXXXX XXXXXXX XXXXXXX",
  "X       X X E   X       X   X   X   X     X     X   X",
  "XXXXXXXXX XXXXXXXXXXXXXXX XXX XXX XXX XXXXXXX X X XXX",
  "X         X             X      E          X   X     X",
  "XXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXXXX XXX XXXXXXX X",
  "X                          E              X     X   X",
  "X XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX X",
  "X     X   X       X   E X   X       X               X",
  "X XXX XXX XXXXXXX X XXXXX XXX XXX X X XXXXXXXXXXX X X",
  "X   X     X             X     X   X X         X   X X",
  "XXXXXXXXX XXXXX XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXX X",
  "X  E      X        E      X         X      E  X     X",
  "XXXXXXXXX XXXXXXXXXXXXX XXXXXXXXX XXXXX XXXXXXXXXXXXX",
  "X   X   X X    E    X X X  E  X   X X   X   X     X X",
  "X X X X X X X X X X X X X XXX X X X XXX X X X X XXX X",
  "X X X X X X X X X X X       X   X X X     X   X   X X",
  "XXX XXX X X XXXXX XXXXX XXXXX XXX X XXXXX XXXXXXX X X",
  "X   X  E  X   X X   X X X     X     X  E      X     X",
  "XXX XXXXX X X X X X X X XXXXXXXXXXX XXXXXXXXXXXXXXX X",
  "X X E X X X X   X X     X  E  X   X X     X   X X X X",
  "X X X X X X XXXXXXXXXXXXX XXX X X X XXX XXXXX X X X X",
  "X X X     X     X  E    X   X   X X X     E         X",
  "X X XXXXX XXXXX XXXXX XXX XXXXXXX X XXXXXXXXX XXX X X",
  "X   X                         X               X   X X",
  "XXXXXXXXXXXXXXXDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "                @                                    "
]
let levelData = {
  tileWidth: 64,
  tileHeight: 64,
  pos:vec2(0,0),
  tiles:{
    "@": () => [
      sprite("bean"),

      // area(),

    area({ shape: new Polygon([
           vec2(5, 5),   // Top-left
            vec2(55, 4),  // Top-right
            vec2(55, 55), // Bottom-right
            vec2(5, 55),  // Bottom-left

        ]) }),

      body(),
      // anchor("bot"),
      "player",
    ],
    "X": ()=> [
      sprite("steel"),
      // rect(),
      area(),
      body({isStatic:true}),
      anchor("bot")
    ],
    "$":() => [
      sprite("egg"),
      area(),
      anchor("bot"),
      "egg"
    ],
    "Y": () => [
      sprite("spike"),
      area(),
      anchor("bot"),
      "danger"
    ],
    "E": () => [
    sprite("ghosty"),  // Use any enemy sprite
  area({ shape: new Polygon([
     vec2(10, 10),
     vec2(54, 10),
     vec2(54, 54),
     vec2(10, 54),
]) }),
    body(),
    // anchor("center"),
    "enemy",
],

  }
} // end of levelData
let level = addLevel(levelMap,levelData)
let player = level.get("player")[0]

// make bean move and jump
// add a game over scene when i fall


onKeyPress("space",spacePressedFunction)
function spacePressedFunction(){
  if (player.isGrounded()){
      player.jump(1000)

  }
}


onKeyDown("left", leftButtonPressed)
function leftButtonPressed(){
  player.move(-speed,0)
}

onKeyDown("right", rightButtonPressed)
function rightButtonPressed(){
  player.move(speed,0)
}

onKeyDown("up", upButtonPressed)
function upButtonPressed(){
  player.move(0,-speed)
}
onKeyDown("down", downButtonPressed)
function downButtonPressed(){
  player.move(0,speed)
}


player.onUpdate(cameraUpdate)
function cameraUpdate(){
  setCamPos(player.worldPos())
}

// onUpdate("enemy", (enemy) => {
//     let dir = player.pos.sub(enemy.pos).unit(); // Direction to player
//     enemy.move(dir.scale(enemySpeed));
// });


// let enemySpeed = 200;
onUpdate("enemy", (enemy) => {
//     let dir = player.pos.sub(enemy.pos).unit(); // Direction to player
//     let nextPos = enemy.pos.add(dir.scale(enemySpeed * dt()));

//     // Check if the next position is inside a wall before moving
//     if (!isCollidingWithWall(nextPos)) {
//         enemy.move(dir.scale(enemySpeed));
//     }

  if (!raycast(enemy.pos,vec2(1,0))){
    enemy.move(vec2(1,0)*enemySpeed)
  }
  else if (!raycast(enemy.pos,vec2(-1,0))){
    enemy.move(vec2(-1,0)*enemySpeed)
  }
    else if (!raycast(enemy.pos,vec2(0,1))){
    enemy.move(vec2(1,1)*enemySpeed)
  }
      else if (!raycast(enemy.pos,vec2(0,-1))){
    enemy.move(vec2(1,1)*enemySpeed)
  }

});

function isCollidingWithWall(pos) {
    return level.get("X").some(wall => wall.area.hasPoint(pos));
}
