
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import {collection,getDocs,query,where,orderBy,limit,startAfter} from 'firebase/firestore'
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
function Offers() {
    const params=useParams()
    const [listings,setListings]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchListings = async()=>{
            try {
                const listingsRef=collection(db,'listings')
                const q=query(listingsRef,where('offer','==',true)
                ,orderBy('timestamp','desc'),limit(10))
            
                const querySnap = await getDocs(q) 
                
                let listings = []

                querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
                

            } catch (error) {
                toast.error('Could not fetch Listings')
            }

        }
        fetchListings()

    },[])
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
            Offers
        
        </p>
        {loading ? <Spinner/>:listings && listings.length > 0 ? 
        <>
            <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
              ))}
            </ul>
          </main>
        </> 
        
        : <p>There are no current offers</p>}
      </header>
    </div>
  )
}

export default Offers
