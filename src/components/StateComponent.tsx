import { useEffect } from "react";

import { useCounterStore } from "../store/store";

const setCount = () => {
    useCounterStore.setState({ count: 5 })
}
  
export const StateComponent = ({ count }: { count: number }) => {

    const incrementAsnc = useCounterStore((state) => state.incrementAsync);
  
    const decrement = useCounterStore((state) => state.decrement);
  
    useEffect(() => {
      setCount();
    }, []);
  
    return (
      <div>
        { count }
        <div className='flex gap-2'>
          <button onClick={incrementAsnc} className='bg-green-500 px-2 py-1'>
            IncrementAsync
          </button>
          <button onClick={decrement} className='bg-green-500 px-2 py-1'>
            Decrement
          </button>
        </div>
      </div>
    );
  };