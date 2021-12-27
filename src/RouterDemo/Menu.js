import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
        <div className="menu-container">
          <NavLink to="/Home" activeclassname="active-home">Home</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/Async" activeclassname="active">Async 组件</NavLink>
          <NavLink to="/Default" activeclassname="active">Default</NavLink>
        </div>
    );
  }
}
