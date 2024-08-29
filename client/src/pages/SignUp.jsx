import { useRef, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'


const SignUp = () => {
  const navigate = useNavigate()
  const [data , setData] = useState({})
  const [erroruser , setErroruser] = useState({})
  const [erroremail , setErroremail] = useState({})
  const [errorpass , setErrorpass] = useState({})
  // eslint-disable-next-line no-unused-vars
  //const [catcherror , setCatcheror] = useState(true)
  const user = useRef()
  const email = useRef()
  const pass = useRef()

  //? this function add to get data 
  const getData =(e) => {
    setData({...data , [e.target.id] : e.target.value  })
    catchError()
    
    //console.log(data)
  }

  //? this when we have a succsessful signup we would wipe the input 
  const wipinput = () => {
    user.current.value = ""
    email.current.value = ""
    pass.current.value = ""
  }

  //? function for handleerros
   const catchError = () => {
       
    if( user.current.value == "" )  setErroruser({  'user' : true }) 
    if(!user.current.value == "" )  setErroruser({  'user' : false }) 
      
    if( email.current.value == "" )  setErroremail({  'email' : true }) 
    if(!email.current.value == "" )  setErroremail({  'email' : false }) 
     
    if( pass.current.value == "" )  setErrorpass({   'pass' : true }) 
    if(!pass.current.value == "" )  setErrorpass({   'pass' : false }) 
      
     //console.log(erroruser)
     //console.log(erroremail)
     //console.log(errorpass)

  }


  const sendData = async (e) => {
     e.preventDefault()
     try {
     const res = await fetch('http://localhost:5000/api/auth/signup' , {
          method : 'POST',
          headers : { 'Content-Type': 'application/json',},
          body : JSON.stringify(data) 
     } )

      //? get the response from server about operation if success or not 
      const newres = await res.json() 
      console.log(newres)

      //setCatcheror(false)
      //? wipe inpute function
        if(newres.msg)  wipinput()


      //? when operation of signup is oke navigate to signin 
      if(newres.msg) navigate('/signin')

    }catch (err) {
      //setCatcheror(true)
      console.log(err)
    }
  }


  return (
    <section className="mt-[5rem]">
      <form onSubmit={sendData} className="flex flex-col gap-[1rem] w-[400px] mx-auto">
        <input ref={user} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="UserName" placeholder="Username" />
        <p className="text-red-500">{erroruser.user ? 'add user name' : ''}</p>
        <input ref={email} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="text" id="Email" placeholder="Email" />
        <p className="text-red-500">{erroremail.email ? 'add email ' : ''}</p>
        <input ref={pass} onChange={getData} className="w-[400px] border-[1px] px-2 rounded-sm " type="password" id="Password" placeholder="Password" />
        <p className="text-red-500">{errorpass.pass ? 'add password' : ''}</p>
        <button className="px-4 py-1 border-[1px] rounded-sm bg-slate-400 ">Sign up</button>
        <div className="flex gap-2">
          have acount go to <p className="text-blue-600"> <Link to={'/signin'}>SignIn</Link> </p>
        </div>
      </form>
    </section>
  )
}

export default SignUp
