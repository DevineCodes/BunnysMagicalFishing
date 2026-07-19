import Phaser from "phaser";

export default class HomeScene extends Phaser.Scene {

    constructor() {
        super("HomeScene");
    }

    preload() {

        this.load.image(
    "homeBackground",
    "images/backgrounds/home_background.png"
);

this.load.image(
    "bunnyHouse",
    "images/house/bunny_house.png"
);

        this.load.image(
            "bunny",
            "images/bunny/bunny_idle.png"
        );

    }

    create() {

        this.add.image(
    240,
    400,
    "homeBackground"
);

const house = this.add.image(
    240,
    500,
    "bunnyHouse"
);

house.setScale(0.45);

        this.add.text(
            240,
            60,
            "Bunny's Magical Fishing",
            {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "#ffffff",
                fontStyle: "bold",
                stroke: "#4A4A4A",
                strokeThickness: 6
            }
        ).setOrigin(0.5);

        const bunny = this.add.image(
            240,
            620,
            "bunny"
        );

        bunny.setScale(0.28);

    }

}