import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
import { useNavigate, useLocation} from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
function OAuth() {
    const navigate=useNavigate()
    const location=useLocation()

    const onGoogleClick = async()=>{

        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth,provider)
            const user= result.user

            //Check for User
            const docRef=doc(db,'users',user.uid)
            const docSnap = await getDoc(docRef)
            // If user, doesn't exist, create user
            if(!docSnap.exists()){
                await setDoc(doc(db),'users',user.uid,{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')

        } catch (error) {
            toast.error('Could not authorize with google')
        }

    }
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} with</p>
    <button className="socialIconDiv">
        <img src={googleIcon} alt="Google"  onClick={onGoogleClick} className='socialIconImg' />

    </button>
    
    </div>
  )
}

export default OAuth
