# lazy-js

Instead of `.map()` and `.filter()` being computed on each call, lazily save them and apply them all at the same time when you need the values.

So now we just do one iteration over the data with one data copy.

Just prefix with `l` for lazy and run `.levaluate()` when you want the values to be computed.

```js
const a = new LazyArray([-1, 1, 2, 3]);
const squared = a.lmap((v) => v ** 2);
const sqrt = squared.lmap((v) => Math.sqrt(v));
const even = sqrt.lfilter((v) => v % 2 === 0);
// previous maps and filters aren't run until .evaluate(), and only one copy of memory (in one data iteration!)
console.log(even.levalulate());
// [2]
```
