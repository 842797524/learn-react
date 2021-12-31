import {useState, useEffect, useMemo} from 'react';

export default function List(props, context) {
  const {searchContent} = props;
  const initList = [
    {id: 1, name: 'aaa', show: true},
    {id: 2, name: 'bbb', show: true},
    {id: 3, name: 'ccc', show: true},
  ];

  const [now, setNow] = useState(new Date());
  const [list, setList] = useState(initList);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setList(list => {
      list.forEach(item => item.show = item.name.includes(searchContent));
      return [...list];
    });
  }, [searchContent]);

  const memoListItems = useMemo(() => {
    return list.map(
        item => <ListItem key={item.name} setList={setList} {...item}/>);
  }, [list]);

  return (
      <>
        <div className="now">{now.toLocaleTimeString()}</div>
        <ul>
          {/*{memoListItems}*/}
          {
            list.map(
                item => item.show &&
                    <ListItem key={item.name} setList={setList} {...item}/>)
          }
        </ul>
      </>
  );
}

function ListItem({id, name, setList}) {
  const [isEdit, changeIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  const btnContent = useMemo(() => {
    return isEdit ? '完成' : '编辑';
  }, [isEdit]);

  const setListItem = (newName) => {
    setList(list => {
      list.find(({id: _id}) => _id === id).name = newName;
      console.log('list', list);
      return [...list];
    });
  };

  useEffect(() => {
    return () => {
      console.log('销毁了');
    };
  }, []);

  return (
      <li>
        {
          isEdit
              ? <input type="text" value={newName}
                       onChange={e => setNewName(e.target.value)}
                       onBlur={() => setListItem(newName)}
              />
              :
              <span>{name}</span>
        }
        <button
            onClick={() => changeIsEdit(!isEdit)}>
          {btnContent}
        </button>
      </li>
  );
}