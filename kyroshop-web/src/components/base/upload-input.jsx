import React, {useState}  from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { API_URL, mediaUrl } from '../../helpers/constant.js'
import axios from 'axios'
import { cn } from '../../helpers/cn.js'

const UploadFormField = ({field, name, label, required = false}) => {
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
    <FormField
      control={field.control}
      name={name}
      render={({ field }) => (
        <div className={cn("flex gap-4")}>
          <img src={mediaUrl + field?.value} alt="image"
               style={{ width: '200px', height: '100px' }}/>
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
            <FormControl>
              <Input placeholder={label} type="file"
                     onChange={(e) => handleFileChange(e, field)}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </div>
      )}>
    </FormField>
  )
}

export default UploadFormField