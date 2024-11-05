"use client"
import { useState } from 'react';
import {LineChart,Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip} from "recharts";


const series = [
  {
    name: 'Wyświetlenia',
    color: "green",
    data: [
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '23.10.24', value: Math.floor(Math.random() *100)},
      { date: '22.10.24', value: Math.floor(Math.random() *100)},
      { date: '21.10.24', value: Math.floor(Math.random() *100)},
      { date: '20.10.24', value: Math.floor(Math.random() *100)},
      { date: '19.10.24', value: Math.floor(Math.random() *100)},
      { date: '18.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
  {
    name: 'Polubienia',
    color: "blue",
    data: [
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '23.10.24', value: Math.floor(Math.random() *100)},
      { date: '22.10.24', value: Math.floor(Math.random() *100)},
      { date: '21.10.24', value: Math.floor(Math.random() *100)},
      { date: '20.10.24', value: Math.floor(Math.random() *100)},
      { date: '19.10.24', value: Math.floor(Math.random() *100)},
      { date: '18.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
  {
    name: 'Zapisania',
    color: "red",
    data: [
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '23.10.24', value: Math.floor(Math.random() *100)},
      { date: '22.10.24', value: Math.floor(Math.random() *100)},
      { date: '21.10.24', value: Math.floor(Math.random() *100)},
      { date: '20.10.24', value: Math.floor(Math.random() *100)},
      { date: '19.10.24', value: Math.floor(Math.random() *100)},
      { date: '18.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
];

const series2 = [
  {
    name: 'Wyświetlenia',
    color: "green",
    data: [
      { date: '07.10.24', value: Math.floor(Math.random() *100)},
      { date: '14.10.24', value: Math.floor(Math.random() *100)},
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '28.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
  {
    name: 'Polubienia',
    color: "blue",
    data: [
      { date: '07.10.24', value: Math.floor(Math.random() *100)},
      { date: '14.10.24', value: Math.floor(Math.random() *100)},
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '28.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
  {
    name: 'Zapisania',
    color: "red",
    data: [
      { date: '07.10.24', value: Math.floor(Math.random() *100)},
      { date: '14.10.24', value: Math.floor(Math.random() *100)},
      { date: '24.10.24', value: Math.floor(Math.random() *100)},
      { date: '28.10.24', value: Math.floor(Math.random() *100)},
    ],
  },
];

const series3 = [
  {
    name: 'Wyświetlenia',
    color: "green",
    data: [
      { date: 'Styczeń', value: Math.floor(Math.random() *100)},
      { date: 'Luty', value: Math.floor(Math.random() *100)},
      { date: 'Marzec', value: Math.floor(Math.random() *100)},
      { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
      { date: 'Maj', value: Math.floor(Math.random() *100)},
      { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
      { date: 'Lipiec', value: Math.floor(Math.random() *100)},
      { date: 'Sierpień', value: Math.floor(Math.random() *100)},
      { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
      { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
      { date: 'Listopad', value: Math.floor(Math.random() *100)},
      { date: 'Grudzień', value: Math.floor(Math.random() *100)},
    ]
  },
  {
    name: 'Polubienia',
    color: "blue",
    data: [
      { date: 'Styczeń', value: Math.floor(Math.random() *100)},
      { date: 'Luty', value: Math.floor(Math.random() *100)},
      { date: 'Marzec', value: Math.floor(Math.random() *100)},
      { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
      { date: 'Maj', value: Math.floor(Math.random() *100)},
      { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
      { date: 'Lipiec', value: Math.floor(Math.random() *100)},
      { date: 'Sierpień', value: Math.floor(Math.random() *100)},
      { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
      { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
      { date: 'Listopad', value: Math.floor(Math.random() *100)},
      { date: 'Grudzień', value: Math.floor(Math.random() *100)},
    ],
  },
  {
    name: 'Zapisania',
    color: "red",
    data: [
      { date: 'Styczeń', value: Math.floor(Math.random() *100)},
      { date: 'Luty', value: Math.floor(Math.random() *100)},
      { date: 'Marzec', value: Math.floor(Math.random() *100)},
      { date: 'Kwiecień', value: Math.floor(Math.random() *100)},
      { date: 'Maj', value: Math.floor(Math.random() *100)},
      { date: 'Czerwiec', value: Math.floor(Math.random() *100)},
      { date: 'Lipiec', value: Math.floor(Math.random() *100)},
      { date: 'Sierpień', value: Math.floor(Math.random() *100)},
      { date: 'Wrzesień', value: Math.floor(Math.random() *100)},
      { date: 'Pazdziernik', value: Math.floor(Math.random() *100)},
      { date: 'Listopad', value: Math.floor(Math.random() *100)},
      { date: 'Grudzień', value: Math.floor(Math.random() *100)},
    ],
  },
];

const ViewChart = ()=>{

    const [currentData,setCurrentData] = useState(series);
    const handleDataChange = (e)=>{
        const option = e.target.value;
        
        switch(option){
            case "week":{
                setCurrentData(series);
            } break;
            case "month":{
                setCurrentData(series2);
            } break;
            case "year":{
                setCurrentData(series3)
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
                <LineChart
                    width={900} height={520}
                    data={currentData}
                    style={{backgroundColor:"#FFE97F",padding: "15px", borderRadius: "15px"}}
                    >
                        <CartesianGrid strokeDasharray="3 3" type="category"/>
                        <XAxis dataKey="date" dy={15} type="category" allowDuplicatedCategory={false}/>
                        <Legend layout="horizontal" verticalAlign="top" align="center"/>
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