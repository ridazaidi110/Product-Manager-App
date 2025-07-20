import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Create from './Components/Create';
import Edit from './Components/Edit' ;


function App() {
  const {search , pathname} = useLocation();
  console.log(search);
  console.log(pathname);
  return (
    <>
    <div className='flex'>
      {(pathname != '/' || search.length>0) &&
       <Link 
      to='/'
      className='text-red-500 absolute left-[18%] top-[2%] px-2 bg-blue-200 rounded  '
      >Home 
      </Link>
    }
     
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/Details/:id' element={<Details/>}></Route>
        <Route path='/Edit/:id' element={<Edit/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App