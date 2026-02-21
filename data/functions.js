App.register('functions_global', {
    title: 'Global Functions',
    category: 'Manual/Functions',
    description: 'Core functions available in the global scope without importing any module.',
    methods: [
        { name: 'println', ret: 'void', params: '(varargs)', desc: 'Prints values to stdout with newline.', example: 'println("Hello", 42, true)', implemented: 'v0.0.1 (1)' },
        { name: 'input', ret: 'String', params: '(prompt: String)', desc: 'Reads a line from stdin.', example: 'let name = input("Enter name: ")', implemented: 'v0.0.1 (1)' },
        { name: 'len', ret: 'int', params: '(container: Any)', desc: 'Returns the length of a list, string, or map.', example: 'len([1, 2, 3]) // 3', implemented: 'v0.0.1 (1)' },
        { name: 'typeof', ret: 'String', params: '(val: Any)', desc: 'Returns the type name of a value.', example: 'typeof("text") // "String"', implemented: 'v0.0.1 (1)' },
        { name: 'assert', ret: 'void', params: '(cond: bool, msg: String)', desc: 'Aborts execution if condition is false.', example: 'assert(x > 0, "x must be positive")', implemented: 'v0.0.1 (1)' },
        { name: 'copy', ret: 'Any', params: '(val: Any)', desc: 'Deep copies a value.', example: 'let dup = copy(original)', implemented: 'v0.0.1 (1)' },
        { name: 'stop', ret: 'void', params: '(code: int = 0)', desc: 'Terminates execution immediately. Alias: exit', example: 'stop(1)', implemented: 'v0.0.1 (1)' },
        { name: 'exit', ret: 'void', params: '(code: int = 0)', desc: 'Terminates execution immediately. Alias: stop', example: 'exit(0)', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('functions_iter', {
    title: 'Iteration & sequence',
    category: 'Manual/Functions',
    description: 'Functions for traversing and manipulating sequences.',
    example: `// Range
for i in range(5) { println(i) }

// Zip
for (name, score) in zip(names, scores) {
    println(f"{name}: {score}")
}`,
    methods: [
        { name: 'range', ret: 'Iterator', params: '(start: int, end: int, step: int = 1)', desc: 'Generates a sequence of numbers.', example: 'range(0, 10, 2) // 0, 2, 4, 6, 8', implemented: 'v0.0.1 (1)' },
        { name: 'enumerate', ret: 'Iterator', params: '(seq: Sequence)', desc: 'Yields (index, value) pairs.', example: 'for (i, v) in enumerate(list) { ... }', implemented: 'v0.0.1 (1)' },
        { name: 'zip', ret: 'Iterator', params: '(a: Sequence, b: Sequence)', desc: 'Combines two sequences into pairs.', example: 'for (a, b) in zip(list1, list2) { ... }', implemented: 'v0.0.1 (1)' },
        { name: 'map', ret: 'List', params: '(seq: Sequence, fn: Function)', desc: 'Applies function to all elements.', example: 'map(nums, fn(x) { return x * 2 })', implemented: 'v0.0.1 (1)' },
        { name: 'filter', ret: 'List', params: '(seq: Sequence, fn: Function)', desc: 'Keeps elements where function returns true.', example: 'filter(nums, fn(x) { return x > 10 })', implemented: 'v0.0.1 (1)' },
        { name: 'reduce', ret: 'Any', params: '(seq: Sequence, fn: Function, init: Any)', desc: 'Reduces sequence to single value.', example: 'reduce(nums, fn(acc, x) { return acc + x }, 0)', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('functions_string', {
    title: 'String Utils',
    category: 'Manual/Functions',
    description: 'Helper functions for String manipulation.',
    methods: [
        { name: 'to_upper', ret: 'String', params: '(s: String)', desc: 'Converts string to uppercase.', example: 'to_upper("hello") // "HELLO"', implemented: 'v0.0.1 (1)' },
        { name: 'to_lower', ret: 'String', params: '(s: String)', desc: 'Converts string to lowercase.', example: 'to_lower("HELLO") // "hello"', implemented: 'v0.0.1 (1)' },
        { name: 'trim', ret: 'String', params: '(s: String)', desc: 'Removes whitespace from both ends.', example: 'trim("  hi  ") // "hi"', implemented: 'v0.0.1 (1)' },
        { name: 'split', ret: 'List<String>', params: '(s: String, delim: String)', desc: 'Splits string by delimiter.', example: 'split("a,b,c", ",") // ["a", "b", "c"]', implemented: 'v0.0.1 (1)' },
        { name: 'replace', ret: 'String', params: '(s: String, old: String, new: String)', desc: 'Replaces all occurrences of standard substring.', example: 'replace("foobar", "foo", "baz")', implemented: 'v0.0.1 (1)' },
        { name: 'contains', ret: 'bool', params: '(s: String, sub: String)', desc: 'Checks if string contains substring.', example: 'contains("hello", "ell") // true', implemented: 'v0.0.1 (1)' },
        { name: 'starts_with', ret: 'bool', params: '(s: String, prefix: String)', desc: 'Checks if string starts with prefix.', example: 'starts_with("img_01", "img_")', implemented: 'v0.0.1 (1)' },
        { name: 'ends_with', ret: 'bool', params: '(s: String, suffix: String)', desc: 'Checks if string ends with suffix.', example: 'ends_with("file.txt", ".txt")', implemented: 'v0.0.1 (1)' },
        { name: 'pad_left', ret: 'String', params: '(s: String, len: int, char: String = " ")', desc: 'Pads string on the left.', example: 'pad_left("42", 4, "0") // "0042"', implemented: 'v0.0.1 (1)' },
        { name: 'pad_right', ret: 'String', params: '(s: String, len: int, char: String = " ")', desc: 'Pads string on the right.', example: 'pad_right("Item", 10, ".") // "Item......"', implemented: 'v0.0.1 (1)' },
        { name: 'join', ret: 'String', params: '(list: List<String>, sep: String)', desc: 'Joins list elements with separator.', example: 'join(["a", "b"], "-") // "a-b"', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('functions_list', {
    title: 'List Utils',
    category: 'Manual/Functions',
    description: 'Common operations for Lists and Sequences.',
    methods: [
        { name: 'push', ret: 'void', params: '(list: List, val: Any)', desc: 'Appends value to list.', example: 'push(list, 10)', implemented: 'v0.0.1 (1)' },
        { name: 'pop', ret: 'Any', params: '(list: List)', desc: 'Removes and returns last element.', example: 'let last = pop(list)', implemented: 'v0.0.1 (1)' },
        { name: 'remove_at', ret: 'void', params: '(list: List, index: int)', desc: 'Removes element at index.', example: 'remove_at(list, 0)', implemented: 'v0.0.1 (1)' },
        { name: 'insert', ret: 'void', params: '(list: List, index: int, val: Any)', desc: 'Inserts value at index.', example: 'insert(list, 1, "val")', implemented: 'v0.0.1 (1)' },
        { name: 'reverse', ret: 'List', params: '(list: List)', desc: 'Returns a new reversed list.', example: 'reverse([1, 2, 3]) // [3, 2, 1]', implemented: 'v0.0.1 (1)' },
        { name: 'sort', ret: 'List', params: '(list: List)', desc: 'Returns a new sorted list.', example: 'sort([3, 1, 2]) // [1, 2, 3]', implemented: 'v0.0.1 (1)' },
        { name: 'min', ret: 'Any', params: '(seq: Sequence)', desc: 'Returns minimum value.', example: 'min([10, 5, 20]) // 5', implemented: 'v0.0.1 (1)' },
        { name: 'max', ret: 'Any', params: '(seq: Sequence)', desc: 'Returns maximum value.', example: 'max([10, 5, 20]) // 20', implemented: 'v0.0.1 (1)' },
        { name: 'contains', ret: 'bool', params: '(list: List, val: Any)', desc: 'Checks if list contains a value.', example: 'contains([1, 2], 1) // true', implemented: 'v0.0.1 (1)' },
        { name: 'any', ret: 'bool', params: '(seq: Sequence, fn: Function)', desc: 'True if any element matches predicate.', example: 'any(nums, fn(x) { return x > 0 })', implemented: 'v0.0.1 (1)' },
        { name: 'all', ret: 'bool', params: '(seq: Sequence, fn: Function)', desc: 'True if all elements match predicate.', example: 'all(nums, fn(x) { return x > 0 })', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('functions_conv', {
    title: 'Type Conversion',
    category: 'Manual/Functions',
    description: 'Safe casting and conversion between primitive types.',
    methods: [
        { name: 'int', ret: 'int', params: '(val: Any)', desc: 'Converts float/string to integer.', example: 'int("123") // 123', implemented: 'v0.0.1 (1)' },
        { name: 'float', ret: 'float', params: '(val: Any)', desc: 'Converts int/string to float.', example: 'float("3.14") // 3.14', implemented: 'v0.0.1 (1)' },
        { name: 'str', ret: 'String', params: '(val: Any)', desc: 'Converts any value to string representation.', example: 'str(123) // "123"', implemented: 'v0.0.1 (1)' },
        { name: 'bool', ret: 'bool', params: '(val: Any)', desc: 'Converts to boolean (truthy/falsy check).', example: 'bool(1) // true', implemented: 'v0.0.1 (1)' },
        { name: 'byte', ret: 'byte', params: '(val: int)', desc: 'Casts to 8-bit unsigned integer.', example: 'byte(255)', implemented: 'v0.0.1 (1)' },
        { name: 'char', ret: 'char', params: '(code: int)', desc: 'Converts integer code point to char.', example: 'char(65) // "A"', implemented: 'v0.0.1 (1)' }
    ]
});
