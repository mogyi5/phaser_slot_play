class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create() {


        gameState.reels = this.physics.add.group({ allowGravity: false, });

        for (let i = 0; i < 4; i++) {

            var currentReel = game.add.group();

            for (let j = 0; j < 2; j++) {
                currentReel.add(this.add.rectangle(
                    100 + (i * 60),
                    100 - (i * 60),
                    50,
                    50,
                    0x4d39e0,
                    1,
                ));
            }


            gameState.reels.add(currentReel);

        }
    }


    update() {

        this.input.keyboard.on("keyup-A", () => {

            if (gameState.reels.getChildren()[0].body.velocity.y == 0) {
                for (let i = 0; i < 4; i++) {
                    this.time.delayedCall(i * 200,
                        this.startSpinning, [i],
                        this,
                    )
                }

            } else {
                for (let i = 0; i < 4; i++) {
                    this.time.delayedCall(i * 200,
                        this.stopSpinning, [i],
                        this,
                    )
                }
            }

        });


        // if (gameState.reels.getChildren()[0].body.velocity.y == 0) {
        for (let i = 0; i < 4; i++) {

            let velo = gameState.reels.getChildren()[i].body.velocity.y;
            if (velo > 0) {
                if (velo < 50) {
                    this.increaseVelocity(i, 1.8);
                } else if (velo < 100) {
                    this.increaseVelocity(i, 1.1);
                } else if (velo < 325) {
                    this.increaseVelocity(i, 1.25);
                }
            }


            if (gameState.reels.getChildren()[i].y > 280) {
                gameState.reels.getChildren()[i].y = -50;
            }
        }
        // }




    }

    startSpinning(i) {
        gameState.reels.getChildren()[i].body.velocity.y = 1;
    }

    stopSpinning(i) {
        gameState.reels.getChildren()[i].body.velocity.y = 0;

    }

    increaseVelocity(i, level) {
        gameState.reels.getChildren()[i].body.velocity.y *= level;
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