import { getAuth,updateProfile } from "firebase/auth"
import {updateDoc,doc,deleteDoc,collection,query,where,orderBy, getDocs} from 'firebase/firestore'
import { db } from "../firebase.config"
import { useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import rightArrow from '../assets/svg/rightArrow.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails,setChangeDetails]=useState(false)
  const[listings,setListings]=useState(null)
  const[loading,setLoading]=useState(true)
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const {name,email}=formData

  const onLogout =()=>{
    auth.signOut()
    navigate('/')
  }

useEffect(()=>{

const fetchUserListings = async()=>{

  const listingsRef = collection(db,'listings')

  const q=query(listingsRef,where('useRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))

  const querySnap= await getDocs(q)

  let listings = []


  querySnap.forEach((doc)=>{

    return listings.push({
      id:doc.id,
      data:doc.data()

    })
  })
  setListings(listings)
  setLoading(false)

}
fetchUserListings()
}, [auth.currentUser.uid])

  const onSubmit = async ()=>{
    try {
      if(auth.currentUser.displayName !== name){
      await updateProfile(auth.currentUser,{
        displayName:name,
      })

      const userRef= doc(db,'users',auth.currentUser.uid)
      await updateDoc(userRef,{
        name
      })

    }
    } catch (error) {
      toast.error('Could not update profile details')
    }
    
  }
  const onChange = (e)=>{

    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))

  }

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile
      <button type="button" className="logOut" onClick={onLogout}>LogOut</button>
      
      </p>
    </header>
  <main>
    <div className="profileDetailsHeader">
      <p className="profileDetailsText">Personal Details</p>
      <p className="changePersonalDetails" onClick={()=>{changeDetails && onSubmit() 
        setChangeDetails((prevState)=>!prevState)}}>
        {changeDetails ? 'done':'change'}
      </p>
    </div>
    <div className="profileCard">
      <form>
        <input type="text" id="name" value={name} className={!changeDetails ?'profileName': 'profileNameActive'}
        disabled={!changeDetails}
        onChange={onChange}
        />
        <input type="text" id="email" value={email} className={!changeDetails ?'profileEmail': 'profileEmailActive'}
        disabled={!changeDetails}
        onChange={onChange}
        />

      </form>
    </div>

    <Link to='/create-listing' className="createListing">
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your home</p>
        <img src={rightArrow} alt="arrow right" width='34px' height='34px' />
      </Link>
  </main>
  </div>
    
}

export default Profile
