import Meta from "@/components/Meta";
import useOrientation from "@/hooks/useOrientation";

import { Paper, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";

import Globe, { GlobeMethods } from "react-globe.gl";
import { styled } from "styled-components";
import useWindowDimension from "@/hooks/useWindowDimention";
import { getSunrise, getTattva, TATWA_DESCRIPTIONS } from "@/utils/tattva";

const AbsoluteTransparentDiv = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  padding-left: 2vw;
  padding-top: 2vh;
  justify-content: center;
  width: 90vw;
  h5,
  h4,
  h3,
  h2,
  p {
    width: 100%;
    font-size: ${(props) => 10 + 0.03 * props.width}px;
    color: white;
  }
`;
const StyledGlobe = styled(Globe)`
  position: absolute;
  top: 0;
  .scene-container {
    width: 100vw;
  }
`;
// scene-container
function Welcome() {
  const isPortrait = useOrientation();
  const [width, height] = useWindowDimension();
  const globeRef = useRef<GlobeMethods>();
  const [state, setState] = useState<{
    text: string;
    hour: string;
    lat: number;
    lng: number;
    desc?: string;
  }>({ text: "Buscando tattva...", hour: "", lat: 0, lng: 0 });

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
    }
  }, [globeRef]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ ...state, text: "Este navegador no soporta geolocation" });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(JSON.stringify(position));
          let now = new Date();

          let sunrise = getSunrise(
            now,
            position.coords.latitude,
            position.coords.longitude,
            position.coords.altitude || undefined
          );
          let diff = now.getTime() - sunrise.getTime();
          let state = { text: "", desc: "" };
          if (diff < 0) {
            state.text = `Faltan ${Math.abs(
              Math.floor(diff / (1000 * 60 * 60))
            )} horas y ${Math.abs(
              Math.floor(diff / (1000 * 60)) % 60
            )} minutos para el primer tattva (el amanecer).`;
          } else {
            let tattva = getTattva(now, sunrise);
            state.text = `Estás en ${tattva}`;
            state.desc = TATWA_DESCRIPTIONS[tattva];
          }
          setState({
            ...state,
            hour: now.toLocaleTimeString(),
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setState({
            ...state,
            text: `Algo salió mal: ${JSON.stringify(error)}`,
          });
        }
      );
    }
  }, []);

  return (
    <>
      <Meta title="Welcome" />
      {state.lat != 0 ? (
        <Globe
          ref={globeRef}
          globeImageUrl="/earth-night.jpg"
          pointsData={[
            { lat: state.lat, lng: state.lng, size: 0.1, color: "blue" },
          ]}
          pointAltitude="size"
          pointColor="color"
          animateIn={true}
          width={width}
          height={height}
        />
      ) : null}
      <AbsoluteTransparentDiv width={width}>
        {/* <Typography variant="h6">{`Latitud: ${state.lat}\tLongitud: ${state.lng}`}</Typography> */}
        <Typography variant="h5" fontStyle={"italic"}>
          {state.hour}
        </Typography>
        <Typography variant="h4" fontStyle={"bold"}>
          {state.text}
        </Typography>
        <Typography>{state.desc}</Typography>
      </AbsoluteTransparentDiv>
    </>
  );
}

export default Welcome;
