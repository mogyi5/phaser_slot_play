// gameState will keep track of how many correct and incorrect guesses there are
// The counter property keeps track of what number is being guessed 
// The numCoordinates property is used in the helper functions to make sure no coordinates repeat 
const gameState = {
    reel: ["H1", "H2", "J", "K", "K", "J"],
    result: ["A", "A", "K"],

};

const config = {
    type: Phaser.AUTO,
    scale: {
        width: 400,
        height: 280,
        mode: Phaser.Scale.FIT,
    },
    backgroundColor: 'F8B392',
    scene: [GameScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
};

const game = new Phaser.Game(config);