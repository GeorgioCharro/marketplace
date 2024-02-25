import {useNavigate, useLocation} from 'react-router-dom'
import { ReactComponent as  ExploreIcon} from '../assets/svg/explore.svg'
import { ReactComponent as  OfferIcon} from '../assets/svg/offer.svg'
import { ReactComponent as  ProfileIcon} from '../assets/svg/profileicon.svg'

function NavBar() {

    const navigate= useNavigate()
    const location=useLocation()

    const pathMatchRoute = (route)=>{

      if(location.pathname===route){
        return true
      }
    }
  return (
    <div className='navbar'>
    <div className="navbarNav">
    <ul className="navbarListItems">
    <li className="navbarListItem" onClick={()=>navigate('/')}>

        <ExploreIcon fill={pathMatchRoute('/')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
        <p className={pathMatchRoute('/')?'navbarListItemNameActive':'navbarListItemName'}>Explore</p>


    </li>

    <li className="navbarListItem" onClick={()=>navigate('/offers')}>

        <OfferIcon fill={pathMatchRoute('/offers')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
        <p className={pathMatchRoute('/offers')?'navbarListItemNameActive':'navbarListItemName'}>Offers</p>


    </li>

    <li className="navbarListItem" onClick={()=>navigate('/profile')}>

        <ProfileIcon fill={pathMatchRoute('/profile')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
        <p className={pathMatchRoute('/profile')?'navbarListItemNameActive':'navbarListItemName'}>Profile</p>


    </li>
    
    
    </ul>
    </div>

      
    </div>
  )
}

export default NavBar
