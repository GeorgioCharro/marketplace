
import { useState } from "react"
import {useNavigate,Link} from 'react-router-dom'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import {ReactComponent as RightArrow} from '../assets/svg/rightArrow.svg'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { db } from "../firebase.config"
import OAuth from "../components/OAuth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
function SignUp() {
  const [showPassword,setShowPassword]=useState(false)
  const[formData,setFormData]=useState({

    email:'',
    password:'',
    name:''
  })

  const {email,password,name}=formData
  const navigate=useNavigate()


  const onChange = (e)=>{

    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))

  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


    




  return (
    <>
      <div className="pageContainer">
        
      <form onSubmit={onSubmit}>
        <input type='text' value={name} className="nameInput" id="name" placeholder="Name" onChange={onChange} />
        <input type='email' value={email} className="emailInput" id="email" placeholder="Email" onChange={onChange} />
        
        <div className="passwordInputDiv">
          <input type={showPassword ? 'text': 'password'} className='passwordInput' placeholder="Password" id='password' value={password} onChange={onChange} />
          <img src={VisibilityIcon} alt="VisibilityIcon" className="showPassword" onClick={ ()=>setShowPassword((prevState)=>!prevState)}/>

        </div>

        <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>


        <div className="signUpBar">
          <p className="signUpText">
            Sign Up
          </p>
          <button className="signUpButton" type="submit" >
          <RightArrow width='36px' height='36px' />
          </button>
        </div>
        
      </form>
      <OAuth />
      <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    
    </>
      
    
  )
}

export default SignUp

