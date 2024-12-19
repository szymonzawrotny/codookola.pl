"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {LineChart,Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip} from "recharts";

const ViewChart = ()=>{

  const router = useRouter();

  const {data:session} = useSession({
      required: true,
      onUnauthenticated(){
          router.push("/")
      }

  })

  const [data,setData] = useState([]);
  const [data2,setData2] = useState([]);
  const [data3,setData3] = useState([]);

  const [currentData,setCurrentData] = useState(data);
  const handleDataChange = (e)=>{
      const option = e.target.value;
      
      switch(option){
          case "week":{
              setCurrentData(data);
          } break;
          case "month":{
              setCurrentData(data2);
          } break;
          case "year":{
              setCurrentData(data3)
          } break;
      }
  }
  
  const fetchData = async ()=>{
    
    const response = await fetch("http://localhost:5000/stats",{
      method:"POST",
      body: JSON.stringify({
        id: session?.user?.email?.id
      }),
      headers:{
        "Content-Type": "application/json"
      }
    })

    if(!response.ok){
      console.log("coś nie poszło")
    } else {
      const data = await response.json();

      setData(data.answer)
      setData2(data.answer2)
      setData3(data.answer3)
      setCurrentData(data.answer)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return(
      <>
          <select onChange={handleDataChange}>
              <option value="week">zeszły tydzień</option>
              <option value="month">zeszły miesiąc</option>
              <option value="year">zeszły rok</option>
          </select>
          <ResponsiveContainer height={450}>
              <LineChart
                  width={900} height={520}
                  data={currentData}
                  style={{backgroundColor:"#FFE97F",padding: "15px"}}
                  >
                      <CartesianGrid strokeDasharray="3 3" type="category"/>
                      <XAxis dataKey="date" dy={15} type="category" allowDuplicatedCategory={false}/>
                      <Legend layout="horizontal" verticalAlign="top" align="right"/>
                      <Tooltip />
                      <YAxis dx={-5}/>
                      {currentData.map((s) => (
                          <Line 
                              dataKey="value" 
                              data={s.data} 
                              name={s.name} 
                              key={s.name} 
                              stroke={s.color} 
                              fill={s.color} 
                              />
                      ))}
              </LineChart>
          </ResponsiveContainer>
      </>
  )
}
export default ViewChart;