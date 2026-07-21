import Phaser from "phaser";

import LoadingScene from "./scenes/LoadingScene.js";
import HomeScene from "./scenes/HomeScene.js";
import ShoppingListScene from "./scenes/ShoppingListScene.js";
import MagicalTreeScene from "./scenes/MagicalTreeScene.js";
import FishingScene from "./scenes/FishingScene.js";

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

    scene: [
        LoadingScene,
        HomeScene,
        ShoppingListScene,
        MagicalTreeScene,
        FishingScene
    ]

};

new Phaser.Game(config);