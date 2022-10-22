import { Regl, Framebuffer2D as Fbo2D, DrawCommand } from 'regl';

import transferFboFrag from './transferFbo.frag';
export { transferFboFrag };
import * as Default from '../defaults';

export class Renderer {
	/** Copy an input framebuffer to the current framebuffer */
	blit: DrawCommand;
	constructor(readonly regl: Regl) {
		this.blit = regl({
			...Default.drawConfig,
			frag: transferFboFrag,
			uniforms: {
				fbo: regl.prop<{ fbo: Fbo2D }, 'fbo'>('fbo'),
				resolution: Default.resolution,
			},
		});
	}
}
