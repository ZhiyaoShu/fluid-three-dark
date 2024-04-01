import Common from "./Common";
import Output from "./Output";
import Mouse from "./Mouse";

export default class Webgl {
    constructor(props) {
        this.props = props;

        Common.init();
        Mouse.init();

        this.init();
        this.loop();

        window.addEventListener("resize", this.resize.bind(this));

        // Rotation variables
        this.rotationSpeed = 1; // Adjust rotation speed as needed
        this.rotationAngle = 0; // Initial angle
    }

    init() {
        this.props.$wrapper.prepend(Common.renderer.domElement);
        this.output = new Output();
    }

    resize() {
        Common.resize();
        this.output.resize();
    }

    render() {
        Mouse.update();
        Common.update();
        this.output.update();

        // Apply rotation
        this.applyRotation();
    }

    loop() {
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    applyRotation() {
        // Increment the rotation angle
        this.rotationAngle += this.rotationSpeed;

        // Apply the rotation to the scene, camera, or a specific object
        // For example, if rotating the entire output scene:
        this.output.scene.rotation.z = this.rotationAngle;

        // If you need to rotate around a specific point or in a different manner,
        // adjust the transformation applied here accordingly.
    }
}
