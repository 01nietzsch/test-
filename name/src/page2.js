import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
};


export default class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date("2022-11-01"),
            endDate: new Date("2022-11-30"),
            market: "BTCUSD",
            status: "",
            chartData: null
        };
    }

    updateMarket(event) {
        this.setState({market: event.target.value});
    }

    setStatus(status) {
        this.setState({status: status});
    }

    toChartData(data) {
        console.log(data["list"]);
        let labels = data["list"].map((item) => new Date(parseInt(item["fundingRateTimestamp"])).toLocaleDateString());
        return {
            labels,
            datasets: [
              {
                label: this.state.market,
                data: data["list"].map((item) => item["fundingRate"]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }
            ],
          };
    }

    loadData() {
        this.setStatus("Loading...");
        let url = `https://api-testnet.bybit.com/derivatives/v3/public/funding/history-funding-rate?category=linear&symbol=${this.state.market}&startTime=${this.state.startDate.getTime()}&endTime=${this.state.endDate.getTime()}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setStatus("Done!");
                this.setState({chartData: this.toChartData(data["result"])});
                console.log(data);
            });
    }

    render() {
        return (
            <div>
                <h1>Page 2 {this.state.market}</h1>
                <DatePicker selected={this.state.startDate} onChange={(date) => this.setState((prevState) => {
                    return {
                        startDate: date
                    };
                })} />
                <DatePicker selected={this.state.endDate} onChange={(date) => this.setState((prevState) => {
                    return {
                        endDate: date
                    };
                })} />
                <input type="text" value={this.state.market} onChange={(event) => this.updateMarket(event)} />
                <button onClick={() => this.loadData()}>Get funding rate</button>
                {this.state.status}
                {this.state.chartData != null ? <Line options={options} data={this.state.chartData} /> : null}
            </div>
        );
    }
}

