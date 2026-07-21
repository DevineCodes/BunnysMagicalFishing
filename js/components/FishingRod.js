export default class FishingRod {

    constructor(scene, boatContainer) {

        this.scene = scene;
        this.boatContainer = boatContainer;

    }

    create() {

        const rod = this.scene.add.image(
            95,
            -18,
            "fishingRod"
        );

        rod.setScale(0.16);

        rod.setAngle(40);

        this.boatContainer.add(rod);

        this.scene.tweens.add({

            targets: rod,

            angle: 32,

            duration: 1200,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

        return rod;

    }

}