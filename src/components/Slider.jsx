import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection,getDoc,query,orderBy,limit, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Spinner from "./Spinner"
function Slider() {
    const [loading,setLoading]=useState(true)
    const[listings,setListings]=useState(null)

    const navigate=useNavigate()

    useEffect(()=>{

        const sliderListings= async()=>{
            
        const listingRef=collection(db,'listings')
        const q=query(listingRef,orderBy('timestamp','desc'),limit(5))
        const querySnap=await getDocs(q)
        let listings=[]

        querySnap.forEach((doc)=>{

            return listings.push({
                id:doc.id,
                data:doc.data()

            })
        })
        console.log(listings)
        setListings(listings)
        setLoading(false)
    
    }

     sliderListings()
        

    },[])

    if(loading){
        return <Spinner />
    }
  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>

      <Swiper
      className="customSwiper"
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      scrollbar
      // Add more configurations as needed
    >
      {listings.map(({data,id}) => (
        <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)} >
            <div>

            <img src={data.imgUrls[0]} alt="" className="swiperSlideDiv" style={{backgroundSize:'cover'}}/>
            <p className="swiperSlideText">{data.name}</p>
            <p className="swiperSlidePrice">
                {data.discountedPrice ?? data.regularPrice}
                {data.type==='rent' && '/month'}
            </p>
            </div>
        
        

        
         
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  )
}

export default Slider
