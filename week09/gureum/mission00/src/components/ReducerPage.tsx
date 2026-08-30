import { useReducer, useState } from "react";

// useReducer 관련
interface IState {
  counter: number;
  error: string | null;
}
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET";
  payload?: number;
}
const initialState = { counter: 0, error: null };

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case "INCREASE": {
      return {
        ...state,
        counter: payload ? state.counter + payload : state.counter + 1,
      };
    }
    case "DECREASE": {
      return {
        ...state,
        counter: Math.max(0, state.counter - 1),
      };
    }
    case "RESET": {
      return {
        ...state,
        counter: (state.counter = 0),
      };
    }
    default:
      return state;
  }
}

const ReducerPage = () => {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  // useState 관련
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(Math.max(0, count - 1));
  };

  return (
    <div className="flex flex-col gap-10 h-auto justify-center items-center">
      {/* useState를 사용한 경우 */}
      <div>
        <h2 className="text-2xl">useState</h2>
        <p className="text-xl text-center my-4">{count}</p>

        <div className="flex justify-center gap-2">
          <button
            className="w-10 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
            onClick={handleDecrease}
          >
            -
          </button>
          <button
            className="w-10 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>

      {/* useReducer를 사용한 경우 */}
      <div>
        <h2 className="text-2xl">useReducer</h2>
        <p className="text-xl text-center my-4">{state.counter}</p>

        <div className="flex justify-center gap-2">
          <button
            className="w-10 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
            onClick={() => dispatch({ type: "DECREASE" })}
          >
            -
          </button>
          <button
            className="w-10 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
            onClick={() => dispatch({ type: "INCREASE", payload: 3 })}
          >
            +
          </button>
          <button
            className="w-18 px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-800 cursor-pointer"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReducerPage;