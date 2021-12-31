import {Component, PureComponent} from 'react';

export default class PureComponentDemo extends Component {

  state = {
    name: 'pure',
    child: {
      name: 'pure-child',
      child: {
        name: 'pure-child-child',
      },
    },
    a: 123,
  };

  handleClick = _ => _;

  test = () => {
    this.setState(state => {
      // state.child.child.name = '-1-1-1-';
      // console.log('this.state.child.child.name', this.state.child.child.name);
      return {
        ...state,
        child: {
          ...state.child,
          child: {
            name: 'pure-child-child-1',
          },
        },
      };
    });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state.child.child !== nextState.child.child;
  }

  render() {
    return (
        <div className="pure-component">
          {/*<span>{this.state.a}</span>*/}
          <span>child.name : {this.state.child.child.name}</span>
          <button onClick={this.test}>设置state</button>
          <ChildComponent handleClick={this.handleClick}
                          child={this.state.child.child}/>
        </div>
    );
  }
}

class ChildComponent extends Component {
  render() {
    console.log('   ChildComponent render ');
    return (
        <div className="child">
          {new Date().toLocaleTimeString()}
          <br/>
          <span>123</span>
        </div>
    );
  }
}