/** 
 * In March 2023, JamesQQuick posted a snippet of JavaScript code using the Array.prototype.map method 
 * and parseInt that returned a seemingly incorrect result (https://youtube.com/shorts/dXbR7sGFCMc?feature=share). 
 * Read on to understand why but first, let's understand the problem.
 */

/**
 * PROBLEM STATEMENT: The problem begins with an array containing numbers in string form. The map method is used 
 * to map over every element of the array and passes the parseInt function as the callback. In other words, the map
 * method executes the callback function on each element of the array that it was called on and returns the results
 * as a new array. Normally, we would expect a new array to be logged to console that contains the number versions of 
 * the strings that were in the original array but that's not what we get here (see Example 1 below).
 */

const numberStrings = ["1", "10", "100"]

// Example 1
console.log(numberStrings.map(parseInt));  // Expected: [1, 10, 100]
                                           // Actual: [1, NaN, 4]

// Example 2
console.log(numberStrings.map((value) => parseInt(value))) // But this works fine and returns [1, 10, 100] but we'll
                                                           // come back to this example later

/**
 * The array that gets logged to console is very different than what is expected. The reason requires an 
 * understanding of the map method, parseInt, and how they interact in this situation. The map method actually
 * passes 3 arguments to its callback: the current array element, the current index, and a reference to the array 
 * that the map method was called on. So in Example 1 above, map is passing more than just the current string element 
 * to the parseInt function. The arguments passed to parseInt for each element in Example 1 actually looks like this:
 */

parseInt("1", 0, numberStrings); // 1st element
parseInt("10", 1, numberStrings); // 2nd element
parseInt("100", 2, numberStrings); // 3rd element

/**
 * The parseInt function accepts 2 arguments: the string to be parsed into an integer, and the radix or base of
 * the number in the string. If provided, parseInt expects the radix to be an integer between 2 and 36 inclusive and 
 * when the value provided is outside of that range, then special rules apply. When the value is 0 or is not 
 * provided, the radix will depend on the value of the string passed in as the first argument. In many cases 
 * (but not all), the radix will be 10. When the provided radix is outside of the allowed range and is not 0, 
 * then parseInt will always return NaN.
 * 
 * Now we can understand the cause of the problem. Because the map method is passing the index number to 
 * parseInt as well, the parseInt function treats that index number as the radix of the string to be parsed.
 * This is how parseInt interprets the arguments that it receives for each element (it ignores the third argument
 * which is not used by parseInt):
 */

parseInt("1", 0, numberStrings); // 1st element: radix argument is 0, so parseInt defaults to radix 10 instead 
                                 // and returns 1

parseInt("10", 1, numberStrings); // 2nd element: radix argument is 1, so parseInt return NaN

parseInt("100", 2, numberStrings); // 3rd element: radix argument is 2, so parseInt treats "100" as a base 2 number 
                                   // and returns 4

/** 
 * This also explains why wrapping parseInt in another function, like in Example 2 above, and then passing it to the 
 * map method as the callback will produce the expected results. Let's look at Example 2 again:
 */

numberStrings.map((value) => parseInt(value)) // This works because the callback is an arrow function that only
                                              // passes the string number into parseInt without any radix argument
                                              // and returns the results. This allows parseInt to determine the 
                                              // appropriate radix based on its own rules and in this case, it will 
                                              // use radix 10 and that aligns with our expectations.