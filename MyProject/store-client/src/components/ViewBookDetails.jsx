import React from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
const ViewBookDetails = () => {
    const { id } = useParams()
    const [Data, setData] = useState();
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get(
                " "
            )
            console.log(response)
            setData(response.data.data)
        }
        fetch()
    }, [])
  return (
    <div className='px-12 py-8 hg-zinc-900 flex gap-8'>
        <div className='bg-zinc-800 rounded p-4 h-[88vh]'></div>
        <div className='p-4 w-3/6'></div>
    </div>
  )
}

export default ViewBookDetails