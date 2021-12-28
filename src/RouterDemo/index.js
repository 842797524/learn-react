import {Component, lazy, Suspense} from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
  Outlet,
  useRoutes,
} from 'react-router-dom';
import Menu from './Menu';

// suspense 异步加载组件
function AsyncSuspense() {
  const AsyncComp = lazy(() => import('./AsyncComp.js'));
  return (
      <Suspense fallback={<div className="loading">loading</div>}>
        <AsyncComp/>
      </Suspense>
  );
}

// 包装 Router
function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Child {...{...props, location, navigate, params}}/>;
  };
}

// Home 组件
class Home extends Component {
  go = (childIndex) => {
    const {navigate} = this.props;
    navigate('/Home/child/' + childIndex, {state: {params: 'Hoo'}});
    console.log('childIndex', childIndex, this);
  };

  render() {
    return (
        <div className="home">
          <div className="title"> home 类组件子路由</div>
          <div className="nav-container"
               style={{color: 'blue', cursor: 'pointer'}}>
            <span onClick={() => this.go(1)}>子路由</span>
            <span onClick={() => this.go(2)}
                  style={{marginLeft: '20px'}}>子路由2</span>
          </div>
          <Outlet/>
        </div>
    );
  }
}

// HomeChild 组件
class HomeChild extends Component {
  render() {
    const {params: {index}, location: {state}} = this.props;
    return (<div className="home-child">
      <span>这是第{index}个 child --- useParams</span>
      <span>参数： {state.params} --- useLocation</span>
    </div>);
  }
}

const HomeWrapper = withRouter(Home);
const HomeChildWrapper = withRouter(HomeChild);

// About 组件
function About() {
  return (
      <div className="about">
        <div className="title">about hooks 组件</div>
      </div>
  );
}

// 默认组件 (匹配 *，和定义属性无关)
function DefaultComp() {
  return (
      <div className="default-comp">
        这是默认组件
      </div>
  );
}

// 使用Hooks 方式定义 routes
function CreateRoutes() {
  const element = useRoutes([
    {
      path: '/Home',
      element: <HomeWrapper/>,
      children: [
        {
          path: 'Child/:index',
          element: <HomeChildWrapper/>,
        },
      ],
    },
    {
      path: '/About',
      element: <About/>,
    },
    {
      path: '/Async',
      element: <AsyncSuspense/>,
    },
    {
      path: '/Default',
      element: <DefaultComp/>,
    },
  ]);
  return element;
}

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Menu/>
          {/*<Routes>
            <Route path="/Home" element={<HomeWrapper/>}>
              <Route path="child" element={<HomeChildWrapper/>}/>
              <Route path="child/:index" element={<HomeChildWrapper/>}/>
            </Route>
            <Route path="/About" element={<About/>}/>
            <Route path="/Async" element={<AsyncSuspense/>}/>
            <Route path="*" element={<DefaultComp/>}/>
          </Routes>*/}
          <CreateRoutes />
        </BrowserRouter>
    );
  }
}

export default App;