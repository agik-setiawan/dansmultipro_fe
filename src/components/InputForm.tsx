import { TextField } from '@mui/material'
import ErrorInput from './ErrorInput'

export default function InputForm({ errorMessage, label, ...props }: any) {
  return (
    <div className="mb-2">
      <div>
        <label className="py-2" htmlFor="">
          {label}
        </label>
      </div>
      <TextField size="small" hiddenLabel {...props} className="w-full"/>
      {/* <Input {...props} /> */}
      <div className="mx-2">
        <ErrorInput message={errorMessage} />
      </div>
    </div>
  )
}
