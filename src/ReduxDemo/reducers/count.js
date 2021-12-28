// import {} from 'redux';
import {COUNT_INCREMENT} from '../constant';

const initState = {value: 0};

export function count(prevState = initState, {type, data}) {
  switch (type) {
    case COUNT_INCREMENT:
      return {...prevState, value: prevState.value + data};
    default:
      return prevState;
  }
}
