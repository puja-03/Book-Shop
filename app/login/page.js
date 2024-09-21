import LoginForm from "../components/LoginForm"

const page = () => {
    return (
      <div className="flex px-10 py-5 justify-center gap-10">
      <div className="w-1/3 items-center bg-gray-400 shadow border rounded">
        <h1 className="text-2xl text-black mt-4 p-3 ">Login here</h1>
       <LoginForm/>
      </div>
      
    </div>
    )
  }
  
  export default page