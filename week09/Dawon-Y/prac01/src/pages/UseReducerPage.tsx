'use client';

import React, { useReducer, useState } from 'react';

// 1. 상태(State)의 타입 정의
interface IState {
  counter: number;
}

// 2. 액션(Action)의 타입 정의
interface IAction {
  type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
  payload?: number;
}

// 3. 리듀서(Reducer) 함수 정의
const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'INCREASE':
      // payload가 없으면 기본값 1을 사용하여 1씩 증가
      return { ...state, counter: state.counter + (action.payload ?? 1) };
    case 'DECREASE':
      return { ...state, counter: state.counter - 1 };
    case 'RESET_TO_ZERO':
      return { ...state, counter: 0 };
    default:
      return state;
  }
};

export default function UseReducerPage() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const buttonStyle = "bg-gray-50 text-gray-600 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-gray-100 active:scale-95 transition-all";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-20 p-10">
      
      {/* 1. useState 사용 부분 */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl font-bold text-slate-600">useState</h2>
        <p className="text-xl font-medium text-slate-500 mb-2">
          useState 훅 사용: {count}
        </p>
        
        <button 
          className={buttonStyle}
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
      </div>

      {/* 2. useReducer 사용 부분 */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-5xl font-bold text-slate-600">useReducer</h2>
        
        <p className="text-3xl font-medium text-slate-500 mb-4">
          useReducer 훅 사용: {state.counter}
        </p>
        
        <div className="flex gap-3">
          <button 
            className={buttonStyle}
            onClick={() => dispatch({ type: 'INCREASE' })}
          >
            Increase
          </button>
          
          <button 
            className={`${buttonStyle} uppercase`}
            onClick={() => dispatch({ type: 'DECREASE' })}
          >
            Decrease
          </button>
          
          <button 
            className={buttonStyle}
            onClick={() => dispatch({ type: 'RESET_TO_ZERO' })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}