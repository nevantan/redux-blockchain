import moment from 'moment';
import { expect } from 'chai';
import Block, { serialize, deserialize } from '../block';

describe('Block', () => {
  it('should set initial data correctly (empty initial data)', () => {
    const prevHash = 'abc123';
    const hash =
      '3a4bc5cf9b3b757723475dd4a46c31f73d0293cb362baabaff379d1d491fcd40';

    const block = new Block(prevHash, {});
    expect(block.prevHash).to.equal(prevHash);
    expect(block.data).to.deep.equal({});
    expect(block.hash).to.equal(hash);
  });

  describe('private utilities', () => {
    describe('serialize', () => {
      it('should serialize default data correctly', () => {
        const result = serialize();
        expect(result).to.equal('{}');
      });
      it('should serialize the block data correctly', () => {
        const result = serialize({ foo: 'bar' });
        expect(result).to.equal('{"foo":"bar"}');
      });
    });

    describe('deserialize', () => {
      it('should deserialize default data correctly', () => {
        const result = deserialize('{}');
        expect(result).to.deep.equal({});
      });
      it('should deserialize the block data correctly', () => {
        const result = deserialize('{"foo":"bar"}');
        expect(result).to.deep.equal({
          foo: 'bar'
        });
      });
    });
  });
});
