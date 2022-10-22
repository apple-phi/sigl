import {
	DefaultContext,
	DrawConfig,
	FramebufferOptions,
	MaybeDynamic,
	Texture2DOptions,
} from 'regl';
import screenVert from './screen.vert';
export { screenVert };

/** requires extension `OES_texture_float` */
export const fboOptions: FramebufferOptions = {
	depthStencil: false,
	// stencil: false,
	colorType: 'float',
	colorFormat: 'rgba',
};
export const textureOptions: Texture2DOptions = {
	format: 'rgba',
	type: 'float',
	// wrap: 'repeat',
};
export const drawConfig: DrawConfig = {
	vert: screenVert,
	attributes: {
		vertex: [
			[-1, -1],
			[1, -1],
			[-1, 1],
			[-1, 1],
			[1, -1],
			[1, 1],
		],
	},
	count: 6,
};
export const resolution:
	| MaybeDynamic<number[], DefaultContext, {}>
	| MaybeDynamic<number[], DefaultContext, {}>[] = (ctx) => [
	ctx.drawingBufferWidth,
	ctx.drawingBufferHeight,
];
export const extensions: string[] = ['OES_texture_float'];
