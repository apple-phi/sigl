import type { Regl, Framebuffer2D as Fbo2D, DefaultContext } from 'regl';
import * as Default from './defaults';

export class DoubleBuffer {
	readonly state: [Fbo2D, Fbo2D];
	constructor(readonly regl: Regl, fbo: Fbo2D) {
		this.state = [fbo, null!];
		fbo.use(() => {
			this.state[1] = regl.framebuffer({
				...Default.fboOptions,
				color: regl.texture({ copy: true }),
			});
		});
	}
	previous = ({ tick }: DefaultContext): Fbo2D => this.state[tick % 2];
	current = ({ tick }: DefaultContext): Fbo2D => this.state[(tick + 1) % 2];
}
