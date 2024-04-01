precision highp float;
uniform sampler2D velocity;
uniform sampler2D velocity_new;
uniform float v;
uniform vec2 px;
uniform float dt;

varying vec2 uv;

void main(){
    // poisson equation
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0, px.y * 2.0)).xy;
 
    float increased_v = v * 0.2; 

    vec2 new = (old + increased_v * dt * (new0 + new1 + new2 + new3)) / (1.0 + 4.0 * increased_v * dt);
    
    gl_FragColor = vec4(new, 0.0, 0.0);
}
