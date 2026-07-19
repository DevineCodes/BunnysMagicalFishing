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

        this.load.image(
    "playButton",
    "images/ui/play_button.png"
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
            90,
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

        this.bunny = this.add.image(
    240,
    620,
    "bunny"
);

this.bunny.setScale(0.28);
this.tweens.add({
    targets: this.bunny,
    y: this.bunny.y - 6,
    duration: 1200,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
});

        const playButton = this.add.image(
    240,
    735,
    "playButton"
);

playButton.setScale(0.45);
this.add.text(
    240,
    720,
    "PLAY",
    {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#ffffff",
        fontStyle: "bold",
        stroke: "#5A3E1B",
        strokeThickness: 5
    }
).setOrigin(0.5);

    }

}