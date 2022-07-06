import Head from 'next/head'
import Link from 'next/link'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/'

export async function getServerSideProps({query}){
  const { id } = query
  const res = await fetch(`${defaultEndpoint}/${id}`)
  const data = await res.json()
  
  return{
    props: {
      data
    }
  }
}

export default function Character({data}) {
  const {name,image,gender,location,origin,species,status} = data
  return (
    <div className="container"> 
        <h2>Character details</h2>
        <div>
          <img src={image}/>
        </div>
          <ul className="detail">
            <li><strong>Name: </strong>{name}</li>
            <li><strong>Gender: </strong> {gender}</li>
            <li><strong>Location: </strong>{location?.name}</li>
            <li><strong>Origin:</strong>{origin?.name}</li>
            <li><strong>Specie: </strong>{species}</li>
            <li><strong>Status:</strong>{status}</li>
          </ul>
      <Link href="/">
        <a className="back">Back to home</a>
      </Link>
    </div>
  )
}
