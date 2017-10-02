function injectProps(target, name, descriptor) {
  const oldFunction = descriptor.value;
  const newFunction = function propsInjectorFunction() {
    return oldFunction.bind(this)(this.props);
  };

  return { ...descriptor, value: newFunction };
}

export default injectProps;
