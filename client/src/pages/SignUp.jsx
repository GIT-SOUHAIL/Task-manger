import { useRef, useState } from "react"
import {useNavigate} from 'react-router-dom'


const SignUp = () => {
  const navigate = useNavigate()
  const [data , setData] = useState({})
  const [catcherror , setCatcheror] = useState(true)
  const user = useRef()
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
     const res = await fetch('http://localhost:5000/api/auth/signup' , {
          method : 'POST',
          headers : { 'Content-Type': 'application/json',},
          body : JSON.stringify(data) 
     } )
      const newres = res.json() 
      console.log(newres)
      setCatcheror(false)
      user.current.value = ""
      email.current.value = ""
      pass.current.value = ""
      // when all is oke navigate to signin
      navigate('/signin')
    }catch (err) {
      setCatcheror(true)
      console.log(err)
    }
  }


  return (
    <section className="mt-[5rem]">
      <form onSubmit={sendData} className="flex flex-col gap-[1rem] w-[400px] mx-auto">
        <input ref={user} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="UserName" placeholder="Username" />
        <input ref={email} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="Email" placeholder="Email" />
        <input ref={pass} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="password" id="Password" placeholder="Password" />
        <button className="px-4 py-1 border-[1px] rounded-sm bg-slate-400 ">Sign up</button>
       {catcherror ? 'craet your acount' : "successfully create your acounte" }
      </form>
    </section>
  )
}

export default SignUp
