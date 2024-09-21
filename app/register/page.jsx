import Register from "../components/Register"

const page = () => {
    return (
      <div className="flex px-10 py-5 justify-center gap-10">
      <div className="w-1/3 items-center bg-gray-400 shadow border rounded">
        <h1 className="text-2xl text-black mt-4 p-3 ">Create an account</h1>
       <Register/>
      </div>
      
    </div>
    )
  }
  
  export default page