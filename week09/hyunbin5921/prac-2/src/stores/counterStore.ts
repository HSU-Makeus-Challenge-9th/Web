import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  random: () => void;
}
//상태에 대한 정의
interface CounterState {
  count: number;
  randomNumber: number;

  actions: CounterActions;
}

export const useCounterStore = create<CounterState>()(
  devtools((set) => ({
    count: 0,
    randomNumber: 0,
    actions: {
      increment: () =>
        set(
          (state): { count: number } => ({
            count: state.count + 1,
          }),
          false,
          "increment"
        ),
      decrement: () =>
        set((state): { count: number } => ({
          count: state.count - 1,
        }),false, 'decrement'),

      random: () => {
        set((): { randomNumber: number } => ({
          randomNumber: Math.floor(Math.random() * 100),
        }), false, 'random');
      },
    },
  }))
);

export const useCounterActions = () =>
  useCounterStore((state): CounterActions => state.actions);
