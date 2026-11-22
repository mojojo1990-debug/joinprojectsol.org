import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const read = name => readFileSync(new URL(name, import.meta.url), 'utf8');
const html = read('index.html');
const script = read('app.js');

function element(id = '') {
  return {
    id, dataset: {}, attributes: {}, hidden: false, textContent: '', innerHTML: '',
    value: '', style: {}, children: [], listeners: {},
    classList: {toggle() {}, add() {}, remove() {}},
    setAttribute(key, value) { this.attributes[key] = value; },
    getAttribute(key) { return this.attributes[key]; },
    addEventListener(name, callback) { (this.listeners[name] ??= []).push(callback); },
    fire(name, target = this) {
      for (const callback of this.listeners[name] || []) {
        callback({currentTarget: this, target, preventDefault() {}});
      }
    },
    click() { this.fire('click'); },
    replaceChildren() { this.children = []; },
    appendChild(node) { this.children.push(node); },
    querySelectorAll(selector) { return selector === 'li' ? this.children : []; },
    scrollIntoView() {}, focus() {}, reportValidity() {}, setCustomValidity() {},
    contains(target) { return target === this; }, reset() {}, remove() {}, select() {}
  };
}

function setup() {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const elements = Object.fromEntries(ids.map(id => [id, element(id)]));
  const nodes = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(match => {
    const node = element();
    node.dataset.i18n = match[1];
    node.innerHTML = match[1] === 'copy' ? 'Copy plan' : 'English text';
    return node;
  });
  elements['copy-plan'] = nodes.find(node => node.dataset.i18n === 'copy');
  const network = [element('people'), element('skills')];
  network[0].dataset.node = 'people';
  network[1].dataset.node = 'skills';
  elements['mobile-nav'].hidden = true;
  elements['result-panel'].hidden = true;
  elements['idea-path'].value = 'business';

  const document = {
    documentElement: {lang:'en'}, body: element('body'), listeners: {},
    querySelector(selector) { return elements[selector.slice(1)]; },
    querySelectorAll(selector) {
      if (selector === '[data-i18n]') return nodes;
      if (selector === '.network-node') return network;
      return [];
    },
    createElement: () => element(),
    addEventListener(name, callback) { this.listeners[name] = callback; },
    execCommand: () => true
  };
  const location = { protocol:'file:', hostname:'localhost.test' };
  const window = {
    location, setTimeout() {}, matchMedia: () => ({matches:false}), addEventListener() {}
  };
  vm.runInNewContext(script, {document, window, navigator:{}, location, URL, Blob});
  return {elements, document, nodes, network};
}

test('homepage references exist and have unique IDs', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), anchor);
  assert.match(html, /rel="manifest" href="manifest.webmanifest"/);
});

test('all homepage translation keys have Spanish text', () => {
  const keys = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(match => match[1]))];
  const dict = script.match(/const spanish = (\{[\s\S]*?\n  \});\n  const descriptions/);
  assert.ok(dict, 'Spanish translation object exists');
  const spanish = vm.runInNewContext('(' + dict[1] + ')');
  for (const key of keys) assert.equal(typeof spanish[key], 'string', 'Missing translation: ' + key);
});

test('language toggle, mobile menu, community map, and first-step planner work', () => {
  const {elements:e, document, nodes, network} = setup();
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(e['mobile-nav'].hidden, true);
  e['lang-toggle'].click();
  assert.equal(document.documentElement.lang, 'es');
  assert.equal(nodes.find(n => n.dataset.i18n === 'heroBtn').innerHTML, 'Encuentra tu primer paso');
  e['menu-toggle'].click();
  assert.equal(e['mobile-nav'].hidden, false);
  document.listeners.keydown({key:'Escape'});
  assert.equal(e['mobile-nav'].hidden, true);
  network[1].click();
  assert.match(e['node-description'].textContent, /habilidades/);
  e['idea-text'].value = 'Quiero ayudar mi barrio';
  e['idea-text'].fire('input');
  e['idea-form'].fire('submit');
  assert.equal(e['result-panel'].hidden, false);
  assert.equal(e['result-steps'].children.length, 3);
  assert.match(e['result-summary'].textContent, /Quiero ayudar/);
  e['lang-toggle'].click();
  assert.match(e['result-summary'].textContent, /^Your idea:/);
  assert.match(e['result-steps'].children[0].textContent, /^Describe/);
  e['new-plan'].click();
  assert.equal(e['result-panel'].hidden, true);
  assert.equal(e['idea-text'].value, '');
});

test('manifest icons and service worker assets resolve', () => {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.name, 'joinprojectsol.org');
  for (const icon of manifest.icons) {
    assert.ok(existsSync(new URL(icon.src, import.meta.url)), 'Missing icon: ' + icon.src);
  }
  const worker = read('service-worker.js');
  assert.match(worker, /'\.\/styles\.css', '\.\/app\.js'/);
  assert.match(worker, /'\.\/icon-192\.png', '\.\/icon-512\.png'/);
});
