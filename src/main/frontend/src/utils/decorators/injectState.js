function injectState(target, name, descriptor) {
  const oldFunction = descriptor.value;
  const newFunction = function propsInjectorFunction() {
    return oldFunction.bind(this)(this.state);
  };

  return { ...descriptor, value: newFunction };
}

export default injectState;
