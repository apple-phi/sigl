precision lowp float;
uniform sampler2D fbo;
uniform vec2 resolution;
void main() {
    vec2 coord = gl_FragCoord.xy / resolution;
    gl_FragColor = texture2D(fbo, coord);
}

