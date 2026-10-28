import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = resolve('dist');
const pagePath = resolve(root, 'udalenie-zapahov/index.html');
const page = readFileSync(pagePath, 'utf8');
const main = readFileSync(resolve(root, 'index.html'), 'utf8');
const max = 'https://max.ru/u/f9LHodD0cOKZEJQUwiiemzvhecZLDTq6jxMPZ2SmNnd5JdJWltsbNUafP4o';
for (const html of [page, main]) {
  assert.ok(!/wa\.me|whatsapp/i.test(html), 'Visible WhatsApp links/text must not return');
  assert.ok(html.includes(max), 'Dedicated MAX contact is missing');
  for (const match of html.matchAll(/href="(#[^"]+)"/g)) {
    assert.ok(html.includes(`id="${match[1].slice(1)}"`), `Broken anchor ${match[1]}`);
  }
}
assert.ok(main.includes('href="/udalenie-zapahov/"'), 'Main page needs the separate service link');
assert.ok(main.includes('Отдельная услуга'), 'Main page needs a visible service announcement');
assert.ok(page.includes('Свежо') && page.includes('в Курске'), 'City-specific hero is missing');
assert.ok(page.includes('noindex, follow'), 'Keep the experimental page out of search until approved');
assert.ok(!/<form\b|odor\.js/.test(page), 'The simplified page must not restore the old brief');
assert.equal((page.match(/<details>/g) || []).length, 2, 'Keep the FAQ compact');
for (const match of page.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const url = match[1].split(/[?#]/)[0];
  if (!url || /^(?:https?:|tel:|#)/.test(url)) continue;
  const file = url.startsWith('/') ? resolve(root, `.${url}`) : resolve(dirname(pagePath), url);
  assert.ok(file.startsWith(root), `Asset escapes dist: ${url}`);
  assert.ok(existsSync(file), `Missing page resource ${url}`);
}
console.log('Odor page check: compact layout, main-page links, MAX and assets OK.');
