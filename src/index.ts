import './style.css';

import SIGL from './pkg';
const canvas = document.querySelector<HTMLCanvasElement>('#gl')!;
const sigl = SIGL({
	canvas,
	extensions: ['OES_texture_float'],
	attributes: { antialias: true },
});
const fbo = sigl.populate.all();
sigl.renderer.blit({ fbo });
