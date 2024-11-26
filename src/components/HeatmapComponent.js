import React, { useState } from 'react';
import songData from '../song_data.json'; 
import './HeatmapComponent.css'; 

const HeatmapComponent = () => {
  const [tooltipData, setTooltipData] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  
  const handleMouseOver = (event, data) => {
    setTooltipData(data);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  const getColor = (count) => {
    if (count === 0) return '#e0e0e0';
    if (count <= 50) return '#c6e48b';
    if (count <= 100) return '#7bc96f';
    if (count <= 200) return '#239a3b';
    return '#196127'; 
  };

  return (
    <div>
      <h1>Music Calendar Heatmap</h1>
      <div className="heatmap-container">
        {songData.map((entry, index) => {
          const [monthName, year] = entry.Month.split(' ');
          return (
            <div
              key={index}
              className="month-block"
              style={{ backgroundColor: getColor(entry['Number of songs played']) }}
              onMouseOver={(e) => handleMouseOver(e, entry)}
              onMouseOut={handleMouseOut}
            >
              <span className="month-label">{`${monthName} ${year}`}</span>
            </div>
          );
        })}
      </div>

      {tooltipData && (
        <div
          className="tooltip"
          style={{
            top: hoverPosition.y + 10, 
            left: hoverPosition.x + 10,
            position: 'absolute',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1000,
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div className="tooltip-content">
            <h4>{tooltipData.Month}</h4>
            <p>Number of Songs: {tooltipData['Number of songs played']}</p>
            <p>Top Song: {tooltipData['Top song']}</p>
            <p>Top Artist: {tooltipData['Top artist']}</p>
            <p>Minutes Played: {tooltipData['Number of minutes played']}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapComponent;
