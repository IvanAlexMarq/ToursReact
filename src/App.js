import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url='https://course-api.com/react-tours-project';

function App() {
  const [loading,setLoading]=useState(true);
  const [tours,setTours]=useState([]);

  //funcion para eliminar un tour
  const removeTour=id=>{
    const newTours=tours.filter(tour=>tour.id!==id);
    setTours(newTours);
  }

  //funcion para llamar a la api
  const fetchTours=async()=>{
    setLoading(true);
    //para cuando exista error llamando a la api
    try {
      const response=await fetch(url);
      const tours=await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
  }
  useEffect(()=>{
    fetchTours();
  },[]);

  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    )
  }
  if(tours.length===0){
    return(
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button onClick={fetchTours} className="btn">refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default App;
