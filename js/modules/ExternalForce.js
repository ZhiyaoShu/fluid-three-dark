import mouse_vert from "./glsl/sim/mouse.vert";
import externalForce_frag from "./glsl/sim/externalForce.frag";
import ShaderPass from "./ShaderPass";
import Mouse from "./Mouse";
import * as THREE from "three";

export default class ExternalForce extends ShaderPass {
    constructor(simProps) {
        super({ output: simProps.dst });
        this.time = 0; // 初始化时间变量
        this.forcePoint = new THREE.Vector2(-0.0, -1.0);
        this.mouseActive = false;
        this.lastMousePosition = new THREE.Vector2(0, 0);
        this.init(simProps);
    }

    init(simProps) {
        super.init();
        const mouseG = new THREE.PlaneBufferGeometry(1, 1);

        const mouseM = new THREE.RawShaderMaterial({
            vertexShader: mouse_vert,
            fragmentShader: externalForce_frag,
            blending: THREE.AdditiveBlending,
            uniforms: {
                px: { value: simProps.cellScale },
                force: { value: new THREE.Vector2(0.0, 0.0) },
                continuousForce: { value: this.forcePoint }, // 使用初始化的力点位置
                center: {  value: this.forcePoint },
                radius: { value: 0.6 },
                scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }
            },
        });

        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
    }

    update(props) {
        this.time += 0.0025;

        const forceX = Mouse.diff.x / 2 * props.mouse_force;
        const forceY = Mouse.diff.y / 2 * props.mouse_force;
        const continuousForceX = - 0.5 * Math.sin(1 * this.time) + 0.8 * Math.sin(0.2 * this.time);
        const continuousForceY = 0.5 * Math.cos(4 * this.time);

        const cursorSizeX = props.cursor_size * props.cellScale.x;
        const cursorSizeY = props.cursor_size * props.cellScale.y;

        if ((forceX !== 0 || forceY !== 0) && Mouse.coords.x >= -1 && Mouse.coords.x <= 1 && Mouse.coords.y >= -1 && Mouse.coords.y <= 1) {
            if (!this.mouseActive) {
                console.log("mouseActive");
            }
            this.mouseActive = true;
            this.lastMousePosition.set(Mouse.coords.x, Mouse.coords.y);
        } else {
            console.log("mouseInactive");
            this.mouseActive = false;
        }

        const centerX = this.mouseActive ?
            Math.min(Math.max(Mouse.coords.x , -1 + cursorSizeX), 1 - cursorSizeX) :
            Math.min(Math.max(this.lastMousePosition.x + continuousForceX, -1 + cursorSizeX), 1 - cursorSizeX);

        const centerY = this.mouseActive ?
            Math.min(Math.max(Mouse.coords.y, -1 + cursorSizeY), 1 - cursorSizeY) :
            Math.min(Math.max(this.lastMousePosition.y + continuousForceY, -1 + cursorSizeY), 1 - cursorSizeY);


        const uniforms = this.mouse.material.uniforms;

        uniforms.force.value.set(forceX, forceY);
        uniforms.continuousForce.value.set(continuousForceX, continuousForceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);

        super.update();
    }

}
