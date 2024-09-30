import { IconButton, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material'
import { File } from '@renderer/types/types'
import DeleteIcon from '@mui/icons-material/Delete'
import { StyledTableCell, StyledTableRow } from '@renderer/components/CustomTable'

interface FileTableProps {
  files: File[]
  onDeleteHandler: (file: File) => void
}

export function FileTable(props: FileTableProps) {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nro de Tramite</StyledTableCell>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Dirección</StyledTableCell>
              <StyledTableCell>Institución</StyledTableCell>
              <StyledTableCell>Medio</StyledTableCell>
              <StyledTableCell>Volumen</StyledTableCell>
              <StyledTableCell>Año</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.files.map((file: File) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell>{file.id}</StyledTableCell>
                <StyledTableCell>{file.fileNumber}</StyledTableCell>
                <StyledTableCell>{file.description}</StyledTableCell>
                <StyledTableCell>{file.area}</StyledTableCell>
                <StyledTableCell>{file.institution}</StyledTableCell>
                <StyledTableCell>{file.medium}</StyledTableCell>
                <StyledTableCell>{file.volume}</StyledTableCell>
                <StyledTableCell>{file.year}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      props.onDeleteHandler(file)
                    }}
                  >
                    <DeleteIcon sx={{ color: 'red' }}></DeleteIcon>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
