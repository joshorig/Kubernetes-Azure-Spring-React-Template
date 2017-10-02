function injectPropsAndState(target, name, descriptor) {
  const oldFunction = descriptor.value;
  const newFunction = function propsInjectorFunction() {
    return oldFunction.bind(this)(this.props, this.state);
  };

  return { ...descriptor, value: newFunction };
}

export default injectPropsAndState;

