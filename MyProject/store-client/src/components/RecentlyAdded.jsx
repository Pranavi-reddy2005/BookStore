import React, { useEffect, usestate } from 'react'
import axios from 'axios'
import BookCard from './BookCard';
import { Loader2 } from 'lucide-react'
const RecentlyAdded = () => {
    const [Data, setData] = useState();
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get(
                " "
            )
        }
        fetch()
    }, [])

  return (
    <div className='mt-8 px-4'>
        <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
        {!Data &&(
            <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
            <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
        </div>
        )}
        <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grind-cols-4 gap-4'> 
            {Data &&
            Data.map((items, i)=>(
                <div key={i}>
                    <BookCard data={items} />{" "}
                </div> 
            ))}
        </div>
    </div>
  )
}

export default RecentlyAdded