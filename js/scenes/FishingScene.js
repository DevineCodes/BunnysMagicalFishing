import Phaser from "phaser";

export default class FishingScene extends Phaser.Scene {

    constructor() {
        super("FishingScene");
    }

    create() {

        this.createBackground();

        this.createClouds();

        this.createWater();

        this.createBoat();

        this.createBunny();

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
        38,
        -78,
        "fishingRod"
    );

    this.rod.setScale(0.20);

    this.rod.setAngle(28);

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


}