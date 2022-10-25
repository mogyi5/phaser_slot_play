class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image(
            "platform",
            "https://content.codecademy.com/courses/learn-phaser/physics/platform.png"
        );
    }

    create() {

        gameState.collidingInvisible = this.physics.add.staticGroup();
        gameState.collidingInvisible.create(200, 250, "platform").setScale(1, 0.3).refreshBody();



        for (let reel = 0; reel < gameState.numReels; reel++) {

            let newReel = this.physics.add.group();

            for (let row = 0; row < gameState.numRows; row++) {

                let currentSymbol = this.add.rectangle(
                    100 + (reel * 55),
                    200 - (row * 50),
                    50,
                    50,
                    this.getRandomColor(),
                    1
                );

                newReel.add(currentSymbol);
            }

            gameState.reels.push(newReel);


        }

        console.log(gameState.reels);


        //TODO: fix this so that the reel stops good
        for (let reel = 0; reel < gameState.numReels; reel++) {
            this.physics.add.collider(gameState.reels[reel], gameState.collidingInvisible, (item) => {
                this.stopSpinning2(item);
            });
        }


    }


    update() {

        this.input.keyboard.on("keyup-A", () => {



            if (gameState.reels[0].getChildren()[0].body.velocity.y == 0) {
                for (let reel = 0; reel < gameState.numReels; reel++) {
                    this.time.delayedCall(reel * 200,
                        this.startSpinning, [gameState.reels[reel]],
                        this,
                    )
                }

            } else {
                for (let reel = 0; reel < gameState.numReels; reel++) {
                    this.time.delayedCall(reel * 200,
                        this.stopSpinning, [gameState.reels[reel]],
                        this,
                    )
                }
            }

        });


        for (let reel = 0; reel < gameState.numReels; reel++) {
            if (gameState.reels[reel].getChildren()[0].body.velocity.y != 0) {
                for (let row = 0; row < gameState.numRows; row++) {
                    let velo = gameState.reels[reel].getChildren()[row].body.velocity.y;
                    if (velo > 0) {
                        if (velo < 50) {
                            this.increaseVelocity(reel, row, 1.8);
                        } else if (velo < 100) {
                            this.increaseVelocity(reel, row, 1.1);
                        } else if (velo < 325) {
                            this.increaseVelocity(reel, row, 1.25);
                        }
                    }
                }
            }
        }



        // for (let reel = 0; reel < gameState.numReels; reel++) {
        //     for (let row = 0; row < gameState.numRows; row++) {
        //         this.moveReelTop(gameState.reels[reel].getChildren()[row]);
        //     }
        // }

    }

    moveReelTop(reel) {
        if (reel.y > 280) {
            reel.y = -50;
        }
    }

    startSpinning(reel) {
        console.log("tried to start, omg");
        for (let row = 0; row < gameState.numRows; row++) {
            reel.getChildren()[row].body.velocity.y = 1;
        }

    }

    stopSpinning2(reel) {

        // console.log("tried to stop, omg");
        // console.log(reel);
        // for (let row = 0; row < gameState.numRows; row++) {
        reel.body.velocity.y = 0;
        // }
    }

    stopSpinning(reel) {

        console.log("tried to stop, omg");
        console.log(reel);
        for (let row = 0; row < gameState.numRows; row++) {
            reel.getChildren()[row].body.velocity.y = 0;
        }
    }

    increaseVelocity(reel, row, level) {
        gameState.reels[reel].getChildren()[row].body.velocity.y *= level;
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }















    // // Creates a group we'll use to keep track of boxes
    // gameState.circles = this.add.group();

    // for (let i = 1; i < 10; i++) {
    //     // Uses the provided helper functions to choose random coordinates for the numbers
    //     let randomCoord = this.assignCoords();

    //     // Creates an circle that is completely transparent
    //     let currentCircle = this.add.circle(
    //         randomCoord.x + 10,
    //         randomCoord.y + 15,
    //         20,
    //         0x4d39e0,
    //         0
    //     );

    //     // Displays the number that the circle will cover
    //     currentCircle.text = this.add.text(randomCoord.x, randomCoord.y, i, {
    //         fill: "#4D39E0",
    //         fontSize: "30px",
    //     });

    //     // Assigns a number property to the rectange
    //     currentCircle.number = i;

    //     // Adds the circle to our gameState.circles group
    //     gameState.circles.add(currentCircle);

    //     // Allows for the circle to be clicked
    //     currentCircle.setInteractive();

    //     currentCircle.wrongTween = this.tweens.add({
    //         targets: currentCircle,
    //         paused: true,
    //         scaleX: 1.5,
    //         scaleY: 1.5,
    //         yoyo: true,
    //         duration: 150,
    //     });

    //     // Add the code for tweens below:
    //     this.tweens.add({
    //         targets: currentCircle,
    //         paused: false,
    //         completeDelay: 3000,
    //         onComplete: function() {
    //             currentCircle.fillAlpha = 1;
    //             gameState.textAlert.setText("");
    //             gameState.score.setText(
    //                 `  Correct: ${gameState.correct}\nIncorrect: ${gameState.incorrect}`
    //             );
    //             currentCircle.on("pointerup", () => {
    //                 if (gameState.counter === currentCircle.number) {
    //                     gameState.counter++;
    //                     gameState.correct++;
    //                     currentCircle.destroy();
    //                 } else {
    //                     gameState.incorrect++;
    //                     currentCircle.wrongTween.restart();
    //                 }
    //                 gameState.score.setText(
    //                     `  Correct: ${gameState.correct}\nIncorrect: ${gameState.incorrect}`
    //                 );
    //             });
    //         },
    //     });
    // }

    // // Adds in the starting text for GameScene
    // this.add.rectangle(225, 550, 450, 100, 0xffffff, 0.2);
    // gameState.textAlert = this.add.text(
    //     65,
    //     520,
    //     "Remember the location \n   of the numbers!", { fill: "#4D39E0", fontSize: "25px" }
    // );
    // gameState.score = this.add.text(100, 520, "", {
    //     fill: "#4D39E0",
    //     fontSize: "25px",
    // });
    // }

    // update() {
    //     // if (gameState.circles.getChildren().length === 0) {
    //     //     // Add logic to transition from GameScene to EndScene
    //     //     this.scene.stop("GameScene");
    //     //     this.scene.start("EndScene");
    //     // }
    // }

    // // Helper function to return an object containing evenly spaced x and y coordinates:
    // generateRandomCoords() {
    //     const randomX = Math.floor(Math.random() * 5) * 90 + 25;
    //     const randomY = Math.floor(Math.random() * 5) * 100 + 25;
    //     return { x: randomX, y: randomY };
    // }

    // // Helper function that returns one set of coordinates not in gameState.numCoordinates
    // assignCoords() {
    //     let assignedCoord = this.generateRandomCoords();

    //     // If the coordinates is already in gameState.numCoordinates, then other set of coordinates are generated until there is one not in use
    //     while (gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`]) {
    //         assignedCoord = this.generateRandomCoords();
    //     }

    //     gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`] = true;

    //     return assignedCoord;
    // }
}