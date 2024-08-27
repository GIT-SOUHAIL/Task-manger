import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
      <section className="flex mx-auto justify-between items-center ">

        <Link to={'/'}>
        <div className="font-medium  md:text-[30px] ">
            MARKPLACE 
        </div>
        </Link>

        <div className="flex justify-between items-center rounded-[3px] px-4  bg-gray-100/40  border-[1px] border-black/55 w-20 md:w-[350px] ">
            <input type="text" placeholder="Search...." className='outline-none'/>
            <FaSearch />
        </div>

        <div className="space-x-4">
          <Link to={'/'}>
          <button>Home</button>
          </Link> 
          <Link to={'/about'}>
          <button>About</button>
          </Link> 
          <Link to={'/signin'}>
          <button>SignIn</button>
          </Link> 
          <Link to={'/signup'}>
          <button>SignUp</button>
          </Link> 
        </div>

      </section>
    </header>
  )
}

export default Header
