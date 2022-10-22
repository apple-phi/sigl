import { Regl, Framebuffer2D as Fbo2D, Vec2 } from 'regl';
import * as Default from '../defaults';
import pointVert from './point.vert';
import randomFrag from './random.frag';

export function empty(regl: Regl): Fbo2D {
	return regl.framebuffer({
		...Default.fboOptions,
		color: regl.texture({
			...Default.textureOptions,
			width: regl._gl.drawingBufferWidth,
			height: regl._gl.drawingBufferHeight,
		}),
	});
}

export function all(regl: Regl) {
	const fbo = empty(regl);
	regl({
		...Default.drawConfig,
		frag: randomFrag,
		uniforms: { resolution: Default.resolution },
		framebuffer: fbo,
	})();
	return fbo;
}

export function point(regl: Regl, center: Vec2, size: number) {
	const fbo = empty(regl);
	regl({
		vert: pointVert,
		count: 1,
		primitive: 'points',
		frag: randomFrag,
		attributes: { center },
		uniforms: { size },
		framebuffer: fbo,
	})();
	return fbo;
}

export class Curry {
	constructor(readonly regl: Regl) {}
	empty = () => empty(this.regl);
	all = () => all(this.regl);
	point = (center: Vec2, size: number) => point(this.regl, center, size);
}
