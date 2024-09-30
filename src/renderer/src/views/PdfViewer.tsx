import { IconButton } from '@mui/material'
import { useState } from 'react'
import Download from '@mui/icons-material/Download'
interface PdfViewerProps {
  pdf: Blob
}

function PdfViewer(props: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string>(URL.createObjectURL(props.pdf))

  return (
    <iframe src={pdfUrl} style={{ width: '100%', height: '600px', zoom: '100%' }}>
      <IconButton>
        <Download />
        <a href={pdfUrl} download="output.pdf">
          Descargar
        </a>
      </IconButton>
    </iframe>
  )
}

export default PdfViewer
