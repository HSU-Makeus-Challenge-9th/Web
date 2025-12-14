'use client';

import { useReducer, useState, type ChangeEvent } from "react";

// 액션 타입 정의
type TActionType = "CHANGE_DEPARTMENT" | "RESET";

// 상태 인터페이스
interface IState {
  department: string;
  error: string | null;
}

// 액션 인터페이스
interface IAction {
  type: TActionType;
  payload?: string;
}

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload ?? "";
      const hasError = newDepartment !== "카드메이커";
      
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError
          ? "거부권 행사 가능, 카드메이커만 입력 가능합니다."
          : null,
      };
    }
    case "RESET": {
      return {
        ...state,
        department: "Software Developer",
        error: null,
      };
    }
    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: "Software Developer",
    error: null,
  });

  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>): void => {
    setDepartment(e.target.value);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setDepartment(""); 
  };

  return (
    <div className="p-10 flex flex-col gap-6 items-center mt-48">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        {state.department}
      </h1>
      
      <div className="h-8 flex items-center justify-center">
        {state.error && (
          <p className="text-red-500 text-xl font-bold">
            {state.error}
          </p>
        )}
      </div>

      <div className="flex gap-2 items-center w-full justify-center">
        <input
          className="w-full max-w-[500px] border border-gray-300 p-4 rounded-lg text-black shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          placeholder="변경하시고 싶은 직무를 입력해주세요."
          value={department}
          onChange={handleChangeDepartment}
        />

        <button
          className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-md font-semibold whitespace-nowrap
                     hover:bg-blue-600 transition-colors duration-200 
                     active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={(): void =>
            dispatch({
              type: "CHANGE_DEPARTMENT",
              payload: department,
            })
          }
        >
          직무 변경
        </button>
        
        <button
          className="bg-gray-400 text-white px-6 py-4 rounded-lg shadow-md font-semibold whitespace-nowrap
                     hover:bg-gray-500 transition-colors duration-200 
                     active:scale-95 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}