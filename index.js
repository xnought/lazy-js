class LazyArray {
	constructor(data) {
		this.data = data;
		this.ops = [];
	}
	map(func) {
		this.ops.push(func);
		return this;
	}
	exec() {
		const newCopy = new LazyArray(new Array(this.data.length));
		for (let i = 0; i < this.data.length; i++) {
			newCopy.data[i] = this.data[i];
			for (let j = 0; j < this.ops.length; j++) {
				newCopy.data[i] = this.ops[j](newCopy.data[i]);
			}
		}
		this.ops = [];
		return newCopy;
	}
}

const a = new LazyArray([1, 2, 3]);
console.log(a);
const output = a
	.map((v) => v * 2)
	.map((v) => v + 5)
	.map((v) => v + 2)
	.map((v) => v + 2)
	.exec();
console.log(output, a);
