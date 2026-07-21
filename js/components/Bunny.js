export default class Bunny {

    constructor(scene, boatContainer) {

        this.scene = scene;
        this.boatContainer = boatContainer;

    }

    create() {

        const bunny = this.scene.add.image(
            0,
            -60,
            "bunny"
        );

        bunny.setScale(0.18);

        this.boatContainer.add(bunny);

        return bunny;

    }

}