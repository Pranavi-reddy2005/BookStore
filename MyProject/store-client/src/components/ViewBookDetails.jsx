import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, IndianRupee } from 'lucide-react';
import { GrLanguage } from 'react-icons/gr';
import { useParams } from 'react-router-dom';


const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialized to `null` for clarity
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/books/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch book details. Please try again later.');
            } finally {
                setLoading(false); // Ensure loading state updates in both success and error cases
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                <p className='text-red-500 text-lg'>{error}</p>
            </div>
        );
    }

    return (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
            {data && (
                <>
                    <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>
                        <img
                            src={data.url}
                            alt={data.title}
                            className='h-[50vh] lg:h-[70vh] rounded'
                        />
                    </div>
                    <div className='p-4 w-full lg:w-3/6'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
                        <p className='text-zinc-400 mt-1'>by {data.author}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
                        <p className='flex mt-4 items-center text-zinc-400'>
                            <GrLanguage className='mr-3' /> {data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold flex items-center'>
                            Price: <IndianRupee className='ml-2' /> {data.price}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};


                  


export default ViewBookDetails


