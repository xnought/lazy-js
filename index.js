class LazyArray extends Array {
	constructor(data) {
		super(data);
		this.ops = [];
	}
	lmap(func) {
		this.ops.push({ type: "map", func });
		return this;
	}
	lfilter(func) {
		this.ops.push({ type: "filter", func });
		return this;
	}
	levalulate() {
		const newCopy = new LazyArray(0);
		for (let i = 0; i < this[0].length; i++) {
			let d = this[0][i];
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
				newCopy.push(d);
			}
		}
		return newCopy;
	}
	lclear() {
		this.ops = [];
	}
}

const a = new LazyArray([-1, 1, 2, 3]);
const squared = a.lmap((v) => v ** 2);
const sqrt = squared.lmap((v) => Math.sqrt(v));
const even = sqrt.lfilter((v) => v % 2 === 0);
// previous maps and filters aren't run until .evaluate(), and only one copy of memory (in one data iteration!)
console.log(even.levalulate());
