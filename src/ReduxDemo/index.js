import {Component} from 'react';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {increment} from './actions/count';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
);

function ConnectContainer(Component, actions) {
  return connect(state => state, actions)(Component);
}

class ReduxDemo extends Component {
  render() {
    console.log('ReduxDemo: props', this.props);
    const {count, increment} = this.props;
    return (
        <div className="redux-demo">
          <div className="title">level 1 -> redux-demo</div>
          <div>
            <span style={{color: 'red'}}>显示的count: {count.value}</span>
          </div>
          <hr/>
          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}

const ReduxDemoContainer = ConnectContainer(ReduxDemo, {increment});

class ReduxChild extends Component {
  render() {
    return (
        <div className="redux-demo" style={{marginLeft: 20}}>
          <div className="title">level 1-1 -> redux-demo</div>
          <hr/>
          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}

class ReduxGrandson extends Component {
  incrementCount = (increment, count) => {
    increment(1);
  };

  render() {
    console.log('ReduxGrandson: props>', this.props);
    const {increment, count} = this.props;
    return (
        <div className="redux-demo" style={{marginLeft: 40}}>
          <div className="title">level 1-1-1 -> ReduxGrandson</div>
          <div>
            <button
                onClick={this.incrementCount.bind(this, increment, count)}>count
              + 1
            </button>
          </div>
          <hr/>
          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}

const ReduxGrandsonContainer = ConnectContainer(ReduxGrandson, {increment});

function ReduxGrandson2(props, context) {
  return (
      <div className="redux-demo" style={{marginLeft: 40}}>
        <div className="title">level 1-1-2 -> ReduxGrandson2</div>
        <hr/>
        <div>
          {props.children}
        </div>
      </div>
  );
}

function ReduxGrandsonLast(props, context) {
  return (
      <div className="redux-demo" style={{marginLeft: 60}}>
        <div className="title">level 1-1-2-1 -> ReduxGrandsonLast</div>
      </div>
  );
}

class ReduxApp extends Component {
  render() {
    return (
        <Provider store={store}>
          <ReduxDemoContainer>
            <ReduxChild>
              <ReduxGrandsonContainer/>
              <ReduxGrandson2>
                <ReduxGrandsonLast/>
              </ReduxGrandson2>
            </ReduxChild>
          </ReduxDemoContainer>
        </Provider>

    );
  }
}

export default ReduxApp;