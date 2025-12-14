import { useReducer, useState, ChangeEvent } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT";
  payload: string;
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "CHANGE_DEPARTMENT":
      const newDepartment = action.payload;

      if (newDepartment !== "Card Maker") {
        return {
          ...state,
          error: "Card Maker만 입력 가능합니다. (거부권 행사 가능)",
        };
      } else {
        return {
          ...state,
          department: newDepartment,
          error: null,
        };
      }
    default:
      return state;
  }
}

const initialState: IState = {
  department: "Software Developer",
  error: null,
};

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [departmentInput, setDepartmentInput] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartmentInput(e.target.value);
  };

  const handleClick = () => {
    dispatch({ type: "CHANGE_DEPARTMENT", payload: departmentInput });
  };

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold">{state.department}</h1>

        {state.error && (
          <span className="text-red-500 text-xl font-bold">{state.error}</span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={departmentInput}
          onChange={handleChangeDepartment}
          placeholder="변경하시고 싶은 직무를 입력해 주세요 (단 거부권 행사 가능)"
          className="border border-gray-300 p-2 rounded w-[600px]"
        />

        <button
          onClick={handleClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-32 hover:bg-indigo-700 transition"
        >
          직무 변경하기
        </button>
      </div>
    </div>
  );
}
