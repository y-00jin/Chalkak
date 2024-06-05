import React, { useEffect, useState, useContext, useRef } from 'react';
import useMobile from 'components/UseMobile.js';
import { TfiPencilAlt } from "react-icons/tfi";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContext } from 'context/MapContext';

export default function MapFunction() {
  const { currentPosition, map } = useContext(MapContext);
  const isMobile = useMobile();

  const [drawStatus, setDrawStatus] = useState(false);
  const canvasRef = useRef(null);

  const [getCtx, setGetCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [lastX, setLastX] = useState(null);
  const [lastY, setLastY] = useState(null);

  const clickCurrentLocation = () => {
    const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
    map.setLevel(3);
    map.panTo(moveLatLon);
    // isMobile?map.setCenter(moveLatLon):map.panTo(moveLatLon);
  }

  const handleDraw = () => {
    map.setDraggable(drawStatus);
    map.setZoomable(drawStatus);
    setDrawStatus(!drawStatus);

    // 스크롤 잠그기
    if (!drawStatus) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  const handleResize = () => {
    if (canvasRef.current) {
      // canvasRef.current.width = window.innerWidth - 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    setDrawStatus(false);
  }, []);
  
  useEffect(() => {
    if (!drawStatus) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#000000";
    setGetCtx(ctx);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawStatus]);


  const startDrawing = (e) => {
    setPainting(true);
    const clientX = isMobile ? (e.touches ? e.touches[0].clientX : 0) : e.nativeEvent.offsetX;
    const clientY = isMobile ? (e.touches ? e.touches[0].clientY : 0) : e.nativeEvent.offsetY;
    setLastX(clientX);
    setLastY(clientY);
    drawLine(clientX, clientY, clientX, clientY);
  }

  const draw = (e) => {
    if (!painting) return;

    const clientX = isMobile ? (e.touches ? e.touches[0].clientX : 0) : e.nativeEvent.offsetX;
    const clientY = isMobile ? (e.touches ? e.touches[0].clientY : 0) : e.nativeEvent.offsetY;
    drawLine(lastX, lastY, clientX, clientY);
    setLastX(clientX);
    setLastY(clientY);
  }

  const endDrawing = () => {
    setPainting(false);
  }

  const drawLine = (startX, startY, endX, endY) => {
    const ctx = getCtx;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  return (
    <>
      <div className={`absolute right-4 ${isMobile ? 'top-24' : 'top-4'} flex flex-col gap-4`}>
        <button className='map-func-btn bg-white text-black z-[15]' onClick={clickCurrentLocation}>
          <TbCurrentLocation />
        </button>
        <button className={`map-func-btn z-[25] ${drawStatus ? 'text-white bg-[#96DBF4]' : 'bg-white text-black'}`} onClick={handleDraw}>
          <TfiPencilAlt />
        </button>
      </div>
      {drawStatus && (
        <canvas
          className='canvas'
          ref={canvasRef}

          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}

          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}

          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            // width: `${isMobile ? '100%' : 'calc(100% - 5rem)'}`,
            height: '100%',
            zIndex: 20
          }}
        />
      )}
    </>
  );
}
