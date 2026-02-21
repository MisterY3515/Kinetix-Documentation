App.register('graph', {
    title: 'Graph',
    category: 'Libraries/Multimedia',
    description: '<p>The <strong>Graph</strong> module is an immediate-mode UI toolkit and 2D renderer. It provides native window management, interactive widgets (buttons, sliders, text inputs), and plotting capabilities — all from Kinetix code.</p><p>The rendering is hardware-accelerated and supports themes, complex layouts with <code>vbox</code>/<code>hbox</code> containers, and pixel-level drawing for custom graphics.</p>',
    example: `graph.window("Control Panel", 300, 500) {
    graph.vbox() {
        if graph.button("Save Settings") {
             save_config()
        }
        graph.slider("Volume", volume_ref, 0, 100)
        graph.checkbox("Dark Mode", dark_mode_ref)
    }
}`,
    methods: [
        // Windows & Layouts
        { name: 'window', ret: 'Window', params: '(title: String, width: int, height: int)', desc: 'Creates a window.', example: 'graph.window("Main", 800, 600)', status: 'Implemented' },
        { name: 'vbox', ret: 'Layout', params: '(padding: int = 5)', desc: 'Vertical layout.', example: 'graph.vbox(10) { ... }', status: 'Not Implemented' },
        { name: 'hbox', ret: 'Layout', params: '(padding: int = 5)', desc: 'Horizontal layout.', example: 'graph.hbox(5) { ... }', status: 'Not Implemented' },
        { name: 'grid', ret: 'Layout', params: '(cols: int)', desc: 'Grid layout.', example: 'graph.grid(3) { ... }', status: 'Not Implemented' },
        { name: 'scroll', ret: 'Layout', params: '()', desc: 'Scrollable container.', example: 'graph.scroll() { ... }', status: 'Not Implemented' },

        // Widgets
        { name: 'clear', ret: 'void', params: '(color: int)', desc: 'Clears the screen.', example: 'graph.clear(0x000000)', status: 'Implemented' },
        { name: 'label', ret: 'void', params: '(text: String)', desc: 'Text label.', example: 'graph.label("Welcome!")', status: 'Implemented' },
        { name: 'button', ret: 'bool', params: '(text: String)', desc: 'Clickable button. Returns true on click.', example: 'if graph.button("Submit") { send() }', status: 'Implemented' },
        { name: 'input_text', ret: 'String', params: '(label: String, buffer: Ref<String>)', desc: 'Text input field.', example: 'graph.input_text("Name", name_ref)', status: 'Not Implemented' },
        { name: 'slider', ret: 'float', params: '(label: String, val: Ref<float>, min: float, max: float)', desc: 'Draggable slider.', example: 'graph.slider("Volume", vol, 0, 100)', status: 'Not Implemented' },
        { name: 'checkbox', ret: 'bool', params: '(label: String, val: Ref<bool>)', desc: 'Toggle checkbox.', example: 'graph.checkbox("Enabled", enabled_ref)', status: 'Not Implemented' },
        { name: 'combo', ret: 'int', params: '(label: String, current: Ref<int>, items: List<String>)', desc: 'Dropdown list.', example: 'graph.combo("Mode", mode_ref, ["A", "B", "C"])', status: 'Not Implemented' },
        { name: 'color_picker', ret: 'Color', params: '(label: String, color: Ref<Color>)', desc: 'Color selection widget.', example: 'graph.color_picker("Tint", color_ref)', status: 'Not Implemented' },
        { name: 'image', ret: 'void', params: '(texture: Texture, width: int, height: int)', desc: 'Displays an image.', example: 'graph.image(my_tex, 64, 64)', status: 'Not Implemented' },
        { name: 'progress_bar', ret: 'void', params: '(fraction: float)', desc: 'Progress bar (0.0 - 1.0).', example: 'graph.progress_bar(0.75)', status: 'Not Implemented' },
        { name: 'separator', ret: 'void', params: '()', desc: 'Horizontal line separator.', example: 'graph.separator()', status: 'Not Implemented' },
        { name: 'tooltip', ret: 'void', params: '(text: String)', desc: 'Shows tooltip on hover of previous item.', example: 'graph.tooltip("Click me")', status: 'Not Implemented' },

        // Drawing
        { name: 'draw_rect', ret: 'void', params: '(x: int, y: int, w: int, h: int, color: Color)', desc: 'Draws a filled rectangle.', example: 'graph.draw_rect(10, 10, 100, 50, Color.RED)', status: 'Implemented' },
        { name: 'draw_rect_outline', ret: 'void', params: '(x: int, y: int, w: int, h: int, color: Color, thick: int)', desc: 'Draws a rectangle outline.', example: 'graph.draw_rect_outline(10, 10, 100, 50, Color.RED, 2)', status: 'Not Implemented' },
        { name: 'draw_line', ret: 'void', params: '(x1: int, y1: int, x2: int, y2: int, color: Color)', desc: 'Draws a line.', example: 'graph.draw_line(0, 0, 100, 100, Color.BLUE)', status: 'Implemented' },
        { name: 'draw_circle', ret: 'void', params: '(center_x: int, center_y: int, radius: float, color: Color)', desc: 'Draws a filled circle.', example: 'graph.draw_circle(50, 50, 20, Color.GREEN)', status: 'Implemented' },
        { name: 'draw_text', ret: 'void', params: '(pos_x: int, pos_y: int, text: String, color: Color)', desc: 'Draws text directly.', example: 'graph.draw_text(10, 10, "Labels", Color.WHITE)', status: 'Implemented' },

        // Advanced Widgets (Build 3)
        { name: 'plot_lines', ret: 'void', params: '(label: String, values: List<float>)', desc: 'Plots a line chart.', example: 'graph.plot_lines("CPU Usage", usage_history)', status: 'Implemented' },
        { name: 'plot_histogram', ret: 'void', params: '(label: String, values: List<float>)', desc: 'Plots a histogram.', example: 'graph.plot_histogram("Distribution", data)', status: 'Not Implemented' },
        { name: 'tree_node', ret: 'bool', params: '(label: String)', desc: 'Collapsable tree node.', example: 'if graph.tree_node("Root") { ... graph.tree_pop() }', status: 'Not Implemented' },
        { name: 'tree_pop', ret: 'void', params: '()', desc: 'Ends a tree node.', example: 'graph.tree_pop()', status: 'Not Implemented' },
        { name: 'begin_table', ret: 'bool', params: '(id: String, columns: int)', desc: 'Starts a table.', example: 'if graph.begin_table("T1", 3) { ... }', status: 'Not Implemented' },
        { name: 'table_next_column', ret: 'void', params: '()', desc: 'Moves to next table column.', example: 'graph.table_next_column()', status: 'Not Implemented' },
        { name: 'end_table', ret: 'void', params: '()', desc: 'Ends a table.', example: 'graph.end_table()', status: 'Not Implemented' },
    ],
    properties: [
        { name: 'theme', type: 'Theme', default: 'Default', desc: 'Current UI Theme.' },
        { name: 'fps', type: 'float', default: '60.0', desc: 'Current render FPS.' }
    ]
});
