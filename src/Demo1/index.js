import {Component, createRef, forwardRef} from 'react';
import {MyContext} from '../context';
import Demo2 from '../Demo2';

const ComponentRef = forwardRef((props, ref) => {
  console.log('ref', ref);
  return (<Demo2 forwardedRef={ref} name="componentRef"></Demo2>);
});

export default class Demo extends Component {
  static contextType = MyContext;
  state = {
    value: 'state',
  };
  ref = createRef();

  changeContext = () => {
    Promise.resolve().then(() => {
      console.log('resolve');
    });
    this.setState({value: 'state1'}, () => {
      console.log('setState success');
    });
    console.log('setState-post');
  };
  getRef = () => {
    console.log('this.getRef', this.ref);
  };

  render() {
    const {state: {value}, state} = this;
    console.log('Demo1：render');
    <span>{value}</span>;
    return (<div className="demo1">
      <button onClick={this.changeContext}>改变context</button>
      <button onClick={this.getRef}>获取ref</button>
      <MyContext.Provider value={state}>
        <ComponentRef ref={this.ref}/>
        <Demo2 forwardedRef={this.ref}></Demo2>
      </MyContext.Provider>
    </div>);
  }
}