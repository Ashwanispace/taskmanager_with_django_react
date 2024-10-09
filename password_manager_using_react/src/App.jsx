import Navbar from './components/Navbar';
import Manager from './components/Manager';



function App() {


  return (
    <>

<div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 first-line:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <Navbar />
        <Manager />
      </div>




    </>
  )
}

export default App
