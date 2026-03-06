import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('core-utils', async () => {
  const mod = await import('../../dist/index.js');

  it('exports formatNumber as a function', () => {
    assert.ok(typeof mod.formatNumber === 'function');
  });

  it('exports cn as a function', () => {
    assert.ok(typeof mod.cn === 'function');
  });

  it('exports truncate as a function', () => {
    assert.ok(typeof mod.truncate === 'function');
  });

  it('exports sleep as a function', () => {
    assert.ok(typeof mod.sleep === 'function');
  });
});
