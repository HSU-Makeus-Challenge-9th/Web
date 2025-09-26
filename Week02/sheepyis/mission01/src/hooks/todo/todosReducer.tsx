import type { TodoItem } from "../../types/todo/todo";

export type TodosState = { items: TodoItem[] };

export type TodosAction =
  | { type: "ADD"; text: string }
  | { type: "COMPLETE"; id: number }
  | { type: "REMOVE"; id: number };

export function todosReducer(
  state: TodosState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case "ADD":
      return {
        items: [
          ...state.items,
          { id: Date.now(), text: action.text, type: "todo" },
        ],
      };
    case "COMPLETE":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, type: "doneTodo" } : i
        ),
      };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    default:
      return state;
  }
}
