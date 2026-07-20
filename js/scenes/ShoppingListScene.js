import Phaser from "phaser";
import ITEMS from "../data/items.js";
import GameData from "../data/GameData.js";

export default class ShoppingListScene extends Phaser.Scene {

    constructor() {
        super("ShoppingListScene");
    }

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);

        this.cameras.main.setBackgroundColor("#BDEBFF");

        // Title
        this.add.text(
            240,
            100,
            "Today's Shopping List",
            {
                fontFamily: "Arial",
                fontSize: "34px",
                color: "#4A2E16",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // Pick 3 random unique items
        const shoppingList = Phaser.Utils.Array.Shuffle([...ITEMS]).slice(0, 3);
        GameData.shoppingList = shoppingList;

        // Build the display text
        let listText = "";

        shoppingList.forEach(item => {
            listText += `${item.emoji} ${item.name}\n\n`;
        });

        // Show the list
        this.add.text(
            240,
            280,
            listText,
            {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#333333",
                align: "center"
            }
        ).setOrigin(0.5);

        // Start Journey Button
const startButton = this.add.rectangle(
    240,
    650,
    240,
    70,
    0x7ED957,
    1
);

startButton.setStrokeStyle(4, 0x4A7A2A);

const startText = this.add.text(
    240,
    650,
    "Start Journey",
    {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#ffffff",
        fontStyle: "bold"
    }
).setOrigin(0.5);

// Make button interactive
startButton.setInteractive({ useHandCursor: true });

startButton.on("pointerover", () => {

    this.tweens.add({
        targets: [startButton, startText],
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 120
    });

});

startButton.on("pointerout", () => {

    this.tweens.add({
        targets: [startButton, startText],
        scaleX: 1,
        scaleY: 1,
        duration: 120
    });

});

startButton.on("pointerdown", () => {

    this.tweens.add({
        targets: [startButton, startText],
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 80,
        yoyo: true,
        onComplete: () => {

            this.cameras.main.fadeOut(400, 0, 0, 0);

this.time.delayedCall(400, () => {

    this.scene.start("MagicalTreeScene");

});

        }
    });

});

    }
    

}