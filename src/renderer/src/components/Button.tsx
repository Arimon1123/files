import { Button, styled } from '@mui/material'

export const CustomButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: theme.spacing(0.5),
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063ca',
  borderColor: '#0063ca',
  borderRadius: 10,
  fontFamily: 'Arial',
  color: 'white',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
  }
}))
