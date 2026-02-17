App.register('os_main', {
    title: 'OS Specific',
    category: 'Libraries/OS Specific',
    description: 'Native system integration functions specific to the host operating system. These functions allow deeper integration with Windows, Linux, and MacOS.',
    groups: [
        {
            title: 'Windows',
            description: 'API Integration for Microsoft Windows.',
            methods: [
                { name: 'message_box', ret: 'void', params: '(title: String, msg: String)', desc: 'Displays a native message box.', example: 'os_main.message_box("Error", "Fatal Error")', since: 'v0.0.1 (1)' },
                { name: 'registry_read', ret: 'String', params: '(key: String, value: String)', desc: 'Reads from the Registry.', example: 'let val = os_main.registry_read("HKCU\\\\Software\\\\App", "Theme")', since: 'v0.0.1 (1)' },
                { name: 'registry_write', ret: 'void', params: '(key: String, value: String, data: String)', desc: 'Writes to the Registry.', example: 'os_main.registry_write("HKCU\\\\Software\\\\App", "Theme", "Dark")', since: 'v0.0.1 (1)' },
                { name: 'shell_exec', ret: 'void', params: '(cmd: String)', desc: 'Executes a shell command (ShellExecute).', example: 'os_main.shell_exec("explorer.exe")', since: 'v0.0.1 (1)' }
            ]
        },
        {
            title: 'Linux',
            description: 'POSIX compliant functions for Linux distributions.',
            methods: [
                { name: 'chmod', ret: 'void', params: '(path: String, mode: int)', desc: 'Changes file permissions.', example: 'os_main.chmod("/bin/script", 755)', since: 'v0.0.1 (1)' },
                { name: 'chown', ret: 'void', params: '(path: String, user: String, group: String)', desc: 'Changes file ownership.', example: 'os_main.chown("/var/www", "www-data", "www-data")', since: 'v0.0.1 (1)' },
                { name: 'get_uid', ret: 'int', params: '()', desc: 'Returns current User ID.', example: 'let uid = os_main.get_uid()', since: 'v0.0.1 (1)' },
                { name: 'send_signal', ret: 'void', params: '(pid: int, sig: int)', desc: 'Sends a POSIX signal.', example: 'os_main.send_signal(1234, 9)', since: 'v0.0.1 (1)' },
                { name: 'syslog', ret: 'void', params: '(msg: String)', desc: 'Writes to system log.', example: 'os_main.syslog("Service started")', since: 'v0.0.1 (1)' }
            ]
        },
        {
            title: 'MacOS',
            description: 'Integration with macOS frameworks.',
            methods: [
                { name: 'notify', ret: 'void', params: '(title: String, msg: String)', desc: 'Sends a native notification.', example: 'os_main.notify("Done", "Task finished")', since: 'v0.0.1 (1)' },
                { name: 'exec_applescript', ret: 'String', params: '(script: String)', desc: 'Executes AppleScript code.', example: 'os_main.exec_applescript("tell application \\"Finder\\" to activate")', since: 'v0.0.1 (1)' },
                { name: 'plist_read', ret: 'Dictionary', params: '(path: String)', desc: 'Parses a .plist file.', example: 'let plist = os_main.plist_read("Info.plist")', since: 'v0.0.1 (1)' },
                { name: 'show_tab_overview', ret: 'void', params: '()', desc: 'Activates the native window tab overview (Mission Control for tabs).', example: 'os_main.show_tab_overview()', since: 'v0.0.1 (1)' },
                { name: 'new_tab', ret: 'void', params: '()', desc: 'Creates a new empty tab in the current window.', example: 'os_main.new_tab()', since: 'v0.0.1 (1)' },
                { name: 'close_current_tab', ret: 'void', params: '()', desc: 'Closes the currently active tab.', example: 'os_main.close_current_tab()', since: 'v0.0.1 (1)' },
                { name: 'select_next_tab', ret: 'void', params: '()', desc: 'Switches focus to the next tab.', example: 'os_main.select_next_tab()', since: 'v0.0.1 (1)' },
                { name: 'select_previous_tab', ret: 'void', params: '()', desc: 'Switches focus to the previous tab.', example: 'os_main.select_previous_tab()', since: 'v0.0.1 (1)' },
                { name: 'merge_all_windows', ret: 'void', params: '()', desc: 'Merges all separate windows into a single tabbed window.', example: 'os_main.merge_all_windows()', since: 'v0.0.1 (1)' },
                { name: 'move_tab_to_new_window', ret: 'void', params: '()', desc: 'Moves the current tab out to a new separate window.', example: 'os_main.move_tab_to_new_window()', since: 'v0.0.1 (1)' },
                { name: 'toggle_tab_bar', ret: 'void', params: '()', desc: 'Toggles the visibility of the tab bar.', example: 'os_main.toggle_tab_bar()', since: 'v0.0.1 (1)' },
                { name: 'set_tab_title', ret: 'void', params: '(title: String)', desc: 'Sets the title of the current tab.', example: 'os_main.set_tab_title("My Tab")', since: 'v0.0.1 (1)' }
            ]
        }
    ]
});
