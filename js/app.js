// Core Documentation App Logic

const App = {
    docs: {}, // Stores all loaded documentation data

    init() {
        this.renderAllContent();
        this.renderSidebar();

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => this.filterSidebar(e.target.value));

        // Setup Scroll Spy
        this.setupScrollSpy();

        // Handle Hash Navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1); // Remove #
            if (hash === 'changelog') {
                this.renderChangelog();
            } else {
                // Restore normal content if we were showing changelog
                const content = document.getElementById('content');
                const firstChild = content.firstElementChild;
                if (firstChild && firstChild.tagName === 'H1' && firstChild.innerText === 'Changelog') {
                    this.renderAllContent();
                    this.setupScrollSpy();
                }
                // Scroll to anchor
                if (hash) {
                    setTimeout(() => {
                        const target = document.querySelector('#' + CSS.escape(hash));
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                }
            }
        });

        // Handle initial hash or smooth scroll
        setTimeout(() => {
            const hash = window.location.hash;
            if (hash === '#changelog') {
                this.renderChangelog();
            } else if (hash) {
                const target = document.querySelector(hash.replace(':', '\\:'));
                if (target) {
                    target.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }
        }, 100);
    },

    setupScrollSpy() {
        // Observer options: trigger when 20% of the element is visible, 
        // but we care mostly about what is crossing the top.
        // A better approach for "table of contents" style is observing all headers/sections 
        // and finding the one closest to the top.

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -80% 0px', // Trigger when element is near top (20% from top)
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            // entries can be mixed (some entering, some leaving). 
            // We want to find the entry that is currently intersecting and highest up (or last intersected).

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activateSidebarItem(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe Headers (Page Titles)
        document.querySelectorAll('.page-header').forEach(header => {
            if (header.id) observer.observe(header);
        });

        // Observe Sub-sections (H2)
        document.querySelectorAll('section.doc-section h2').forEach(h2 => {
            if (h2.id) observer.observe(h2);
        });
    },

    activateSidebarItem(id) {
        if (!id) return;

        // Deactivate all active classes
        document.querySelectorAll('.nav-item.active, .nav-sub-item.active, .nav-page-link.active').forEach(el => {
            el.classList.remove('active');
        });

        // Escape colons for CSS selector
        const safeId = id.replace(':', '\\:');
        const link = document.querySelector(`a[href="#${safeId}"]`);

        if (link) {
            link.classList.add('active');

            // Sync Sidebar Scrolling (smoothly)
            // debouncing scrollIntoView might be needed if it's too jumpy, but let's try direct first
            if (link.scrollIntoViewIfNeeded) {
                link.scrollIntoViewIfNeeded({ behavior: 'smooth' });
            } else {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Open Parents and Close Others (Accordion)

            // 1. Identify relationships
            const parents = [];
            let el = link.parentElement;
            while (el && el.id !== 'nav-tree') {
                if (el.tagName === 'DETAILS') {
                    el.open = true;
                    parents.push(el);
                }
                el = el.parentElement;
            }

            // 2. Close other Page Details
            // We select all details that wrap pages. 
            // Current structure: details > summary.nav-page-header
            document.querySelectorAll('details').forEach(details => {
                const summary = details.querySelector('summary.nav-page-header');
                if (summary) {
                    // This is a page-level detail
                    if (!parents.includes(details)) {
                        details.open = false;
                    }
                }
            });
        } else if (hash === 'changelog') {
            this.renderChangelog();
        } else {
            // Default to first page if no hash or unknown
            if (!hash && Object.keys(this.docs).length > 0) {
                this.loadPage(Object.keys(this.docs)[0]);
            } else if (hash) {
                this.loadPage(hash);
            }
        }
    },

    register(key, data) {
        this.docs[key] = data;
    },

    getSortedKeys() {
        return Object.keys(this.docs).sort((a, b) => {
            const catA = this.docs[a].category || 'Z';
            const catB = this.docs[b].category || 'Z';

            // Priority Categories
            const priority = ['Manual', 'Libraries', 'OS Specific'];

            // Extract root category
            const rootA = catA.split('/')[0];
            const rootB = catB.split('/')[0];

            const idxA = priority.indexOf(rootA);
            const idxB = priority.indexOf(rootB);

            if (idxA !== -1 && idxB !== -1) {
                if (idxA !== idxB) return idxA - idxB;
            } else if (idxA !== -1) return -1;
            else if (idxB !== -1) return 1;

            if (catA !== catB) return catA.localeCompare(catB);

            // Within same category, sort by explicit order field, then title
            const orderA = this.docs[a].order || 999;
            const orderB = this.docs[b].order || 999;
            if (orderA !== orderB) return orderA - orderB;

            return this.docs[a].title.localeCompare(this.docs[b].title);
        });
    },

    renderAllContent() {
        const main = document.getElementById('content');
        main.innerHTML = '';

        const sortedKeys = this.getSortedKeys();

        sortedKeys.forEach(key => {
            const data = this.docs[key];
            const section = document.createElement('section');
            // section.id = key; // REMOVED: ID logic moved to Header to avoid intersection overlap
            section.className = 'doc-section';

            this.renderPageContent(section, key, data);

            main.appendChild(section);
            // Add spacer
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            main.appendChild(divider);
        });
    },

    renderPageContent(container, key, data) {
        // Header
        const header = document.createElement('div');
        header.className = 'page-header';
        header.id = key; // MOVED ID HERE
        header.innerHTML = `
            <div class="crumb">${data.category || 'Docs'}</div>
            <h1>${data.title}</h1>
            ${data.inherits ? `<div class="inherits">Inherits: <a href="#${data.inherits.toLowerCase()}">${data.inherits}</a></div>` : ''}
        `;
        container.appendChild(header);

        // Description
        if (data.description) {
            const desc = document.createElement('div');
            desc.className = 'description';
            desc.innerHTML = data.description;
            container.appendChild(desc);

            // Post-Process Static Code Blocks (Highlighting)
            desc.querySelectorAll('pre code').forEach(block => {
                // Only highlight if not already processed (check for token classes?)
                // But we just rendered it, so it's raw text.
                // However, we must be careful not to destroy child elements if any exist (though rare in raw desc).
                // We'll read textContent, linkify, and set innerHTML.

                // Decode potential HTML entities from innerHTML if necessary, but textContent handles it.
                const rawCode = block.textContent;
                block.innerHTML = this.highlightAndLinkCode(rawCode);
                block.classList.add('highlighted'); // Marker
            });
        }

        // Code Example
        if (data.example) {
            this.renderCodeBlock(container, "Example", data.example);
        }

        // Method Groups (New)
        if (data.groups && data.groups.length > 0) {
            data.groups.forEach(group => {
                const groupSlug = group.title.toLowerCase().replace(/\s+/g, '_');
                const groupId = `${key}:${groupSlug}`;

                // Group Header linkable
                const h2 = document.createElement('h2');
                h2.innerText = group.title;
                h2.id = groupId;
                container.appendChild(h2);

                if (group.description) {
                    const desc = document.createElement('div');
                    desc.className = 'group-description';
                    desc.innerHTML = group.description;
                    container.appendChild(desc);
                }
                if (group.methods && group.methods.length > 0) {
                    this.renderTable(container, group.methods, [
                        { title: 'Return', field: 'ret', class: 'type' },
                        {
                            title: 'Name',
                            field: 'name',
                            class: 'method-link',
                            format: (v) => `<a href="#${key}:${v}">${v}</a>`
                        },
                        { title: 'Parameters', field: 'params', class: 'code', format: (v) => this.escapeHtml(v) },
                        {
                            title: 'Description',
                            field: 'desc',
                            format: (v, row) => {
                                let html = v || '';
                                let footer = '';

                                if (row.status) footer += `<span class="version-badge not-implemented">${row.status}</span> `;
                                if (row.implemented) footer += `<span class="version-badge since">Implemented</span> `;
                                if (row.deprecated) footer += `<span class="version-badge deprecated">Deprecated ${row.deprecated}</span>`;

                                if (footer) {
                                    html += `<div class="version-info-footer">${footer}</div>`;
                                }
                                return html;
                            }
                        }
                    ]);
                }
                container.appendChild(document.createElement('br'));
            });
        }

        // Methods Table (Standard)
        if (data.methods && data.methods.length > 0) {
            // Check if we already have this section header from description or not needed
            // But let's add it for clarity
            const h2 = document.createElement('h2');
            h2.innerText = "Methods";
            h2.id = `${key}:methods`;
            container.appendChild(h2);

            this.renderTable(container, data.methods, [
                { title: 'Return', field: 'ret', class: 'type' },
                {
                    title: 'Name',
                    field: 'name',
                    class: 'method-link',
                    format: (v) => `<a href="#${key}:${v}">${v}</a>`
                },
                { title: 'Parameters', field: 'params', class: 'code', format: (v) => this.escapeHtml(v) },
                {
                    title: 'Description',
                    field: 'desc',
                    format: (v, row) => {
                        let html = v || '';
                        let footer = '';

                        if (row.status) footer += `<span class="version-badge not-implemented">${row.status}</span> `;
                        if (row.implemented) footer += `<span class="version-badge since">Implemented</span> `;
                        if (row.deprecated) footer += `<span class="version-badge deprecated">Deprecated ${row.deprecated}</span>`;

                        if (footer) {
                            html += `<div class="version-info-footer">${footer}</div>`;
                        }
                        return html;
                    }
                }
            ]);
        }

        // Properties Table
        if (data.properties && data.properties.length > 0) {
            const h2 = document.createElement('h2');
            h2.innerText = "Properties";
            h2.id = `${key}:properties`;
            container.appendChild(h2);

            this.renderTable(container, data.properties, [
                { title: 'Type', field: 'type', class: 'type' },
                {
                    title: 'Name',
                    field: 'name',
                    class: 'prop-name',
                    format: (v) => `<span id="${key}:${v}">${v}</span>`
                },
                { title: 'Default', field: 'default', class: 'code' },
                {
                    title: 'Description',
                    field: 'desc',
                    format: (v, row) => {
                        let html = v || '';
                        let footer = '';

                        if (row.status) footer += `<span class="version-badge not-implemented">${row.status}</span> `;
                        if (row.implemented) footer += `<span class="version-badge since">Implemented</span> `;
                        if (row.deprecated) footer += `<span class="version-badge deprecated">Deprecated ${row.deprecated}</span>`;

                        if (footer) {
                            html += `<div class="version-info-footer">${footer}</div>`;
                        }
                        return html;
                    }
                }
            ]);
        }

        // Signals Table
        if (data.signals && data.signals.length > 0) {
            const h2 = document.createElement('h2');
            h2.innerText = "Signals";
            h2.id = `${key}:signals`;
            container.appendChild(h2);

            this.renderTable(container, data.signals, [
                {
                    title: 'Name',
                    field: 'name',
                    class: 'method-link',
                    format: (v) => `<span id="${key}:${v}">${v}</span>`
                },
                { title: 'Parameters', field: 'params', class: 'code', format: (v) => this.escapeHtml(v) },
                {
                    title: 'Description',
                    field: 'desc',
                    format: (v, row) => {
                        let html = v || '';
                        let footer = '';

                        if (row.status) footer += `<span class="version-badge not-implemented">${row.status}</span> `;
                        if (row.implemented) footer += `<span class="version-badge since">Implemented</span> `;
                        if (row.deprecated) footer += `<span class="version-badge deprecated">Deprecated ${row.deprecated}</span>`;

                        if (footer) {
                            html += `<div class="version-info-footer">${footer}</div>`;
                        }
                        return html;
                    }
                }
            ]);
        }

        // Detailed Method Descriptions
        const methodsToCheck = (data.methods || []).concat(
            (data.groups || []).flatMap(g => g.methods || [])
        );

        if (methodsToCheck.length > 0) {
            container.appendChild(document.createElement('hr'));
            const headerRow = document.createElement('div');
            headerRow.style.display = 'flex';
            headerRow.style.justifyContent = 'space-between';
            headerRow.style.alignItems = 'baseline';

            const h2 = document.createElement('h2');
            h2.innerText = "Method Details";
            h2.style.borderBottom = 'none'; // remove border for flex header
            h2.style.margin = '32px 0 16px 0';

            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'expand-toggle';
            toggleBtn.innerText = 'Expand All';
            toggleBtn.style.marginBottom = '0';
            let allOpen = false;
            toggleBtn.onclick = () => {
                allOpen = !allOpen;
                toggleBtn.innerText = allOpen ? 'Collapse All' : 'Expand All';
                container.querySelectorAll('.method-accordion').forEach(d => d.open = allOpen);
            };

            headerRow.appendChild(h2);
            headerRow.appendChild(toggleBtn);
            container.appendChild(headerRow);

            // Re-add border bottom manually since flex container ruins the CSS pseudo element
            const borderDiv = document.createElement('div');
            borderDiv.style.borderBottom = '1px solid var(--border)';
            borderDiv.style.marginBottom = '24px';
            borderDiv.style.position = 'relative';
            borderDiv.innerHTML = '<div style="position: absolute; bottom: -1px; left: 0; width: 60px; height: 1px; background: var(--accent);"></div>';
            container.appendChild(borderDiv);

            methodsToCheck.forEach(method => {
                const box = document.createElement('details');
                box.className = 'method-accordion';
                box.id = `${key}:${method.name}`;

                box.innerHTML = `
                    <summary class="detail-header method-signature-header">
                        <div class="signature-left">
                            <span class="type">${method.ret}</span> <span class="method-name">${method.name}</span> <span class="params">${method.params}</span>
                        </div>
                        <div class="signature-right">
                             ${method.status ? `<span class="version-badge not-implemented">${method.status}</span>` : ''}
                             ${method.implemented && !method.status ? `<span class="version-badge since">Implemented</span>` : ''}
                        </div>
                    </summary>
                    <div class="detail-body" style="padding: 0 20px;">
                        <p>${method.desc}</p>
                        ${method.details ? `<p class="method-technical-details"><strong>Technical:</strong> ${method.details}</p>` : ''}
                        ${method.example ? (Array.isArray(method.example) ? method.example.map(ex => `<pre><code class="language-kix">${this.highlightAndLinkCode(ex)}</code></pre>`).join('') : `<pre><code class="language-kix">${this.highlightAndLinkCode(method.example)}</code></pre>`) : ''}
                    </div>
                `;
                container.appendChild(box);
            });
        }
    },

    renderSidebar() {
        const tree = document.getElementById('nav-tree');
        tree.innerHTML = '';

        // Build Hierarchy
        const root = { children: {}, items: [] };

        for (const [key, data] of Object.entries(this.docs)) {
            const catPath = (data.category || 'Uncategorized').split('/');
            let current = root;

            catPath.forEach(part => {
                if (!current.children[part]) {
                    current.children[part] = { children: {}, items: [], name: part };
                }
                current = current.children[part];
            });

            current.items.push({ key, title: data.title, data });
        }

        const renderNode = (node, container, level = 0) => {
            // Render Items (Pages)
            node.items.sort((a, b) => {
                const orderA = a.data.order || 999;
                const orderB = b.data.order || 999;
                if (orderA !== orderB) return orderA - orderB;
                return a.title.localeCompare(b.title);
            });

            node.items.forEach(item => {
                // Page is now a Details element
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                summary.className = 'nav-page-header';
                summary.style.paddingLeft = `${(level * 15) + 20}px`;

                // Link to page top
                const link = document.createElement('a');
                link.href = '#' + item.key;
                link.innerText = item.title;
                link.className = 'nav-page-link';
                // Prevent details toggle when clicking link? No, we want to toggle and scroll probably.
                // But default summary action toggles.

                summary.appendChild(link);
                details.appendChild(summary);

                const subContainer = document.createElement('div');
                subContainer.className = 'nav-sub-items';

                // Add Sub-sections (Methods, Groups, Properties)
                const sections = [];

                if (item.data.groups) {
                    item.data.groups.forEach(g => {
                        sections.push({
                            title: g.title,
                            id: `${item.key}:${g.title.toLowerCase().replace(/\s+/g, '_')}`
                        });
                    });
                }
                if (item.data.methods && item.data.methods.length > 0) {
                    sections.push({ title: 'Methods', id: `${item.key}:methods` });
                }
                if (item.data.properties && item.data.properties.length > 0) {
                    sections.push({ title: 'Properties', id: `${item.key}:properties` });
                }

                // Render sub-links
                sections.forEach(sec => {
                    const subLink = document.createElement('a');
                    subLink.className = 'nav-sub-item';
                    subLink.style.paddingLeft = `${(level * 15) + 40}px`;
                    subLink.innerText = sec.title;
                    subLink.href = '#' + sec.id;
                    subContainer.appendChild(subLink);
                });

                // Also list individual methods? 
                // Might be too much clutter. The user asked for "menu with sections".
                // Let's stick to high-level sections (Groups, Methods table, Properties table).

                details.appendChild(subContainer);
                container.appendChild(details);
            });

            // Render Children (Categories)
            const childKeys = Object.keys(node.children).sort();

            // Priority Sort
            if (level === 0) {
                childKeys.sort((a, b) => {
                    const priority = ['Manual', 'Libraries', 'OS Specific'];
                    const idxA = priority.indexOf(a);
                    const idxB = priority.indexOf(b);
                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                    if (idxA !== -1) return -1;
                    if (idxB !== -1) return 1;
                    return a.localeCompare(b);
                });
            }

            childKeys.forEach(key => {
                const child = node.children[key];
                const details = document.createElement('details');
                details.open = true; // Categories open by default

                const summary = document.createElement('summary');
                summary.className = 'nav-header';
                summary.style.paddingLeft = `${(level * 10) + 20}px`;
                summary.innerText = key;

                details.appendChild(summary);

                const content = document.createElement('div');
                renderNode(child, content, level + 1);
                details.appendChild(content);

                container.appendChild(details);
            });
        };

        renderNode(root, tree);
    },

    expandSidebarForHash(hash) {
        // Logic to open details based on hash
        // hash is like #intro or #os_specific:windows
        // We need to find the Nav Item that matches
        // This is a bit complex to reverse engineer from hash to DOM element without IDs
        // But we can try querying hrefs
        try {
            const link = document.querySelector(`a[href="${hash}"]`);
            if (link) {
                // Walk up parents and set open=true for all details
                let el = link.parentElement;
                while (el && el.id !== 'nav-tree') {
                    if (el.tagName === 'DETAILS') {
                        el.open = true;
                    }
                    el = el.parentElement;
                }
                // Highlight
                document.querySelectorAll('.nav-sub-item, .nav-page-link').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        } catch (e) { }
    },

    filterSidebar(query) {
        const tree = document.getElementById('nav-tree');
        const q = query.trim().toLowerCase();

        // Collect all sidebar details (both category-level and page-level)
        const allDetails = tree.querySelectorAll('details');

        if (!q) {
            // Empty query: show everything in default state
            allDetails.forEach(d => {
                d.style.display = '';
                // Keep category details open, page details closed
                const summary = d.querySelector('summary');
                if (summary && summary.classList.contains('nav-header')) {
                    d.open = true;
                } else {
                    d.open = false;
                }
            });
            return;
        }

        // For each page-level details, check if it matches
        allDetails.forEach(d => {
            const summary = d.querySelector('summary');
            if (!summary) return;

            // Category headers: handled after pages
            if (summary.classList.contains('nav-header')) return;

            // Page-level details: check title, methods, groups
            const link = d.querySelector('.nav-page-link');
            if (!link) return;

            const title = (link.textContent || '').toLowerCase();
            const href = (link.getAttribute('href') || '').slice(1); // strip #

            // Check if title or key matches
            let matches = title.includes(q) || href.includes(q);

            // Check sub-items (methods, groups)
            if (!matches) {
                const subItems = d.querySelectorAll('.nav-sub-item');
                subItems.forEach(sub => {
                    if ((sub.textContent || '').toLowerCase().includes(q)) {
                        matches = true;
                    }
                });
            }

            // Check methods/groups from data
            if (!matches && this.docs[href]) {
                const data = this.docs[href];
                const methods = (data.methods || []).concat(
                    (data.groups || []).flatMap(g => g.methods || [])
                );
                for (const m of methods) {
                    if (m.name.toLowerCase().includes(q) || (m.desc || '').toLowerCase().includes(q)) {
                        matches = true;
                        break;
                    }
                }
            }

            d.style.display = matches ? '' : 'none';
            if (matches) d.open = true;
        });

        // Category headers: show if any child page is visible
        allDetails.forEach(d => {
            const summary = d.querySelector('summary');
            if (!summary || !summary.classList.contains('nav-header')) return;

            // Check if any visible page exists inside this category
            const childPages = d.querySelectorAll('details');
            let anyVisible = false;
            childPages.forEach(child => {
                if (child.style.display !== 'none') anyVisible = true;
            });

            d.style.display = anyVisible ? '' : 'none';
            if (anyVisible) d.open = true;
        });
    },

    // Helpers
    generateSymbolIndex() {
        this.symbolMap = new Map();

        // 1. Index Pages (Titles and Keys)
        for (const [key, data] of Object.entries(this.docs)) {
            // Index Title (e.g., "Math" -> "#math")
            if (data.title) {
                this.symbolMap.set(data.title, `#${key}`);
            }
            // Index the Key itself (e.g., "math" -> "#math", "game" -> "#game")
            this.symbolMap.set(key, `#${key}`);

            // Index Methods
            if (data.methods) {
                data.methods.forEach(m => {
                    // Start with specific: "Math.sin" -> "#math:sin" (if we had namespaces)
                    // Just index method name: "sin" -> "#math:sin"
                    // Warning: collisions. Last one wins, or we skip common ones.
                    // Let's only index if > 3 chars to avoid noise like "get", "set"
                    if (m.name.length > 2) {
                        this.symbolMap.set(m.name, `#${key}:${m.name}`);
                    }
                });
            }
            // Index Groups
            if (data.groups) {
                data.groups.forEach(g => {
                    if (g.methods) {
                        g.methods.forEach(m => {
                            if (m.name.length > 2) {
                                this.symbolMap.set(m.name, `#${key}:${m.name}`);
                            }
                        });
                    }
                });
            }
            // Index Properties
            if (data.properties) {
                data.properties.forEach(p => {
                    this.symbolMap.set(p.name, `#${key}:${p.name}`);
                });
            }
        }

        // 2. Manual Indexing for Keywords & Types (Clickable)
        const syntaxPage = '#syntax_basics'; // Getting Started -> Syntax Basics
        const typesPage = '#syntax_basics';
        const symbolsPage = '#syntax_symbols';

        // Manual Enums / Prefixes
        this.symbolMap.set('Key', '#game'); // Key.W -> Game
        this.symbolMap.set('Color', '#math'); // Color.RED -> Math
        this.symbolMap.set('Vector3', '#math');
        this.symbolMap.set('Vector2', '#math');
        this.symbolMap.set('sys', '#system'); // alias
        this.symbolMap.set('fs', '#data'); // alias for file system

        // Keywords -> Syntax
        ['func', 'fn', 'var', 'let', 'const', 'mut', 'if', 'else', 'for', 'while', 'loop', 'break', 'continue', 'return', 'class', 'struct', 'enum', 'import', 'from', 'pub', 'mod', 'switch', 'case', 'default'].forEach(k => {
            this.symbolMap.set(k, syntaxPage);
        });

        ['as', 'in', 'is', 'try', 'catch', 'throw', 'async', 'await'].forEach(k => {
            this.symbolMap.set(k, syntaxPage);
        });

        // Types -> Basics
        ['int', 'float', 'string', 'bool', 'void', 'Any', 'List', 'Dictionary', 'Result', 'Option'].forEach(t => {
            this.symbolMap.set(t, typesPage);
        });

        ['true', 'false', 'null'].forEach(l => {
            this.symbolMap.set(l, typesPage);
        });

        // Symbols / Operators
        ['+', '-', '*', '/', '%', '=', '+=', '-=', '*=', '/=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!', ';', ':', '.', ',', '->', '=>', '?', '::', '..', '(', ')', '[', ']', '{', '}'].forEach(s => {
            this.symbolMap.set(s, symbolsPage);
        });
    },

    highlightAndLinkCode(code) {
        if (!this.symbolMap) this.generateSymbolIndex();

        // VS Code Style Categories
        const controlKeywords = new Set([
            'if', 'else', 'for', 'while', 'loop', 'break', 'continue', 'return', 'match', 'switch', 'case', 'default',
            'try', 'catch', 'throw', 'await', 'use', 'extern', 'include', 'import'
        ]);

        const storageKeywords = new Set([
            'fn', 'func', 'let', 'var', 'const', 'mut', 'static', 'pub', 'public', 'private', 'mod', 'crate',
            'class', 'struct', 'enum', 'trait', 'impl', 'type', 'union', 'unsafe', 'where', 'as', 'in', 'is', 'from',
            'async', 'move', 'super', 'self', 'Self', 'this', 'new', 'true', 'false', 'null', 'void'
        ]);

        const types = new Set([
            'int', 'float', 'double', 'char', 'string', 'bool', 'void', 'auto',
            'i8', 'i16', 'i32', 'i64', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'usize', 'isize',
            'Vec2', 'Vec3', 'Color', 'Array', 'Map', 'String', 'List', 'Dict', 'Object', 'Result', 'Option',
            'Box', 'Rc', 'Arc', 'Cell', 'RefCell', 'Mutex', 'RwLock', 'Any',
            'Vec', 'HashMap', 'VM', 'CallFrame', 'CompiledProgram', 'Value'
        ]);

        // Libraries (Modules) - Teal (Tokyo Night)
        const libraries = new Set([
            'Math', 'System', 'Game', 'Net', 'Graph', 'Data', 'Utils', 'Audio', 'OS', 'Physics', 'UI', 'Input', 'Thread', 'Task', 'CLI'
        ]);

        // Escape HTML
        let escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Advanced Regex Tokenizer
        const tokenRegex = /(".*?"|'.*?'|`.*?`)|(\/\/.*$|\/\*[\s\S]*?\*\/)|(\b[a-zA-Z_]\w*!)|(\b\d+(\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)|([{}()\[\].,:;])|([+\-*/%=&|<>!^?]+)/gm;


        // Rainbow Bracket State
        let pDepth = 0; // ()
        let bDepth = 0; // []
        let kDepth = 0; // {}

        // Args: match, string, comment, macro, number, numDec, identifier, punctuation, operator, offset, fullString
        return escaped.replace(tokenRegex, (match, string, comment, macro, number, numDec, identifier, punctuation, operator, offset, fullString) => {
            if (string) {
                return `<span class="token-string">${string}</span>`;
            } else if (comment) {
                return `<span class="token-comment">${comment}</span>`;
            } else if (macro) {
                return `<span class="token-macro">${macro}</span>`;
            } else if (number) {
                return `<span class="token-number">${number}</span>`;
            } else if (identifier) {
                // 1. Libraries (Teal)
                if (libraries.has(identifier)) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-library">${identifier}</a>`;
                    }
                    return `<span class="token-library">${identifier}</span>`;
                }

                // 2. Control Keywords (Purple)
                if (controlKeywords.has(identifier)) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-keyword-control">${identifier}</a>`;
                    }
                    return `<span class="token-keyword-control">${identifier}</span>`;
                }

                // 3. Storage/Other Keywords (Red - Requested)
                if (storageKeywords.has(identifier)) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-keyword">${identifier}</a>`;
                    }
                    return `<span class="token-keyword">${identifier}</span>`;
                }

                // 4. Types (Teal)
                if (types.has(identifier)) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-type">${identifier}</a>`;
                    }
                    return `<span class="token-type">${identifier}</span>`;
                }

                // 5. Heuristics for Types (PascalCase)
                if (/^[A-Z]/.test(identifier) && identifier !== identifier.toUpperCase()) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-type">${identifier}</a>`;
                    }
                    return `<span class="token-type">${identifier}</span>`;
                }

                // 6. Functions (Light Yellow)
                const remainder = fullString.substring(offset + match.length);
                if (/^\s*\(/.test(remainder)) {
                    if (this.symbolMap.has(identifier)) {
                        return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-function">${identifier}</a>`;
                    }
                    return `<span class="token-function">${identifier}</span>`;
                }

                // 7. Properties/Variables
                if (this.symbolMap.has(identifier)) {
                    return `<a href="${this.symbolMap.get(identifier)}" class="code-link token-variable">${identifier}</a>`;
                }
                return `<span class="token-variable">${identifier}</span>`;
            }
            else if (punctuation) {
                // Rainbow Brackets Logic
                if (punctuation === '(') {
                    pDepth++;
                    // Cycle: Purple -> Blue -> Orange
                    const colorClass = ['token-punct-p1', 'token-punct-p2', 'token-punct-p0'][pDepth % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                } else if (punctuation === ')') {
                    const d = pDepth;
                    pDepth--;
                    const colorClass = ['token-punct-p1', 'token-punct-p2', 'token-punct-p0'][d % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                }
                else if (punctuation === '[') {
                    bDepth++;
                    const colorClass = ['token-punct-b1', 'token-punct-b2', 'token-punct-b0'][bDepth % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                } else if (punctuation === ']') {
                    const d = bDepth;
                    bDepth--;
                    const colorClass = ['token-punct-b1', 'token-punct-b2', 'token-punct-b0'][d % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                }
                else if (punctuation === '{') {
                    kDepth++;
                    const colorClass = ['token-punct-k1', 'token-punct-k2', 'token-punct-k0'][kDepth % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                } else if (punctuation === '}') {
                    const d = kDepth;
                    kDepth--;
                    const colorClass = ['token-punct-k1', 'token-punct-k2', 'token-punct-k0'][d % 3];
                    return `<span class="${colorClass}">${punctuation}</span>`;
                }

                // Link Punctuation (e.g. ->, :, .)
                if (this.symbolMap.has(punctuation)) {
                    return `<a href="${this.symbolMap.get(punctuation)}" class="code-link token-punctuation">${punctuation}</a>`;
                }
                return `<span class="token-punctuation">${punctuation}</span>`;
            } else if (operator) {
                // Link Operators (e.g. +, ==)
                if (this.symbolMap.has(operator)) {
                    return `<a href="${this.symbolMap.get(operator)}" class="code-link token-operator">${operator}</a>`;
                }
                return `<span class="token-operator">${operator}</span>`;
            }
            return match;
        });
    },

    renderSection(parent, title) { /* ... */ },

    renderCodeBlock(parent, title, code) {
        if (title) {
            const h3 = document.createElement('h3');
            h3.innerText = title;
            parent.appendChild(h3);
        }
        const pre = document.createElement('pre');

        // Use highlightAndLinkCode
        const linkedCode = this.highlightAndLinkCode(code);

        pre.innerHTML = `<code>${linkedCode.trim()}</code>`;
        parent.appendChild(pre);
    },
    renderChangelog() {
        // Clear main content
        const content = document.getElementById('content');
        content.innerHTML = '';

        const h1 = document.createElement('h1');
        h1.innerText = "Changelog";
        content.appendChild(h1);

        if (!App.changelog || App.changelog.length === 0) {
            content.innerHTML += '<p>No changelog data found.</p>';
        } else {
            App.changelog.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'changelog-entry';

                const h2 = document.createElement('h2');
                h2.innerText = `${entry.version} (${entry.date})`;
                div.appendChild(h2);

                const ul = document.createElement('ul');
                entry.changes.forEach(change => {
                    const li = document.createElement('li');
                    li.innerHTML = change;
                    ul.appendChild(li);
                });
                div.appendChild(ul);
                content.appendChild(div);
            });
        }

        // Update Sidebar Active State
        document.querySelectorAll('.nav-sub-item, .nav-page-link').forEach(a => a.classList.remove('active'));
        const link = document.querySelector('.sidebar-link-changelog');
        if (link) link.classList.add('active');
    },

    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    renderTable(parent, rows, cols) {
        const table = document.createElement('table');
        table.className = 'api-table';
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        cols.forEach(c => {
            const th = document.createElement('th');
            th.innerText = c.title;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        rows.forEach(row => {
            const tr = document.createElement('tr');
            // Add ID if it's a method row for anchoring?
            if (row.name && cols.find(c => c.field === 'name')) {
                // tr.id = row.name; // Conflicts
            }

            cols.forEach(c => {
                const td = document.createElement('td');
                if (c.class) td.className = c.class;
                let val = row[c.field] || '';
                if (c.format) val = c.format(val, row);
                td.innerHTML = val;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        parent.appendChild(table);
    }
};

window.onload = () => {
    App.init();
};
