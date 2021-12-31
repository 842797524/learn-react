import {useState, useEffect} from 'react';

/*const Search = (props, context) => {
  const {searchContent, setSearchContent} = props;

  return (
      <div className="search">
        <input type="text" value={searchContent}
               onChange={e => setSearchContent(e.target.value)}/>
        <button onClick={() => setSearchContent('')} style={{marginLeft: 10}}>
          重置
        </button>
      </div>
  );
};
export default Search;*/

function Search() {
  const [count, setCount] = useState(() => {
    console.log('useState');
    return 0;
  });
  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('useEffect return');
    };
  });

  return (
      <div>
        <div>{count}</div>
        <div>
          {console.log('Search render')}
          <button onClick={() => {
            setCount(count + 1);
          }}> + 1
          </button>
          <Item />
        </div>
      </div>
  );
}

function Item() {
  return (
      <div>{console.log('item render')}</div>
  );
}

export default Search;