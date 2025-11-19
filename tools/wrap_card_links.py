#!/usr/bin/env python3
"""Wrap top-level <a> children of <div class="card"> into <article class="buttonCard">.
This script makes a .bak copy of each modified file.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DIV_CARD_RE = re.compile(r'(<div\s+class=["\']card["\']>)([\s\S]*?)(</div>)', re.IGNORECASE)
TOP_LEVEL_A_RE = re.compile(r'(?:\n|\A)(?P<indent>\s*)<a[\s\S]*?</a\s*>', re.IGNORECASE)

def process_inner(inner: str) -> (str, bool):
    # Skip if there is already an article/buttonCard inside
    if 'article' in inner.lower():
        return inner, False

    # Find all top-level anchor matches (anchors that start at line-start with indentation)
    matches = list(TOP_LEVEL_A_RE.finditer(inner))
    if not matches:
        return inner, False

    # Build a new inner: replace each contiguous run of top-level anchors with one article wrapper
    new = []
    last_end = 0
    i = 0
    while i < len(matches):
        m = matches[i]
        # copy text before this match
        new.append(inner[last_end:m.start()])

        # collect contiguous anchors
        anchors = [m.group(0)]
        j = i + 1
        while j < len(matches) and matches[j].start() == matches[j-1].end():
            anchors.append(matches[j].group(0))
            j += 1

        indent = m.group('indent') or ''
        # trim leading newline on first anchor if present to keep spacing predictable
        anchors_text = ''.join(anchors).lstrip('\n')
        wrapped = f"\n{indent}<article class=\"buttonCard\">\n{anchors_text}\n{indent}</article>"
        new.append(wrapped)
        last_end = matches[j-1].end()
        i = j

    new.append(inner[last_end:])
    return ''.join(new), True

def process_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    changed = False

    def repl(m):
        head, inner, tail = m.group(1), m.group(2), m.group(3)
        new_inner, did = process_inner(inner)
        nonlocal changed
        if did:
            changed = True
            return head + new_inner + tail
        return m.group(0)

    new_text = DIV_CARD_RE.sub(repl, text)
    if changed and new_text != text:
        bak = path.with_suffix(path.suffix + '.bak')
        path.rename(bak)
        bak.write_text(text, encoding='utf-8')
        path.write_text(new_text, encoding='utf-8')
    return changed

def main():
    modified = []
    for p in ROOT.rglob('*.html'):
        try:
            if process_file(p):
                modified.append(str(p.relative_to(ROOT)))
        except Exception as e:
            print(f'ERROR processing {p}: {e}')

    if modified:
        print('Modified files:')
        for m in modified:
            print(' -', m)
    else:
        print('No files modified.')

if __name__ == '__main__':
    main()
