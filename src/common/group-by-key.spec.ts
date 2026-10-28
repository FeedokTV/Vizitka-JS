import { groupByKey } from './group-by-key';

describe('groupByKey', () => {
  it('returns groups in the order of keys, with empty arrays for missing keys', () => {
    const rows = [
      { profileId: 'b', name: 'b1' },
      { profileId: 'a', name: 'a1' },
      { profileId: 'b', name: 'b2' },
    ];

    const result = groupByKey(['a', 'c', 'b'], rows, (row) => row.profileId);

    expect(result.map((group) => group.map((row) => row.name))).toEqual([['a1'], [], ['b1', 'b2']]);
  });
});
