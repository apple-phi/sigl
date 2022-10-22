precision mediump float;
attribute vec2 center;
uniform float size;
void main() {
	gl_Position = vec4(center, 0., 1.);
    gl_PointSize = size;
}