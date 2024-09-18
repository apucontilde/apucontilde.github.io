import Meta from '@/components/Meta';
import { FlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTatwa, getSunrise, TATWA_DESCRIPTIONS } from '@/utils/tatwa';

import Globe from 'react-globe.gl';


function Welcome() {
  const isPortrait = useOrientation();

  const width = isPortrait ? '40%' : '30%';
  const height = isPortrait ? '30%' : '40%';
  const [state, setState] = useState<{
    text: string, hour: string, lat: number, lng: number, desc?: string
  }>({ text: "Buscando tatwa...", hour: "", lat: 0, lng: 0 })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ ...state, text: "Este navegador no soporta geolocation" })
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(JSON.stringify(position))
        let now = new Date()
        let sunrise = getSunrise(now, position.coords.latitude, position.coords.longitude, position.coords.altitude || undefined)
        let tatwa = getTatwa(now, sunrise)
        setState({ text: `Estás en ${tatwa}`, desc: TATWA_DESCRIPTIONS[tatwa], hour: now.toLocaleTimeString(), lat: position.coords.latitude, lng: position.coords.longitude })
      }, (error) => {
        setState({ ...state, text: `Algo salió mal: ${JSON.stringify(error)}` })
      });
    }
  }, [])


  return (
    <>
      <Meta title="Welcome" />
      <FlexBox flexDirection={'row'} sx={{position: 'sticky', top: 0, left: 0, padding: '10px 16px'}}>
        <Paper sx={{ p: 15}}>
          <Typography variant="h5" >{`Latitud: ${state.lat}\tLongitud: ${state.lng}`}</Typography>
          <Typography variant="h3" >{state.hour}</Typography>
          <Typography variant="h1" >{state.text}</Typography>
          <Typography variant="h5" >{state.desc}</Typography>

        </Paper>
      {state.lat != 0 ? <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          pointsData={[{ lat: state.lat, lng: state.lng, size: 0.1, color: "blue" }]}
          pointAltitude="size"
          pointColor="color"
          width={750}
        /> : null}
      </FlexBox>
    </>
  );
}

export default Welcome;
