import Search from './search';
import List from './list';
import {useState} from 'react';
import PureComponent from './PureComponent';

export default function App() {
  const [searchContent, setSearchContent] = useState('');
  return (
      <div className="app">
        <Search {...{searchContent, setSearchContent}}/>
        <List searchContent={searchContent}/>
        <PureComponent/>
      </div>
  );
}