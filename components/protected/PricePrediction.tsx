import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'ADA Price Prediction',
    },
  },
}

function extractData(
  response:
    | {
        data: Array<{ timestamp: string; price: number; predict: number }>
      }
    | undefined
) {
  if (!response) {
    return null
  }

  const parsedData = response.data.reverse().reduce(
    (
      acc: { timestamp: string[]; price: number[]; predict: number[] },
      curr: { timestamp: string; price: number; predict: number }
    ) => {
      acc.timestamp.push(curr.timestamp)
      acc.price.push(curr.price)
      acc.predict.push(curr.predict)

      return acc
    },
    { timestamp: [], price: [], predict: [] }
  )

  return {
    labels: parsedData.timestamp,
    datasets: [
      {
        label: 'Predicted Price',
        data: parsedData.predict,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Real Price',
        data: parsedData.price,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
}

export function PricePrediction() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/price-prediction')
      .then((res) => res.json())
      .then((res) => {
        // @ts-ignore
        setData(extractData(res))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="bg-white">
      {data && <Line options={options} data={data} />}
    </div>
  )
}
