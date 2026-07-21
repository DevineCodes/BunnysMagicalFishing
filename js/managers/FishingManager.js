export default class FishingManager {

    constructor(scene) {

        this.scene = scene;

    }

    createFishingLine() {

        this.scene.lineGraphics = this.scene.add.graphics();

    }

    createHook() {

        this.scene.hook = this.scene.add.image(
            0,
            0,
            "bobber"
        );

        this.scene.hook.setScale(0.18);

        this.scene.hook.setVisible(false);

    }

}