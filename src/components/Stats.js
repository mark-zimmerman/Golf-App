import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, Label, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis} from 'recharts';
const Stats = (props) => {
    const {userName, setRoundQuantity} = props;
    const [scoreData, setScoreData] = useState([]);
    const [roundsData, setRoundsData] = useState([]);
    const [dataType, setDataType] = useState('');
    const [fwPer, setFwPer] = useState([]);
    const [fwMiss, setFwMiss] = useState([]);
    const [approachMiss, setApproachMiss] = useState([]);
    const [approachPer, setApproachPer] = useState([]);
    const [puttsPer, setPuttsPer] = useState([]);
    
    const getPlayerData = async () => {
        try {
            const response = await axios.post('api/rounds/player-rounds', {username: userName});
            setRoundsData(response.data.rounds);
            console.log('this is player data', response.data.rounds);
        } catch (error) {
            console.log(error);
        }
    }
    const getRoundsData = () => {
        let scoreDataArray = roundsData.map((obj)=> ({ name: obj.date, value: obj.score, score: obj.score}));
        setScoreData(scoreDataArray);
    }
    const getTeeShotData = () => {
        let fwPercentage = roundsData.map((obj)=> ({ name: obj.date, value: (obj.driveHit/(obj.driveLeft + obj.driveRight + obj.driveHit)) * 100 , FWPer: (obj.driveHit/(obj.driveLeft + obj.driveRight + obj.driveHit)) * 100}));
        setFwPer(fwPercentage);
        let missData = roundsData.map((obj) => ({name: obj.date, left: (obj.driveLeft/(obj.driveLeft + obj.driveRight + obj.driveHit)*100), right: (obj.driveRight/(obj.driveLeft + obj.driveRight + obj.driveHit)*100)}));
        setFwMiss(missData);
    }
    const getPuttingData = () => {
        let puttsPerRound = roundsData.map((obj)=> ({ name: obj.date, value: obj.putts, putts: obj.putts}));
        setPuttsPer(puttsPerRound);
    }

    const getApproachData = () => {
        let appPercentage = roundsData.map((obj)=> ({ name: obj.date, value: (obj.approachHit/(obj.approachLeft + obj.approachRight + obj.approachHit)) * 100 , appPer: (obj.approachHit/(obj.approachLeft + obj.approachRight + obj.approachHit)) * 100 }));
        setApproachPer(appPercentage);
        let right = 0;
        let left = 0;
        let short = 0;
        let long = 0;
        let total = 0;
        roundsData.forEach((obj)=> {
            right = obj.approachRight + right;
            left = obj.approachLeft + left;
            short = obj.approachShort + short;
            long = obj.approachLong + long;
            total = obj.approachLong + obj.approachShort + obj.approachRight + obj.approachLeft;
        })
        const missData = [
            {
                "miss": "Long",
                "num": long,
                "fullMark": total
            },
            {
                "miss": "Right",
                "num": right,
                "fullMark": total
            },
            {
                "miss": "Short",
                "num": short,
                "fullMark": total
            },
            {
                "miss": "Left",
                "num": left,
                "fullMark": total
            }
        ]
        setApproachMiss(missData);

    }

    
    useEffect(() => {
        getPlayerData();
    }, [scoreData, approachPer, fwPer, puttsPer]);

    const filterClick = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        if (e.target.value === "score") {
            setDataType(e.target.value);
            getRoundsData();
        } else if (e.target.value === "tee shots") {
            setDataType(e.target.value);
            getTeeShotData();
        } else if (e.target.value === "approach") {
            setDataType(e.target.value);
            getApproachData();
        } else if (e.target.value === 'putting') {
            setDataType(e.target.value);
            getPuttingData();
        }
        
    }
    return (
            <div id="stats-container">
                <form id="stats-form">
                    <h1 className="stats-h1">{userName}'s Stats</h1>
                    {/* <select 
                    onChange={(e)=> setRoundQuantity(e.target.value)}
                    >
                        <option value="All Rounds">All Rounds</option>
                        <option value="Previous Round">Previous Round</option>
                        <option value="Last 3 Rounds">Last 3 Rounds</option>
                    </select> */}
                    <div id="stats-filter-btns">
                        <button value="score" onClick={(e)=> filterClick(e)}>Score</button>
                        <button value="tee shots" onClick={(e)=> filterClick(e)}>Driving</button>
                        <button value="approach" onClick={(e)=> filterClick(e)}>Approach</button>
                        <button value="putting" onClick={(e)=> filterClick(e)}>Putting</button>
                    </div>
                    <div id="stats-results">
                        { dataType === 'score' &&
                        <div className="chart-container">
                            <h1 className="stat-chart-h1">Scores</h1>
                            <ResponsiveContainer width={"80%"} height={300}>
                                <LineChart width={730} height={250} data={scoreData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="name" />
                                    <Label value="Rounds" offset={0} position="bottom" />
                                    <YAxis />
                                    <Label value="Rounds" offset={0} position="top" />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                    <Line name="Score Per Round" type="monotone" dataKey="score" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        }  
                        { dataType === 'tee shots' &&
                        <div className="chart-container">
                        <h1 className="stat-chart-h1">Fairway %</h1>
                        <ResponsiveContainer width={"80%"} height={300}>
                            <LineChart width={730} height={250} data={fwPer}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                                <Line name="Fairway Percentage" type="monotone" dataKey="FWPer" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                        }
                        { dataType === 'tee shots' && 
                         <div className="chart-container">   
                            <h1 className="stat-chart-h1">Tee Shot Miss Tendencies</h1>
                            <ResponsiveContainer width={"80%"} height={300}>
                                <BarChart width={730} height={250} data={fwMiss}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="name" domain={[0, 100]}/>
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                    <Bar dataKey="left" fill="#8884d8" />
                                    <Bar dataKey="right" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        }
                        { dataType === 'approach' &&
                        <div className="chart-container">
                        <h1 className="stat-chart-h1">Approach %</h1>
                        <ResponsiveContainer width={"80%"} height={300}>
                            <LineChart width={730} height={250} data={approachPer}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                                <Line name="Approach Percentage" type="monotone" dataKey="appPer" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                        }
                     
                        { dataType === 'approach' && 
                        <div className="chart-container">
                            <h1 className="stat-chart-h1">Approach Shot Miss Tendencies</h1>
                            <ResponsiveContainer width={"80%"} height={300}>
                                <RadarChart outerRadius={90} width={730} height={250} data={approachMiss}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="miss" />
                                    <PolarRadiusAxis angle={90} domain={[0, 15]} />
                                    <Radar name="Miss Dispersion" dataKey="num" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        }         
                        { dataType === 'putting' &&
                        <div className="chart-container">
                            <h1 className="stat-chart-h1">Putts Per Round</h1>
                            <ResponsiveContainer width={"80%"} height={300}>
                                <LineChart width={730} height={250} data={puttsPer}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                    <Line name="Putts Per Round" type="monotone" dataKey="putts" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        }  
                    </div>
                </form>
            </div>
    )
}

export default Stats;