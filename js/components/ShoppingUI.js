import GameData from "../data/GameData.js";

export default class ShoppingUI {

    constructor(scene) {

        this.scene = scene;
        this.shoppingTexts = [];

        this.popupPanel = null;
        this.popupText = null;

    }

    create() {

        const panel = this.scene.add.rectangle(
            240,
            95,
            260,
            140,
            0xFFFFFF,
            0.92
        );

        panel.setStrokeStyle(4, 0x8B6B3F);

        this.scene.add.text(
            240,
            45,
            "🧺 Shopping List",
            {
                fontFamily: "Arial",
                fontSize: "22px",
                fontStyle: "bold",
                color: "#5A3E1B"
            }
        ).setOrigin(0.5);

        GameData.shoppingList.forEach((item, index) => {

            const text = this.scene.add.text(

                120,
                75 + index * 30,

                `${item.emoji} ${item.name}`,

                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    color: "#333333"
                }

            );

            this.shoppingTexts.push(text);

        });

    }

    updateList() {

        GameData.shoppingList.forEach((item, index) => {

            if (
                GameData.collectedItems.includes(item.name)
            ) {

                this.shoppingTexts[index].setText(
                    `✅ ${item.emoji} ${item.name}`
                );

                this.shoppingTexts[index].setColor("#3A9D23");

            }

        });

    }

    showCatchPopup(item, success, message = "", callback = null) {

        // Remove previous popup if one exists
        if (this.popupPanel) {
            this.popupPanel.destroy();
        }

        if (this.popupText) {
            this.popupText.destroy();
        }

        this.popupPanel = this.scene.add.rectangle(
            240,
            250,
            340,
            170,
            0xFFFFFF,
            0.95
        );

        this.popupPanel.setStrokeStyle(
            4,
            success ? 0x4CAF50 : 0xD9534F
        );

        const title = success
            ? "Collected!"
            : message;

        this.popupText = this.scene.add.text(

            240,
            240,

            `${title}\n\n${item.emoji} ${item.name}`,

            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#4A3A24",
                align: "center"
            }

        ).setOrigin(0.5);

        this.scene.time.delayedCall(1500, () => {

            if (this.popupPanel) {
                this.popupPanel.destroy();
                this.popupPanel = null;
            }

            if (this.popupText) {
                this.popupText.destroy();
                this.popupText = null;
            }

            if (callback) {
                callback();
            }

        });

    }

    showWinPopup(callback = null) {

    const panel = this.scene.add.rectangle(
        240,
        400,
        360,
        220,
        0xFFF8CC,
        0.98
    );

    panel.setStrokeStyle(5, 0xFFD700);

    const text = this.scene.add.text(

        240,
        370,

        "🎉\nShopping Complete!\n\nWell Done Luna!",

        {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#4A3A24",
            align: "center"
        }

    ).setOrigin(0.5);

    const button = this.scene.add.rectangle(
        240,
        490,
        180,
        55,
        0x7ED957
    );

    button.setStrokeStyle(3, 0x4A7A2A);

    const buttonText = this.scene.add.text(
        240,
        490,
        "Continue",
        {
            fontFamily: "Arial",
            fontSize: "24px",
            color: "#ffffff",
            fontStyle: "bold"
        }
    ).setOrigin(0.5);

    button.setInteractive({ useHandCursor: true });

    button.on("pointerdown", () => {

        panel.destroy();
        text.destroy();
        button.destroy();
        buttonText.destroy();

        if (callback) {
            callback();
        }

    });

}

}