function* generator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

const generatorFactory = generator();

class KeyGenerator {
  static getNext() {
    return generatorFactory.next().value;
  }
}

export default KeyGenerator;
