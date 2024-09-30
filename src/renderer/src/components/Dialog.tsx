import { DialogProps, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { File } from '@renderer/types/types'
import { FileForm } from '@renderer/views/FileForm'
interface SimpleDialogProps extends DialogProps {
  title: string
  addHandler: (file: File) => void
  callback?: () => void
}
export const FileFormDialog: React.FC<SimpleDialogProps> = ({
  title,
  addHandler,
  callback,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogTitle sx={{ backgroundColor: '#000' }}>{title}</DialogTitle>
      <DialogContent sx={{ backgroundColor: '#000' }}>
        <FileForm addFileHandler={addHandler} callback={callback} />
      </DialogContent>
    </Dialog>
  )
}
