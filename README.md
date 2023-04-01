# array-map-parseint-explanation

## Explanation for JavaScript Array map and parseInt problem

In March 2023, JamesQQuick posted a snippet of JavaScript code using the `Array.prototype.map` method and `parseInt` that returned a seemingly incorrect result (https://youtube.com/shorts/dXbR7sGFCMc?feature=share).

The problem is that running `["1", "10", "100"].map(parseInt)` will return `[1, NaN, 4]` instead of `[1, 10, 100]`, but why?

The causes of the problem is explained here with examples. You should have a basic understanding of `Array.prototype.map` and `parseInt`, take a look at the links below to learn more about them.

## Further Reading

- MDN page on `parseInt`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
- MDN page on `Array.prototype.map`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
