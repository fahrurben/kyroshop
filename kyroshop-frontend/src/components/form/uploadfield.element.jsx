import React, {useState}  from 'react'

import { API_URL, mediaUrl } from '../../helpers/constant.js'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import { InputLabel } from '@mui/material'

const UploadFieldElement = ({control, name, label, required = false}) => {
  const [file, setFile] = useState(null)

  const handleFileChange = async (e, field) => {
    if (e.target.files) {
      let file = e.target.files[0]
      setFile(file);
      const formData = new FormData();
      formData.append('image', file);
      let response = await axios.post(API_URL + '/media_upload/', formData)
      let filename = response.data.image.replace(mediaUrl, '')
      field.onChange(filename)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <img src={mediaUrl + field?.value} alt="image"
               style={{ width: '200px', height: '100px' }}/>
            <InputLabel>
              {label}
              {required && <span className="text-red-500"> *</span>}
            </InputLabel>
            <input placeholder={label} type="file"
                   onChange={(e) => handleFileChange(e, field)}/>
        </div>
      )}>
    </Controller>
  )
}

export default UploadFieldElement