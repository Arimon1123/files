import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { File } from '@renderer/types/types'

interface FileTableProps {
  files: File[]
}

export function FileTable(props: FileTableProps) {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nro de Tramite</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Institución</TableCell>
              <TableCell>Medio</TableCell>
              <TableCell>Volumen</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.files.map((file: File) => (
              <TableRow key={file.id}>
                <TableCell>{file.id}</TableCell>
                <TableCell>{file.fileNumber}</TableCell>
                <TableCell>{file.description}</TableCell>
                <TableCell>{file.area}</TableCell>
                <TableCell>{file.institution}</TableCell>
                <TableCell>{file.medium}</TableCell>
                <TableCell>{file.volume}</TableCell>
                <TableCell>{file.year}</TableCell>
                <TableCell>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
