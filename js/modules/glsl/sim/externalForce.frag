precision highp float;

uniform vec2 force;
uniform vec2 continuousForce;
uniform float time;
varying vec2 vUv;

void main() {
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - smoothstep(0.99, 1.0, length(circle));
    d *= d;

    // Apply stronger influence of force on the visual effect
    vec2 combinedForce = force * 0.8 + continuousForce * 0.2;
    gl_FragColor = vec4(combinedForce * d, 0, 1);
}
