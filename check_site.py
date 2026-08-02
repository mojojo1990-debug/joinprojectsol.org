from pathlib import Path
from html.parser import HTMLParser
import json, sys

root = Path(__file__).resolve().parents[1]
errors = []

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.hrefs, self.srcs = [], [], []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if 'id' in data: self.ids.append(data['id'])
        if 'href' in data: self.hrefs.append(data['href'])
        if 'src' in data: self.srcs.append(data['src'])

html_path = root / 'index.html'
if not html_path.exists(): errors.append('index.html is missing')
else:
    parser = Parser(); parser.feed(html_path.read_text(encoding='utf-8'))
    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    if duplicates: errors.append(f'duplicate IDs: {duplicates}')
    for href in [x for x in parser.hrefs if x.startswith('#')]:
        if href[1:] not in parser.ids: errors.append(f'missing section target: {href}')
    for ref in parser.hrefs + parser.srcs:
        if ref.startswith(('http://', 'https://', '#', 'mailto:', 'tel:')): continue
        target = root / ref.split('#')[0].split('?')[0]
        if not target.exists(): errors.append(f'missing local file: {ref}')

try:
    manifest = json.loads((root / 'manifest.webmanifest').read_text(encoding='utf-8'))
    for field in ('name','short_name','start_url','scope','display','icons'):
        if field not in manifest: errors.append(f'manifest missing {field}')
    for icon in manifest.get('icons', []):
        if not (root / icon.get('src','')).exists(): errors.append(f"missing icon: {icon.get('src')}")
except Exception as exc: errors.append(f'manifest invalid: {exc}')

for required in ('service-worker.js','robots.txt','sitemap.xml','404.html','offline.html','CNAME','VERSION'):
    if not (root / required).exists(): errors.append(f'missing required file: {required}')

for file in root.rglob('*'):
    if file.is_file() and file.stat().st_size == 0: errors.append(f'empty file: {file.relative_to(root)}')

if errors:
    print('FAILED')
    for error in errors: print(f'- {error}')
    sys.exit(1)
print('PASS: Project SOL static quality checks')
