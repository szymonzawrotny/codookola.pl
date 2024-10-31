"use client"
import {useState} from 'react';
import { AreaChart,Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data1 = [
    {
        date: "24.10.2024",
        value: 5            
    },
    {
        date: "23.10.2024",
        value: 11          
    },
    {
        date: "22.10.2024",
        value: 7          
    }
]

const data2 = [
    {
        date: "24.10.2024",
        value: 22            
    },
    {
        date: "23.10.2024",
        value: 69          
    },
    {
        date: "22.10.2024",
        value: 72          
    }
]

const data3 = [
    {
        date: "24.10.2024",
        value: 35           
    },
    {
        date: "23.10.2024",
        value: 42          
    },
    {
        date: "22.10.2024",
        value: 54          
    }
]

const SaveChart = ()=>{

    const [currentData,setCurrentData] = useState(data1);

    const handleDataChange = (e)=>{
        const option = e.target.value;
        
        switch(option){
            case "week":{
                setCurrentData(data1);
            } break;
            case "month":{
                setCurrentData(data2);
            } break;
            case "year":{
                setCurrentData(data3)
            } break;
        }
    }

    return(
        <>
            <select onChange={handleDataChange}>
            <option value="week">zeszły tydzień</option>
            <option value="month">zeszły miesiąc</option>
            <option value="year">zeszły rok</option>
            </select>
            <ResponsiveContainer height={450}>
                <AreaChart
                    width={900} height={500}
                    data={currentData}
                    style={{backgroundColor:"rgba(203, 224, 242, 0.97)",padding: "15px",boxShadow: "5px 5px 0 0 #222"}}
                    >
                        <CartesianGrid />
                        <XAxis dataKey="date" dy={15}/>
                        <YAxis dx={-5}/>
                        <Area type="monotone" dataKey="value"  stroke="#222" fill="#222" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}
export default SaveChart;