import React from 'react'
import axios from 'axios'
import { Loader2, IndianRupee } from 'lucide-react'
import { GrLanguage } from "react-icons/gr";
import { useParams } from 'react-router-dom';
const ViewBookDetails = () => {
    const { id } = useParams()
    const [Data, setData] = useState();
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get(
                //"http "
            )
            
            setData(response.data.data)
        }
        fetch()
    }, [])
  return (
    <>
    {Data &&(
    <div className='px-4 md:px-12 py-8 hg-zinc-900 flex flex-col md:flex-row gap-8'>
        <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full  lg:w-3/6 flex flex-col md:flex-row items-center justify-center'>
        {" "}
        <img src={Data.url} alt='/' className='h-[50vh] lg:h-[70vh] rounded'/>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
           <h1 className='text-4xl text-zinc-300 font-semibold '>{Data.title}</h1>
           <p className='text-zinc-400 mt-1'>by {Data.author}</p>
           <p className='text-zinc-500 mt-4 text-xl'> {Data.desc}</p>
           <p className='flex mt-4 items-center justyfy-start text-zinc-400'>
             <GrLanguage className='me-3' /> {Data.language}
            </p>
            <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                Price: <IndianRupee /> {Data.price}{" "}
            </p>
        </div>
    </div>
        )}
        {!Data && (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'>
            
            <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
    </div>
        </div>   
            )}
    </>
  )
}


export default ViewBookDetails