import {MyContext} from './context';
import './App.css';
// import Demo from './Demo1';
// import RouterDemo from './RouterDemo';
import ReduxApp from './ReduxDemo';
import HooksDemo from './HooksDemo';

const contextObj = {
  name: 'contextObj-value',
  arr: [1, 2],
  child: {
    name: 'child',
  },
};
setTimeout(() => {
  contextObj.name = 10;
}, 1000);

function App() {
  return (
      <>
        <HooksDemo/>
        <MyContext.Provider value={contextObj}>
          <div className="App">
            {/*<Demo></Demo>*/}
            {/*<RouterDemo/>*/}
            {/*<ReduxApp/>*/}
          </div>
        </MyContext.Provider>
      </>
  );
}

export default App;
