import Box from '@mui/material/Box';
import { styled } from 'styled-components'
const FlexBox = styled.div`
  display: flex
`

const CenteredFlexBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

});



const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});


const TransparentDiv = styled.div`
  
`
export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox };
