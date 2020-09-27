import React, { useEffect, useRef } from 'react'
import Chart from "chart.js";

export default function Visualization(props) {
    const datasetProperties = {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderCapStyle: 'square',
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
    }

    var options = {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: props.displayList.selectBox1.companyName,
                data: props.displayList.selectBox1.stockValues,
                borderColor: "red",
                ...datasetProperties
            }, {
                label: props.displayList.selectBox2.companyName,
                data: props.displayList.selectBox2.stockValues,
                borderColor: "purple",
                ...datasetProperties
            }, {
                label: props.displayList.selectBox3.companyName,
                data: props.displayList.selectBox3.stockValues,
                borderColor: "green",
                ...datasetProperties
            }, {
                label: props.displayList.selectBox4.companyName,
                data: props.displayList.selectBox4.stockValues,
                borderColor: "blue",
                ...datasetProperties
            },]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Performance',
                        fontSize: 15
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Months',
                        fontSize: 15
                    }
                }]
            }
        }
    }

    var myChart = useRef();

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        if(myChart.current !== undefined) {
            myChart.current.destroy();
        }

        myChart.current = new Chart(ctx, options);
    }, [options]);


    return (
        <div >
            <canvas />
        </div>
    )
};