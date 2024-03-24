import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import {doc,getDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


export default function Contact() {

const [message,setMessage]=useState('')
const [landLord,setLandLord]=useState('')
const [searchParams,setSearchParams]=useSearchParams()

const params=useParams()

useEffect(()=>{

const getLandLord= async() =>{
const docRef=doc(db,'users',params.landlordId)
const docSnap= await getDoc(docRef)

if(docSnap.exists()){

    setLandLord(docSnap.data())
}

if(!docSnap.exists()){

    toast.error('Could not find Land Lord')
}

}
getLandLord()
},[params.landLordId])


const onChange =(e)=>{

setMessage(e.target.value)
}
  return (
    <div className='pageContrainer'>
        <header>
        <p className="pageHeader">Contact Landlord</p>

        </header>

        {landLord !==null && (

            <main>
                <div className="contactLandlord">
                    <p className="landlordName">Contact {landLord?.name}</p>
                </div>

                <form className='messageForm'>

                    <div className="messageDiv"></div>
                    <label htmlFor="message" className='messageLabel'>Message</label>
                    <textarea name="message" id="message" className='textarea'value={message} onChange={onChange} ></textarea>

                    <a href={`mailto:${landLord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>

                        <button type='button' className="primaryButton">Send Message</button>

                    </a>
                </form>

            </main>

        )}
    </div>
  )
}
