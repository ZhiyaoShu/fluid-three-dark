precision highp float;

uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0-min(length(circle), 1.0);
    d *= d;
    vec3 deepBlue = vec3(14.0 / 255.0, 36.0 / 255.0, 71.0 / 255.0);
    gl_FragColor = vec4(force * d, 0, 1);
}
