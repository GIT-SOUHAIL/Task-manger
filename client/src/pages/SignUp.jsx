

const SignUp = () => {
  return (
    <section className="mt-[5rem]">
      <form className="flex flex-col gap-[1rem] w-[400px] mx-auto">
        <input className="w-[400px] border-[1px] px-2 rounded-sm " type="text" placeholder="Username" />
        <input className="w-[400px] border-[1px] px-2 rounded-sm " type="text" placeholder="Email" />
        <input className="w-[400px] border-[1px] px-2 rounded-sm " type="text" placeholder="Password" />
        <button className="px-4 py-1 border-[1px] rounded-sm bg-slate-400 ">Sign up</button>
      </form>
    </section>
  )
}

export default SignUp
