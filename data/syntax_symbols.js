App.register('syntax_symbols', {
    title: 'Syntax Symbols',
    category: 'Manual/Syntax',
    description: `
        <h3>Operators & Symbols</h3>
        <p>Reference guide for all operators and symbols in Kinetix.</p>

        <table class="api-table">
            <tr><th>Symbol</th><th>Name</th><th>Description</th></tr>
            
            <!-- Arithmetic -->
            <tr><td><code>+</code></td><td>Add / Concat</td><td>Addition for numbers, concatenation for strings/lists.</td></tr>
            <tr><td><code>-</code></td><td>Subtract / Negate</td><td>Subtraction or negation.</td></tr>
            <tr><td><code>*</code></td><td>Multiply</td><td>Multiplication.</td></tr>
            <tr><td><code>/</code></td><td>Divide</td><td>Division (standard).</td></tr>
            <tr><td><code>%</code></td><td>Modulo</td><td>Remainder of division.</td></tr>

            <!-- Assignment -->
            <tr><td><code>=</code></td><td>Assign</td><td>Assigns a value to a variable.</td></tr>
            <tr><td><code>+=</code></td><td>Add Assign</td><td>Adds and assigns.</td></tr>
            <tr><td><code>-=</code></td><td>Sub Assign</td><td>Subtracts and assigns.</td></tr>
            <tr><td><code>*=</code></td><td>Mul Assign</td><td>Multiplies and assigns.</td></tr>
            <tr><td><code>/=</code></td><td>Div Assign</td><td>Divides and assigns.</td></tr>

            <!-- Comparison -->
            <tr><td><code>==</code></td><td>Equal</td><td>Value equality check.</td></tr>
            <tr><td><code>!=</code></td><td>Not Equal</td><td>Value inequality check.</td></tr>
            <tr><td><code>&lt;</code></td><td>Less Than</td><td>check if left is smaller.</td></tr>
            <tr><td><code>&gt;</code></td><td>Greater Than</td><td>check if left is larger.</td></tr>
            <tr><td><code>&lt;=</code></td><td>Less or Equal</td><td>...</td></tr>
            <tr><td><code>&gt;=</code></td><td>Greater or Equal</td><td>...</td></tr>

            <!-- Logic -->
            <tr><td><code>&&</code></td><td>And</td><td>Logical AND.</td></tr>
            <tr><td><code>||</code></td><td>Or</td><td>Logical OR.</td></tr>
            <tr><td><code>!</code></td><td>Not</td><td>Logical NOT.</td></tr>

            <!-- Punctuation / Syntax -->
            <tr><td><code>;</code></td><td>Semicolon</td><td>Statement terminator (optional).</td></tr>
            <tr><td><code>:</code></td><td>Colon</td><td>Type annotation separator.</td></tr>
            <tr><td><code>.</code></td><td>Dot</td><td>Member access.</td></tr>
            <tr><td><code>,</code></td><td>Comma</td><td>Separator (args, lists).</td></tr>
            <tr><td><code>-></code></td><td>Arrow</td><td>Return type specifier.</td></tr>
            <tr><td><code>=></code></td><td>Fat Arrow</td><td>Match arm separator.</td></tr>
            <tr><td><code>?</code></td><td>Question</td><td>Optional chaining / Try operator.</td></tr>
            <tr><td><code>::</code></td><td>Double Colon</td><td>Static access / Namespaces.</td></tr>
            <tr><td><code>..</code></td><td>Range</td><td>Range operator (iterators).</td></tr>
            
            <!-- Grouping -->
            <tr><td><code>()</code></td><td>Parentheses</td><td>Grouping expressions, function calls.</td></tr>
            <tr><td><code>[]</code></td><td>Brackets</td><td>List creation, indexing.</td></tr>
            <tr><td><code>{}</code></td><td>Braces</td><td>Code blocks, scopes, object literals.</td></tr>
        </table>
    `
});
