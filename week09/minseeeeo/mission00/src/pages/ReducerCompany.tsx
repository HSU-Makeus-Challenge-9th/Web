import { useReducer, useState, type ChangeEvent } from "react";

type TActionType = "CHANGE_DEPT" | "RESET";

interface IState {
  department: string;
  error: string | null;
}
interface IAction {
  type: TActionType;
  payload?: string;
}
const initialState = {
  department: "SW Developer",
  error: null,
};
function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPT": {
      const newDept = payload;
      const hasError = newDept !== "카드메이커";

      return {
        ...state,
        department: hasError ? state.department : newDept,
        error: hasError
          ? "거부권 행사 가능, 카드메이커만 입력 가능합니다."
          : null,
      };
    }
    case "RESET": {
      return {
        ...state,
        department: "SW Developer",
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}

const ReducerCompany = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [dept, setDept] = useState("");

  const handleChangeDept = (e: ChangeEvent<HTMLInputElement>) => {
    setDept(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-screen justify-center items-center gap-3">
        <h1 className="text-5xl text-center">{state.department}</h1>
        {state.error && <p className="text-lg text-red-500">{state.error}</p>}

        <div className="w-full flex justify-center items-center gap-5">
          <input
            placeholder="변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
            className="w-[50%] border border-gray-300 rounded-lg px-2 py-1"
            value={dept}
            onChange={handleChangeDept}
          />
          <div className="flex gap-1">
            <button
              className="bg-blue-200 rounded-lg p-2 hover:bg-blue-400 cursor-pointer duration-300"
              onClick={() => dispatch({ type: "CHANGE_DEPT", payload: dept })}
            >
              직무 변경하기
            </button>
            <button
              className="bg-blue-200 rounded-lg p-2 hover:bg-blue-400 cursor-pointer duration-300"
              onClick={() => dispatch({ type: "RESET" })}
            >
              리셋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReducerCompany;
