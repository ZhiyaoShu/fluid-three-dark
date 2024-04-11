precision highp float;
uniform sampler2D velocity;
varying vec2 uv;

void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.2 + 0.2;
    
    vec3 color = mix(vec3(0.0), vec3(0, vel.y, 1), len);

    gl_FragColor = vec4(color,  1.0);
}

// precision highp float;
// uniform sampler2D velocity;
// varying vec2 uv;
// uniform float time;


// void main(){
//     vec2 vel = texture2D(velocity, uv).xy;
//     float len = length(vel);
//     vel = vel * 0.5 + 0.5;
//     // len = clamp(len, 0.0, 1.0);

    
//     float blueIntensity = len * 0.5 + 0.5; 

//     vec3 velocityColor = vec3(0.0, 0.0, blueIntensity);
//     // float randomFactor = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 437599.5453);
//     // vec3 velocityColor = vec3(0.0, 0.0, len * randomFactor);
    
//     vec3 color = mix(vec3(0.0), velocityColor, len);
    
//     gl_FragColor = vec4(color,  1.0);
// }