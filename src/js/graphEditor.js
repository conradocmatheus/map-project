class GraphEditor {
	constructor(canvas, graph) {
		this.canvas = canvas;
		this.graph = graph;
		this.ctx = this.canvas.getContext("2d");
		this.selected = null;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.addEventListener("mousedown", (event) => {
			const mouse = new Point(event.offsetX, event.offsetY);
			this.graph.addPoint(mouse);
			this.selected = mouse;
		});
	}

	display() {
		this.graph.draw(this.ctx);
		if (this.selected) {
			this.selected.draw(this.ctx, { outline: true });
		}
	}
}
