import { useState,useEffect } from "react"
import Head from 'next/head'
import Link from 'next/link'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character'

export async function getServerSideProps(){
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  
  return{
    props: {
      data
    }
  }
}

export default function Home({data}) {
  const {info,results: defaultResults = []} = data
  const[results,updateResults] = useState(defaultResults)
  const[page,updatePage] = useState({
...info,
current: defaultEndpoint
})

  const { current } = page

   useEffect(() => {
    if(current === defaultEndpoint) return
    
    async function request(){
      const res = await fetch(current)
      const nextData = await res.json()

      updatePage({
        current,
        ...nextData.info
      })
      
      if(!nextData.info?.prev){
        updateResults(nextData.results)
        return
      }
      
      updateResults(prev => {
        return[
          ...prev,
          ...nextData.results
        ]
      })
    }
    request()
  },[current])

 
  function handleOnSubmitSearch(e){
    e.preventDefault()

    const {currentTarget = {}} = e
    const fields = Array.from(currentTarget?.elements)
    const fieldQuery = fields.find(field => field.name === 'query')

    const value = fieldQuery.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    updatePage({
      current: endpoint
    })
  }
  
  return (
    <div className="container"> 
      <Head>
      </Head>
        <form 
          onSubmit={handleOnSubmitSearch}
          className="search">
          <input name="query" type="search"/>
          <button>Search</button>
        </form>
        <ul className="list">
          {results.map(result => {
            const {id,name,image} = result
            return(
              <li key={id}>
                <Link href="/character/[id]" as={`/character/${id}`}>
                <a>
                  <h3>{name}</h3>
                  <img src={image}/>
                </a>
               </Link>
              </li>
            )
          })}
        </ul>
    </div>
  )
}
