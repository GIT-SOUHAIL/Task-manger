import { useRef, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'


const SignIn = () => {
  const navigate = useNavigate()
  const [data , setData] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [catcherror , setCatcheror] = useState(true)
  const email = useRef()
  const pass = useRef()
  // this function add to get data 
  const getData =(e) => {
    setData({...data , [e.target.id] : e.target.value  })
    //console.log(data)
  }

  const sendData = async (e) => {
     e.preventDefault()
     try {
     const res = await fetch('http://localhost:5000/api/auth/signin' , {
          method : 'POST',
          headers : { 'Content-Type': 'application/json',},
          body : JSON.stringify(data) 
     } )
      const newres = await res.json() 
      console.log(newres.msg)
      setCatcheror(false)
      email.current.value = ""
      pass.current.value = ""
      // when all is oke navigate to signin
      if(newres.msg) return navigate('/')

    }catch (err) {
      setCatcheror(true)
      console.log(err)
    }
  }


  return (
    <section className="mt-[5rem]">
      <form onSubmit={sendData} className="flex flex-col gap-[1rem] w-[400px] mx-auto">
        <input ref={email} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="Email" placeholder="Email" />
        <input ref={pass} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="password" id="Password" placeholder="Password" />
        <button className="px-4 py-1 border-[1px] rounded-sm bg-slate-400 ">Sign up</button>
        <div className="flex gap-2">
          create acount go to <p className="text-blue-600">
            
             <Link to={'/signup'}>SignUp</Link> </p>

        </div>

      </form>
    </section>
  )
}

export default SignIn
