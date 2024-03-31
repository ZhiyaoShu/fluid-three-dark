precision highp float;
uniform sampler2D velocity;
varying vec2 uv;

void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
    vec3 color = mix(vec3(0.0), vec3(vel.x, vel.y, 1.0), len);

    gl_FragColor = vec4(color,  1.0);
}
