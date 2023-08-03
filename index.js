class LazyArray {
	constructor(data) {
		this.data = data;
		this.ops = [];
	}
	map(func) {
		this.ops.push({ type: "map", func });
		return this;
	}
	filter(func) {
		this.ops.push({ type: "filter", func });
		return this;
	}
	evaluate() {
		const newCopy = new LazyArray([]);
		for (let i = 0; i < this.data.length; i++) {
			let d = this.data[i];
			let filtered = false;
			for (let j = 0; j < this.ops.length; j++) {
				if (this.ops[j].type === "filter") {
					// filter
					if (this.ops[j].func(d) === false) {
						filtered = true;
						break;
					}
				} else {
					// map
					d = this.ops[j].func(d);
				}
			}

			if (!filtered) {
				newCopy.data.push(d);
			}
		}
		this.ops = [];
		return newCopy;
	}
}

const a = new LazyArray([-1, 1, 2, 3]);
const doubled = a.map((v) => 2 * v);
const sqrt = doubled.map((v) => Math.sqrt(v));
const even = sqrt.filter((v) => v % 2 === 0);
// previous maps and filters aren't run until .evaluate(), and only one copy of memory (in one data iteration!)
console.log(even.evaluate());
