import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        // Background
        this.load.image(
            "homeBackground",
            "images/backgrounds/home_background.png"
        );

        // Bunny
        this.load.image(
            "bunny",
            "images/bunny/bunny_idle.png"
        );

        // House
        this.load.image(
            "bunnyHouse",
            "images/house/bunny_house.png"
        );

        // Play Button
        this.load.image(
            "playButton",
            "images/ui/play_button.png"
        );

        // Magical Tree
        this.load.image(
            "magicalTree",
            "images/tree/magical_tree.png"
        );

        // Fairy
        this.load.image(
            "fairy",
            "images/fairy/fairy_idle.png"
        );

    }

    create() {

        this.scene.start("HomeScene");

    }

}