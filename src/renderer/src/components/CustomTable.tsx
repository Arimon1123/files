import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '& th, & td': {
    border: 0
  },
  '&:last-child th:last-of-type': {
    borderTopRightRadius: 5
  },
  '& th:first-of-type': {
    borderTopLeftRadius: 5
  },
  '&:last-child td:last-of-type': {
    borderBottomRightRadius: 5
  },
  '&:last-child td:first-of-type': {
    borderBottomLeftRadius: 5
  }
}))

export { StyledTableCell, StyledTableRow }
