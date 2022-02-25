import { useDispatch, useNinaivu } from '../../ninaivu';

import { increment, decrement, selectCount } from './store';
import './counter.css';

export function Counter() {
  const count = useNinaivu(selectCount);
  const dispatch = useDispatch();

  function stepDown() {
    dispatch(decrement());
  }

  function stepUp() {
    dispatch(increment());
  }

  return (
    <div>
      <button onClick={stepDown}>Step Down</button>
      <span>{count}</span>
      <button onClick={stepUp}>Step Up</button>
    </div>
  );
}
