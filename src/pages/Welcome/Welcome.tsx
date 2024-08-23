import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTatwa, getSunrise } from '@/utils/tatwa';

function Welcome() {
  const isPortrait = useOrientation();

  const width = isPortrait ? '40%' : '30%';
  const height = isPortrait ? '30%' : '40%';
  const [text, setText] = useState<string>("")
  const [hora, setHora] = useState<string>("00:00")

  useEffect(() => {
    if (!navigator.geolocation) {
      setText("Este navegador no soporta geolocation")
    } else {
      setText("Buscando tu tatwa...")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(JSON.stringify(position))
        let now = new Date()
        let sunrise = getSunrise(now, position.coords.latitude, position.coords.longitude, position.coords.altitude || undefined)
        let tatwa = getTatwa(now, sunrise)
        setText(`Estás en ${tatwa}`)
        setHora(now.toTimeString())
      }, (error) => {
        setText(`Algo salió mal: ${JSON.stringify(error)}`)
      });
    }
  }, [])


  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox flexDirection={'column'}>
        <Typography variant="h3" >{hora}</Typography>
        <Typography variant="h1" >{text}</Typography>

      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
