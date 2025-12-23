import { useReducer } from "react";

interface IState {
  counter: number;
}

interface IAction {
  type: "INCREMENT" | "DECREMENT" | "RESET";
  payload?: number;
}

const initialState: IState = {
  counter: 0,
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + (action.payload ?? 1),
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "RESET":
      return {
        ...state,
        counter: 0,
      };
    default:
      return state;
  }
}

export default function UseReducerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-4">useReducer 사용</h2>

      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-bold">{state.counter}</h1>

        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch({ type: "INCREMENT", payload: 3 })}
          >
            Increse (3)
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            Decrease
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
