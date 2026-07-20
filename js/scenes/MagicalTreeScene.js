import Phaser from "phaser";

export default class MagicalTreeScene extends Phaser.Scene {

    constructor() {
        super("MagicalTreeScene");
    }


    create() {

        this.fadeIn();

this.createBackground();

this.createTitle();

this.createHouse();

this.createTree();
this.createSparkles();

this.createBunny();

this.walkToTree();

    }

    fadeIn() {

        this.cameras.main.fadeIn(500, 0, 0, 0);

    }

    createBackground() {

        this.add.image(
            240,
            400,
            "homeBackground"
        );

    }

    createTitle() {

        this.add.text(
            240,
            70,
            "The Magical Tree",
            {
                fontFamily: "Arial",
                fontSize: "34px",
                color: "#2E4A22",
                fontStyle: "bold",
                stroke: "#FFFFFF",
                strokeThickness: 4
            }
        ).setOrigin(0.5);

    }

createTree() {

    this.tree = this.add.image(
        240,
        470,
        "magicalTree"
    );

    this.tree.setScale(0.42);

    this.tweens.add({

        targets: this.tree,

        scaleX: 0.425,
scaleY: 0.415,

        duration: 1500,

        yoyo: true,

        repeat: -1,

        ease: "Sine.easeInOut"

    });

}

    createHouse() {

    this.house = this.add.image(
        70,
        610,
        "bunnyHouse"
    );

    this.house.setScale(0.18);

}

createBunny() {

    this.bunny = this.add.image(
        -80,
        620,
        "bunny"
    );

    this.bunny.setScale(0.22);

}

walkToTree() {

    this.tweens.add({

        targets: this.bunny,

        x: 165,

        duration: 2500,

        ease: "Linear",

        onComplete: () => {

            this.showFairy();

        }

    });

}

showFairy() {

    this.fairy = this.add.image(
        240,
        -100,
        "fairy"
    );

    this.fairy.setScale(0.18);

    this.tweens.add({

        targets: this.fairy,

        y: 220,

        duration: 1500,

        ease: "Sine.easeOut",

        onComplete: () => {

    this.floatFairy();

    this.time.delayedCall(400, () => {

        this.showWelcomeDialogue();

    });

}

    });

}

floatFairy() {

    this.tweens.add({

        targets: this.fairy,

        y: 210,

        duration: 1200,

        yoyo: true,

        repeat: -1,

        ease: "Sine.easeInOut"

    });

    this.tweens.add({

    targets: this.fairy,

    alpha: 0.85,

    duration: 900,

    yoyo: true,

    repeat: -1

});

}

createDialogue(text) {

    // Background panel
    const panel = this.add.rectangle(
        240,
        730,
        420,
        110,
        0xFFFFFF,
        0.95
    );

    panel.setStrokeStyle(4, 0x8B6B3F);

    // Dialogue text
    const dialogue = this.add.text(
        240,
        730,
        text,
        {
            fontFamily: "Arial",
            fontSize: "24px",
            color: "#4A3A24",
            align: "center",
            wordWrap: { width: 360 }
        }
    ).setOrigin(0.5);

    return {
        panel,
        dialogue
    };

}

showWelcomeDialogue() {

    this.dialogue = this.createDialogue(
        "Hello Luna! ✨\nThe clouds are waiting for you."
    );

    this.time.delayedCall(2500, () => {

        this.startBlessing();

    });

}

startBlessing() {

    // Remove dialogue
    this.dialogue.panel.destroy();
    this.dialogue.dialogue.destroy();

    // Fairy speaks
    this.dialogue = this.createDialogue(
        "May your fishing basket be full! 🌟"
    );

    // Bunny glows
    this.tweens.add({

        targets: this.bunny,

        alpha: 0.4,

        duration: 250,

        yoyo: true,

        repeat: 7

    });

    this.tweens.add({

    targets: this.fairy,

    angle: 12,

    duration: 180,

    yoyo: true,

    repeat: 5

});

}

createSparkles() {

    for (let i = 0; i < 12; i++) {

        const sparkle = this.add.circle(
            Phaser.Math.Between(140, 340),
            Phaser.Math.Between(240, 560),
            Phaser.Math.Between(2, 4),
            0xFFF7A8
        );

        sparkle.setAlpha(0);

        this.tweens.add({

            targets: sparkle,

            alpha: 1,

            duration: Phaser.Math.Between(500, 900),

            delay: Phaser.Math.Between(0, 2000),

            y: sparkle.y - Phaser.Math.Between(15, 35),

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }

}

}