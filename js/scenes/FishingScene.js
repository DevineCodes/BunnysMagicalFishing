import Phaser from "phaser";
import GameData from "../data/GameData.js";
import ITEMS from "../data/items.js";
import FishingManager from "../managers/FishingManager.js";
import Boat from "../components/Boat.js";
import Bunny from "../components/Bunny.js";
import FishingRod from "../components/FishingRod.js";
import Bobber from "../components/Bobber.js";
import ShoppingUI from "../components/ShoppingUI.js";

export default class FishingScene extends Phaser.Scene {

    constructor() {
        super("FishingScene");
    }

    create() {

        this.isFishing = false;
        this.waitingForBite = false;
        this.fishingManager = new FishingManager(this);
        this.createBackground();
        this.shoppingUI = new ShoppingUI(this);

this.shoppingUI.create();
        this.createClouds();
        this.createWater();

        const boat = new Boat(this);
this.boatContainer = boat.create();

const bunny = new Bunny(
    this,
    this.boatContainer
);

this.bunny = bunny.create();

this.rod = new FishingRod(
    this,
    this.boatContainer
).create();

        this.lineGraphics =
    this.fishingManager.createFishingLine();
        const bobber = new Bobber(this);

this.bobber = bobber;

this.hook = bobber.create();
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

    // Stop bobber floating animation
    this.tweens.killTweensOf(this.hook);

    const tip = this.rod.getTipPosition();

const startX = tip.x;
const startY = tip.y;

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

            // Remove the fishing line
            this.lineGraphics.clear();

            // Hide bobber
            this.hook.setVisible(false);

            // Reset rotation
            this.hook.setAngle(0);

            // Ready for next cast
            this.isFishing = false;
            this.waitingForBite = false;

            // Catch item
            this.catchRandomItem();

        }

    });

}
    catchRandomItem() {

    const item = Phaser.Utils.Array.GetRandom(ITEMS);

    const needed = GameData.shoppingList.some(
        shoppingItem => shoppingItem.name === item.name
    );

    const alreadyCollected = GameData.collectedItems.includes(
        item.name
    );

    if (!needed) {

        this.shoppingUI.showCatchPopup(

            item,

            false,

            "Not On Today's List!",

            () => {

                this.checkWinCondition();

            }

        );

        return;

    }

    if (alreadyCollected) {

        this.shoppingUI.showCatchPopup(

            item,

            false,

            "Already Collected!",

            () => {

                this.checkWinCondition();

            }

        );

        return;

    }

    // Correct item

    GameData.collectedItems.push(item.name);

    this.shoppingUI.updateList();

    this.shoppingUI.showCatchPopup(

        item,

        true,

        "",

        () => {

            this.checkWinCondition();

        }

    );

}
    checkWinCondition() {

    if (
        GameData.collectedItems.length ===
        GameData.shoppingList.length
    ) {

        this.shoppingUI.showWinPopup(() => {

            this.cameras.main.fadeOut(400, 0, 0, 0);

            this.time.delayedCall(400, () => {

                this.scene.start("CloudMarketScene");

            });

        });

    }

}

    castFishingLine(targetX, targetY) {
        if (this.isFishing) {

            return;

        }

        this.isFishing = true;

        this.lineGraphics.clear();

        const tip = this.rod.getTipPosition();

const startX = tip.x;
const startY = tip.y;

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

    // Stop any previous animation on the bobber
    this.tweens.killTweensOf(this.hook);

    this.waitingForBite = true;

    this.tweens.add({

        targets: this.hook,

        y: this.hook.y + 8,

        angle: 18,

        duration: 120,

        yoyo: true,

        repeat: 4,

        onComplete: () => {

            // Reset bobber angle
            this.hook.setAngle(0);

            // Gentle floating while waiting for player to reel in
            this.tweens.add({

                targets: this.hook,

                y: this.hook.y - 3,

                duration: 900,

                yoyo: true,

                repeat: -1,

                ease: "Sine.easeInOut"

            });

        }

    });

}

}