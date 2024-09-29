import { Button, styled } from '@mui/material'
export const CustomButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: theme.spacing(0.5),
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0c355d',
  borderColor: '#305d96',
  borderRadius: 5,
  fontFamily: 'Arial',
  color: 'white',
  '&:hover': {
    backgroundColor: '#145593',
    borderColor: '#305d96',
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
