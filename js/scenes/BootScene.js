import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        // Background
        this.load.image(
            "homeBackground",
            "images/backgrounds/home_background.png"
        );

        // Bunny
        this.load.image(
            "bunny",
            "images/bunny/bunny_idle.png"
        );

        // House
        this.load.image(
            "bunnyHouse",
            "images/house/bunny_house.png"
        );

        // Play Button
        this.load.image(
            "playButton",
            "images/ui/play_button.png"
        );

        // Magical Tree
        this.load.image(
            "magicalTree",
            "images/tree/magical_tree.png"
        );

        // Fairy
        this.load.image(
            "fairy",
            "images/fairy/fairy_idle.png"
        );

        // Cloud Portal
this.load.image(
    "cloudPortal",
    "images/effects/cloud_portal.png"
);

this.load.image(
    "boat",
    "images/fishing/boat.png"
);

this.load.image(
    "water",
    "images/fishing/water.png"
);

this.load.image(
    "clouds",
    "images/fishing/clouds.png"
);

this.load.image(
    "fishingRod",
    "images/fishing/fishing_rod.png"
);

    }

    create() {

        this.scene.start("HomeScene");

    }

}