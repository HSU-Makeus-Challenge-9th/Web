import { useShallow } from "zustand/shallow"
import { useCounterStore } from "../stores/counterStore"

export default function RandomNumberGenerator() {
    const {randomNumber, random} = useCounterStore(useShallow((state) => ({
        randomNumber: state.randomNumber,
        random: state.actions.random
    })))
  return (
    <div><h1>{randomNumber}</h1>
    <button onClick={random}>랜덤 번호 생성</button></div>
  )
}
