import Phaser from "phaser";
import GameData from "../data/GameData.js";

export default class SellingScene extends Phaser.Scene {

    constructor() {
        super("SellingScene");
    }

    create() {

        this.cameras.main.fadeIn(500, 255, 255, 255);

        this.createBackground();

        this.createTitle();

        this.createCounter();

        this.createFairy();

        this.createBunny();

        this.createCoinDisplay();

        this.time.delayedCall(1000, () => {

            this.startSelling();

        });

    }

    createBackground() {

        this.add.image(
            240,
            400,
            "cloudMarketBackground"
        );

    }

    createTitle() {

        this.add.text(
            240,
            60,
            "☁ Selling Today's Catch ☁",
            {
                fontFamily: "Arial",
                fontSize: "30px",
                fontStyle: "bold",
                color: "#4A3A24"
            }
        ).setOrigin(0.5);

    }

    createCounter() {

        this.add.image(
            240,
            500,
            "marketCounter"
        ).setScale(0.5);

    }

    createFairy() {

        this.fairy = this.add.image(
            110,
            250,
            "fairy"
        );

        this.fairy.setScale(0.18);

        this.tweens.add({

            targets: this.fairy,

            y: 240,

            duration: 1000,

            yoyo: true,

            repeat: -1

        });

    }

    createBunny() {

        this.bunny = this.add.image(
            370,
            510,
            "bunny"
        );

        this.bunny.setScale(0.18);

    }

    createCoinDisplay() {

        this.coinIcon = this.add.image(
            380,
            110,
            "coin"
        );

        this.coinIcon.setScale(0.16);

        this.coinText = this.add.text(

            410,
            95,

            "0",

            {

                fontFamily: "Arial",

                fontSize: "28px",

                color: "#4A3A24",

                fontStyle: "bold"

            }

        );

    }

    startSelling() {

        console.log(GameData.collectedItems);

    }

}