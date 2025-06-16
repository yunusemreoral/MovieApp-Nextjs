import Movies from '@/components/Movies';
import React from 'react'

const Page = async ({params}) => {
    const keyword = params.keyword;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&language=en-US&include_adult=false`, {
        headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,  // güvenli şekilde ENV'den al
    accept: "application/json",
  },
  next: { revalidate: 10000 },
    });

    const data = await res.json();

  

  return (
    <div className='flex items-center justify-center flex-wrap gap-3'>
      {data?.results ? (
data?.results?.map((dt,i) => 
        <Movies key={i} dt={dt} />) ) : (
        <div>Aranılan Film Bulunamadı! </div> 
        )}
      
    </div>
  )
}

export default Page
