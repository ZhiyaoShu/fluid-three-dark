precision highp float;

uniform vec2 force; 
uniform vec2 constantForce; // new uniform for constant force
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main() {
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;

    // Add the constant force to the dynamically calculated force
    vec2 totalForce = force * d + constantForce;

    gl_FragColor = vec4(totalForce, 0, 1);
}

