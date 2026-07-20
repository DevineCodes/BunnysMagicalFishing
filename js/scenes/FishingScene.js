import Phaser from "phaser";
import GameData from "../data/GameData.js";
import ITEMS from "../data/items.js";


export default class FishingScene extends Phaser.Scene {

    constructor() {
        super("FishingScene");
    }

    create() {

        this.isFishing = false;

        this.waitingForBite = false;
        this.createBackground();
        this.createShoppingListUI();
        this.createClouds();
        this.createWater();
        this.createBoat();
        this.createBunny();
        this.createFishingLine();
        this.createHook();
    }

    createBackground() {

        this.cameras.main.setBackgroundColor("#BEEBFF");

    }

    createClouds() {

        this.clouds = this.add.image(
            240,
            120,
            "clouds"
        );

        this.clouds.setScale(0.8);

        this.tweens.add({

            targets: this.clouds,

            x: 260,

            duration: 12000,

            yoyo: true,

            repeat: -1,

            ease: "Linear"

        });

    }

    createWater() {

        this.water = this.add.image(
            240,
            640,
            "water"
        );

        this.water.setDisplaySize(480, 320);

        this.water.setInteractive();

        this.water.on("pointerdown", (pointer) => {

    if (!this.isFishing) {

        this.castFishingLine(pointer.x, pointer.y);

    }

    else if (this.waitingForBite) {

        this.reelIn();

    }

});

    }

    reelIn() {

    this.waitingForBite = false;

    const startX = this.boatContainer.x + 82;
    const startY = this.boatContainer.y - 82;

    this.tweens.add({

        targets: this.hook,

        x: startX,

        y: startY,

        duration: 450,

        ease: "Sine.easeIn",

        onUpdate: () => {

            this.lineGraphics.clear();

            this.lineGraphics.lineStyle(
                1,
                0xE8E2D6,
                0.9
            );

            this.lineGraphics.beginPath();

            this.lineGraphics.moveTo(
                startX,
                startY
            );

            this.lineGraphics.lineTo(
                this.hook.x,
                this.hook.y
            );

            this.lineGraphics.strokePath();

        },

        onComplete: () => {

            this.lineGraphics.clear();

            this.hook.setVisible(false);

            this.isFishing = false;

            this.catchRandomItem();

        }

    });

}
catchRandomItem() {

    const item = Phaser.Utils.Array.GetRandom(ITEMS);

    this.showCatchPopup(item);

}

showCatchPopup(item) {

    const panel = this.add.rectangle(
        240,
        250,
        320,
        140,
        0xFFFFFF,
        0.95
    );

    panel.setStrokeStyle(4, 0x8B6B3F);

    const text = this.add.text(

        240,
        250,

        `${item.emoji}\n${item.name}`,

        {

            fontFamily: "Arial",

            fontSize: "30px",

            color: "#4A3A24",

            align: "center"

        }

    ).setOrigin(0.5);

    this.time.delayedCall(1500, () => {

        panel.destroy();

        text.destroy();

    });

}

    castFishingLine(targetX, targetY) {
        if (this.isFishing) {

            return;

        }

        this.isFishing = true;

        this.lineGraphics.clear();

        const startX = this.boatContainer.x + 82;
        const startY = this.boatContainer.y - 82;

        this.hook.setPosition(startX, startY);
        this.hook.setVisible(true);

        this.tweens.add({

            targets: this.hook,

            x: targetX,

            y: targetY,

            duration: 450,

            ease: "Sine.easeOut",

            onUpdate: () => {

                this.lineGraphics.clear();

                this.lineGraphics.lineStyle(
                    1,
                    0xE8E2D6,
                    0.9
                );

                this.lineGraphics.beginPath();

                this.lineGraphics.moveTo(
                    startX,
                    startY
                );

                this.lineGraphics.lineTo(
                    this.hook.x,
                    this.hook.y
                );

                this.lineGraphics.strokePath();

            },

            onComplete: () => {

                this.createSplash(targetX, targetY);

                this.startWaitingForBite();

            }

        });

    }

    createBoat() {

        // Create a container so the boat and bunny move together
        this.boatContainer = this.add.container(
            240,
            505
        );

        const boat = this.add.image(
            0,
            0,
            "boat"
        );

        boat.setScale(0.28);

        this.boatContainer.add(boat);

        // Boat gently bobs on the water
        this.tweens.add({

            targets: this.boatContainer,

            y: 500,

            duration: 1800,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }

    createBunny() {

        const bunny = this.add.image(
            0,
            -60,
            "bunny"
        );

        bunny.setScale(0.18);

        this.boatContainer.add(bunny);

        this.createFishingRod();

    }
    createFishingRod() {

        this.rod = this.add.image(
            95,
            -18,
            "fishingRod"
        );

        this.rod.setScale(0.16);

        this.rod.setAngle(40);

        this.boatContainer.add(this.rod);

        this.tweens.add({

            targets: this.rod,

            angle: 32,

            duration: 1200,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });
    }

    createShoppingListUI() {

        const panel = this.add.rectangle(
            240,
            95,
            260,
            140,
            0xFFFFFF,
            0.92
        );

        panel.setStrokeStyle(4, 0x8B6B3F);

        this.add.text(
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

        const items = GameData.shoppingList;

        let text = "";

        items.forEach(item => {

            text += "• " + item.name + "\n";

        });

        this.add.text(
            150,
            75,
            text,
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#333333",
                lineSpacing: 8
            }
        );

    }

    createFishingLine() {

        this.lineGraphics = this.add.graphics();

    }

    createHook() {

        this.hook = this.add.circle(
            0,
            0,
            4,
            0xCCCCCC
        );

        this.hook.setVisible(false);

    }
    createSplash(x, y) {

        const splash = this.add.circle(
            x,
            y,
            8,
            0xFFFFFF
        );

        splash.setAlpha(0.8);

        this.tweens.add({

            targets: splash,

            scale: 3,

            alpha: 0,

            duration: 350,

            onComplete: () => {

                splash.destroy();

            }

        });

    }

startWaitingForBite() {

    this.waitingForBite = true;

    const waitTime = Phaser.Math.Between(
        1500,
        3500
    );

    this.time.delayedCall(waitTime, () => {

        this.showBite();

    });

}
showBite() {

    this.tweens.add({

        targets: this.hook,

        y: this.hook.y + 8,

        duration: 120,

        yoyo: true,

        repeat: 4,

        onComplete: () => {

            console.log("Fish is biting!");
            this.waitingForBite = true;

        }

    });

}


}