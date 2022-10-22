import REGL from 'regl';

import * as defaults from './defaults';
import * as populate from './populate';
import * as commands from './commands';
import * as render from './render';

export default function (...args: Parameters<typeof REGL>) {
	const regl = REGL(...args);
	return {
		...regl,
		defaults,
		populate: new populate.Curry(regl),
		renderer: new render.Renderer(regl),
		commands,
	};
}

export { defaults, populate, commands, render };
