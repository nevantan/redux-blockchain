import sha256 from 'js-sha256';

export default class Block {
  constructor(prevHash, data) {
    this._prevHash = prevHash;
    this._data = serialize(data);
  }

  get data() {
    return deserialize(this._data);
  }

  get prevHash() {
    return this._prevHash;
  }

  get hash() {
    return sha256
      .create()
      .update(this._prevHash + this._data)
      .hex();
  }
}

const serialize = (data = {}) => {
  return JSON.stringify(data);
};

const deserialize = (data = {}) => {
  return JSON.parse(data);
};

export { serialize, deserialize };
