import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { TARIFFS } from '../src/data.ts';

const expected = { regular: [160, 6000], general: [250, 9000], 'after-renovation': [300, 12000] };
for (const [id, [rate, minimum]] of Object.entries(expected)) {
  const tariff = TARIFFS.find(t => t.id === id);
  assert.ok(tariff, `Missing tariff ${id}`);
  assert.equal(tariff.rate, rate);
  assert.equal(tariff.minPrice, minimum);
  for (const area of [25, 40, 60, 100, 300]) {
    assert.equal(Math.max(tariff.rate * area, tariff.minPrice), Math.max(rate * area, minimum));
  }
}
const turnkey = TARIFFS.find(t => t.rateOptions);
assert.equal(turnkey.minPrice, 12000);
assert.deepEqual(turnkey.rateOptions.map(t => t.rate), [450, 550]);
const calc = readFileSync('src/components/Calculator.tsx', 'utf8');
assert.ok(calc.includes('min={25}'));
assert.ok(calc.includes('const [area, setArea] = useState(25)'), 'Calculator must start at minimum 25 m²');
assert.ok(calc.includes('Math.max(rate * area, tariff.minPrice)'));
const html = readFileSync('dist/index.html', 'utf8');
const metrika = readFileSync('dist/metrika.js', 'utf8');
assert.ok(metrika.includes('var id = 0;'), 'Wrong city counter');
for (const goal of ['click_phone','click_max','click_telegram','click_whatsapp','calc_interaction']) assert.ok(metrika.includes(goal), 'Missing goal event '+goal);
assert.ok(html.includes('https://vershina46.ru/'));
assert.ok(html.includes('Курске'));
assert.ok(!/Воронеж|Балаших|Сочи|vershina-36|112470058/.test(html));
for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const url = match[1].split(/[?#]/)[0];
  if (/^(?:\.\/|\/)?(?:assets|images)\//.test(url)) {
    assert.ok(existsSync(`dist/${url.replace(/^(?:\.\/|\/)/, '')}`), `Missing asset ${url}`);
  }
}
for (const file of ['CNAME', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'privacy.html', 'site.webmanifest', 'images/og-kursk.png']) {
  assert.ok(existsSync(`dist/${file}`), `Missing file ${file}`);
}
assert.equal(readFileSync('dist/CNAME', 'utf8').trim(), 'vershina46.ru');
for (const name of ['robots.txt', 'sitemap.xml', 'privacy.html']) {
  const text = readFileSync(`dist/${name}`, 'utf8');
  assert.ok(text.includes('vershina46.ru'));
  assert.ok(!/vershina-36|Воронеж/.test(text));
}
for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
console.log('Курск release check: SEO, assets, prices, minima and calculator formula OK.');
