class GraphEditor {
	constructor(canvas, graph) {
		this.canvas = canvas;
		this.graph = graph;
		this.ctx = this.canvas.getContext("2d");
		this.selected = null;
		this.hovered = null;
		this.dragging = false;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.addEventListener("mousedown", (event) => {
			if (event.button == 2) {
				// 2 is right click
				if (this.hovered) {
					this.#removePoint(this.hovered);
				} else {
					this.selected = null;
				}
			}
			if (event.button == 0) {
				// 0 is left click
				const mouse = new Point(event.offsetX, event.offsetY);
				if (this.hovered) {
					if (this.selected) {
						this.graph.tryAddSegment(new Segment(this.selected, this.hovered));
					}
					this.selected = this.hovered;
					this.dragging = true;
					return;
				}
				this.graph.addPoint(mouse);
				if (this.selected) {
					this.graph.tryAddSegment(new Segment(this.selected, mouse));
				}
				this.selected = mouse;
				this.hovered = mouse;
			}
		});
		this.canvas.addEventListener("mousemove", (event) => {
			const mouse = new Point(event.offsetX, event.offsetY);
			this.hovered = getNearestPoint(mouse, this.graph.points, 10);
			if (this.dragging) {
				this.selected.x = mouse.x;
				this.selected.y = mouse.y;
			}
		});
		this.canvas.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});
		this.canvas.addEventListener("mouseup", () => {
			this.dragging = false;
		});
	}

	#removePoint(point) {
		this.graph.removePoint(point);
		this.hovered = null;
		if (this.selected === point) {
			this.selected = null;
		}
	}

	display() {
		this.graph.draw(this.ctx);
		if (this.hovered) {
			this.hovered.draw(this.ctx, { fill: true });
		}
		if (this.selected) {
			this.selected.draw(this.ctx, { outline: true });
		}
	}
}
