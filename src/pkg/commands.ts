import { DrawCommand, Regl, Vec2 } from 'regl';

export abstract class Cog {
	commands: DrawCommand[] = [];
	abstract regl: Regl;
	abstract draw: DrawCommand;
	protected addCommand(com: () => DrawCommand): void {
		this.commands.push(com.call(this));
	}
	protected addCommands(...commands: (() => DrawCommand)[]): void {
		commands.forEach(this.addCommand);
	}
	protected drawAllCommands(): void {
		this.commands.forEach(Function.call);
	}
}

export abstract class DynamicCog extends Cog {
	offset: Vec2 = [0, 0];
	paused: boolean = false;
	protected mouseDown: boolean = false;
	protected mouseDrag: boolean = false;
	attachMouseDragTo(elem: HTMLElement): this {
		let x: number, y: number;
		let options = { passive: true };
		elem.addEventListener(
			'mousedown',
			(e) => {
				[x, y] = [e.offsetX, e.offsetY];
				this.mouseDown = true;
				this.mouseDrag = false;
			},
			options
		);
		elem.addEventListener(
			'mousemove',
			(e) => {
				if (this.mouseDown) {
					this.offset[0] -= e.offsetX - x;
					this.offset[1] += e.offsetY - y;
					[x, y] = [e.offsetX, e.offsetY];
				}
				this.mouseDrag = true;
			},
			options
		);
		elem.addEventListener('mouseup', () => (this.mouseDown = false), options);
		return this;
	}
	attachClickPauseTo(elem: HTMLElement): this {
		elem.addEventListener('click', () => {
			if (!this.mouseDrag) {
				this.paused = !this.paused;
			}
		});
		return this;
	}
	attachMouseDrag(): this {
		this.attachMouseDragTo(this.regl._gl.canvas);
		return this;
	}
	attachClickPause(): this {
		this.attachClickPauseTo(this.regl._gl.canvas);
		return this;
	}
}
