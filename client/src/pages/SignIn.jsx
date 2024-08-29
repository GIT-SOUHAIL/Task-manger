import { useRef, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'


const SignIn = () => {
  const navigate = useNavigate()
  const [data , setData] = useState({})

  const [erroremail , setErroremail] = useState({})
  const [errorpass , setErrorpass] = useState({})

  const email = useRef()
  const pass = useRef()



  //? this function add to get data 
  const getData =(e) => {

    setData({...data , [e.target.id] : e.target.value  })
    catchError()

  }



    //? function for handleerros
    const catchError = () => {
        
      if( email.current.value == "" )  setErroremail({  'email' : true }) 
      if(!email.current.value == "" )  setErroremail({  'email' : false }) 
       
      if( pass.current.value == "" )  setErrorpass({   'pass' : true }) 
      if(!pass.current.value == "" )  setErrorpass({   'pass' : false }) 
        
       //console.log(erroremail)
       //console.log(errorpass)
  
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
      //console.log(newres.msg)
      email.current.value = ""
      pass.current.value = ""
      //? when the response of server is true that mean the user that he insert his information
      //? in validation input is exist in the data base so allow him to navigate to home page 
      if(newres.msg) return navigate('/')

    }catch (err) {
      console.log(err)
    }
  }


  return (
    <section className="mt-[5rem]">
      <form onSubmit={sendData} className="flex flex-col gap-[1rem] w-[400px] mx-auto">
        <input ref={email} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="Email" placeholder="Email" />
        <p className="text-red-500">{erroremail.email ? 'add email ' : ''}</p>
        <input ref={pass} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="password" id="Password" placeholder="Password" />
        <p className="text-red-500">{errorpass.pass ? 'add password' : ''}</p>
        <button className="px-4 py-1 border-[1px] rounded-sm bg-slate-400 ">Sign up</button>
        <div className="flex gap-2">
          create acount go to <p className="text-blue-600"><Link to={'/signup'}>SignUp</Link> </p>
        </div>
      </form>
    </section>
  )
}

export default SignIn
