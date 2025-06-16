import Movies from '@/components/Movies';
import React from 'react'

const Page = async ({searchParams}) => {

  const res = await fetch(`https://api.themoviedb.org/3/${searchParams.genre ? "movie/" + searchParams.genre : "trending/all/day"}`, 
    {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,  // güvenli şekilde ENV'den al
    accept: "application/json",
  },
  next: { revalidate: 10000 },
}
);

  const data = await res.json();

  console.log(data, "data")

  return (
    <div className='flex items-center justify-center flex-wrap gap-3'>
    {
      data?.results?.map((dt,i) => (
        <Movies key={i} dt={dt} />
      ))
    }
    </div>
  )
}

export default Page
