precision highp float;
#pragma glslify: random = require('glsl-random')

void main(){
    vec2 seed = gl_FragCoord.xy;
    float r = random(seed);
    float g = random(seed * r); // each call to random must have a different seed
    float b = random(seed * g);
    float a = random(seed * b);
    gl_FragColor = vec4(r, g, b, a);
}