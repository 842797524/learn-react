import {Component, createRef} from 'react';
import {MyContext} from '../context';

export default class Demo2 extends Component {
  static contextType = MyContext;
  input = createRef();

  render() {
    const {value} = this.context;
    const {name} = this.props;
    console.log('Demo2 render', this);
    return (
        <div className="demo2">
          <div className="title">Demo2</div>
          <div>context: {value}</div>
          <input type="text" ref={this.props.refs}/>
        </div>
    );
  }
}