precision highp float;

uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
uniform vec2 fboSize;
uniform vec2 px; // Pixel size in texture coordinates
varying vec2 uv;

void main() {
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    vec2 vel = texture2D(velocity, uv).xy;

    if (isBFECC == false) {
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;

        // Simple blur effect
        vec2 blurVel = vec2(0.0);
        int samples = 16; // For a 3x3 kernel
        float blurSize = 10.0 * length(px); // Blur size in texture coordinates

        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                vec2 offset = vec2(float(i), float(j)) * blurSize;
                blurVel += texture2D(velocity, uv + offset).xy;
            }
        }
        blurVel /= float(samples);

        // Mix the original and blurred velocities
        float blurFactor = 2.0; // Adjust for more/less blurring
        vec2 finalVel = mix(newVel, blurVel, blurFactor);

        gl_FragColor = vec4(finalVel, 0.0, 0.0);
    } else {
        // BFECC logic here (unchanged)
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy;

        // Apply blurring to BFECC result as well
        gl_FragColor = vec4(newVel2, 0.0, 0.0); // Consider blurring here as needed
    }
}

