import React from 'react'
import Image from 'next/image';

 const getMovie = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`,{
        headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,  // güvenli şekilde ENV'den al
    accept: "application/json",
  },
  next: { revalidate: 10000 },
    });

    return await res.json();
  
 };



const Page = async ({params}) => {
    const id = params.id;
    const movieDetail = await getMovie(id)

     
   
  return (
    <div className='relative p-7 win-h-screen'>
       <Image 
       style={{objectFit:"cover"}}
      width={470}
        height={300}
      src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path || movieDetail?.poster_path}`} />
    <div className='absolute'>
<div className='text-4xl font-bold my-3'>{movieDetail?.title} </div>
<div className='w-1/2'>{movieDetail?.overview}</div>
 <div className='my-3'> {movieDetail?.release_date} - {movieDetail?.vote_average}</div>
    <div className='my-2 border w-32 hover:bg-white hover:text-black p-2 rounded-md text-center cursor-pointer'>Trail</div>
    </div>
    </div>
  )
}

export default Page
