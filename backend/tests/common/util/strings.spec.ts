import { capitalizeName } from '../../../src/common/utils/util';

describe('capitalizeName', () => {
  it('capitalizes single word', () => {
    expect(capitalizeName('ada')).toBe('Ada');
  });

  it('capitalizes multiple words', () => {
    expect(capitalizeName('ada lovelace')).toBe('Ada Lovelace');
  });

  it('capitalizes hyphenated words', () => {
    expect(capitalizeName('ada-lovelace')).toBe('Ada-Lovelace');
  });

  it('trims and capitalizes', () => {
    expect(capitalizeName('  ada  ')).toBe('Ada');
  });

  it('returns original for empty', () => {
    expect(capitalizeName('')).toBe('');
  });
});

