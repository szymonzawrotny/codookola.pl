"use client"
import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";


const data1 = [
    {
        date: "24.10.2024",
        value: 152           
    },
    {
        date: "23.10.2024",
        value: 148           
    },
    {
        date: "22.10.2024",
        value: 112           
    }
]

const data2 = [
    {
        date: "24.10.2024",
        value: 152           
    },
    {
        date: "23.10.2024",
        value: 121           
    },
    {
        date: "22.10.2024",
        value: 184           
    }
]

const data3 = [
    {
        date: "24.10.2024",
        value: 152           
    },
    {
        date: "23.10.2024",
        value: 148           
    },
    {
        date: "22.10.2024",
        value: 94           
    },
    {
        date: "22.10.2024",
        value: 142           
    }
]

const ViewChart = ()=>{

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
            <LineChart data={currentData} width={1000} height={500}>
                <CartesianGrid/>
                <Line dataKey="value" dot={false} type="monotone"/>
                <XAxis dataKey="date"/>
                <YAxis />
                {/* <Tooltip/> */}
            </LineChart>
        </>
    )
}
export default ViewChart;