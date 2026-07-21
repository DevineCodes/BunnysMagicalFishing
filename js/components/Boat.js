export default class Boat {

    constructor(scene) {

        this.scene = scene;

    }

    create() {

        this.container = this.scene.add.container(
            240,
            505
        );

        const boat = this.scene.add.image(
            0,
            0,
            "boat"
        );

        boat.setScale(0.28);

        this.container.add(boat);

        this.scene.tweens.add({

            targets: this.container,

            y: 500,

            duration: 1800,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

        return this.container;

    }

}