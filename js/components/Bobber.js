export default class Bobber {

    constructor(scene) {

        this.scene = scene;

    }

    create() {

        this.bobber = this.scene.add.image(
            0,
            0,
            "bobber"
        );

        this.bobber.setScale(0.18);

        this.bobber.setVisible(false);

        return this.bobber;

    }

    show(x, y) {

        this.bobber.setPosition(x, y);

        this.bobber.setVisible(true);

    }

    hide() {

        this.bobber.setVisible(false);

    }

    startFloating() {

        this.scene.tweens.add({

            targets: this.bobber,

            y: this.bobber.y - 3,

            duration: 900,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }

    stopFloating() {

        this.scene.tweens.killTweensOf(
            this.bobber
        );

    }

    biteAnimation(callback) {

        this.scene.tweens.add({

            targets: this.bobber,

            y: this.bobber.y + 8,

            angle: 18,

            duration: 120,

            yoyo: true,

            repeat: 4,

            onComplete: callback

        });

    }

}