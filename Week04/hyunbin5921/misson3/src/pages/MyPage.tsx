import { useEffect } from "react"
import { getMyInfo } from "../apis/auth"

const myPage = () => {
  
    useEffect(()=> {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response)
        }

        getData()
    }, [])
  
    return (
    <div>myPage</div>
  )
}

export default myPage