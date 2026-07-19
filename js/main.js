import Phaser from "phaser";
import HomeScene from "./scenes/HomeScene.js";

const config = {
    type: Phaser.AUTO,

    parent: "game",

    width: 480,
    height: 800,

    backgroundColor: "#E8F8FF",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [HomeScene]
};

new Phaser.Game(config);