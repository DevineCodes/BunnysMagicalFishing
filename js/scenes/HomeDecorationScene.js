import Phaser from "phaser";
import GameData from "../data/GameData.js";

export default class HomeDecorationScene extends Phaser.Scene {

    constructor() {
        super("HomeDecorationScene");
    }

    create() {

        this.cameras.main.fadeIn(500, 255, 255, 255);

        // Background
        this.add.image(
            240,
            400,
            "homeBackground"
        );

        // Tree
        this.add.image(
            330,
            470,
            "magicalTree"
        ).setScale(0.32);

        // House
        this.add.image(
            120,
            610,
            "bunnyHouse"
        ).setScale(0.18);

        // Bunny
        this.add.image(
            220,
            620,
            "bunny"
        ).setScale(0.20);

        this.add.text(

            240,
            60,

            "🏡 Bunny's Home",

            {

                fontFamily: "Arial",
                fontSize: "34px",
                color: "#4A3A24",
                fontStyle: "bold"

            }

        ).setOrigin(0.5);

        this.placeDecorations();

        this.createSleepButton();

    }

    placeDecorations() {

        GameData.ownedDecorations.forEach(decoration => {

            switch (decoration) {

                case "Flower Pot":

                    this.add.text(
                        85,
                        560,
                        "🌷",
                        {
                            fontSize: "42px"
                        }
                    );

                    break;

                case "Chair":

                    this.add.text(
                        250,
                        610,
                        "🪑",
                        {
                            fontSize: "42px"
                        }
                    );

                    break;

                case "Window":

                    this.add.text(
                        140,
                        545,
                        "🪟",
                        {
                            fontSize: "42px"
                        }
                    );

                    break;

                case "Flower Garden":

                    this.add.text(
                        185,
                        690,
                        "🌼",
                        {
                            fontSize: "46px"
                        }
                    );

                    break;

            }

        });

    }

    createSleepButton() {

        const button = this.add.rectangle(

            240,
            740,

            220,
            65,

            0x7ED957

        );

        button.setStrokeStyle(4, 0x4A7A2A);

        const text = this.add.text(

            240,
            740,

            "Sleep",

            {

                fontFamily: "Arial",
                fontSize: "28px",
                color: "#FFFFFF",
                fontStyle: "bold"

            }

        ).setOrigin(0.5);

        button.setInteractive({
            useHandCursor: true
        });

        button.on("pointerdown", () => {

            this.startNextDay();

        });

    }

    startNextDay() {

        GameData.shoppingList = [];
        GameData.collectedItems = [];

        this.cameras.main.fadeOut(500, 0, 0, 0);

        this.time.delayedCall(500, () => {

            this.scene.start("ShoppingListScene");

        });

    }

}