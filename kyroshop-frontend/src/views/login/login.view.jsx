import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  OutlinedInput,
} from '@mui/material'
import TextFieldElement from '../../components/form/textfield.element.jsx'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

function LoginView() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "email": "",
      "password": "",
    }
  })

  const onSubmit = (data) => console.log(data);

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: '100vh'
              }}>
          <Grid size={4}>
            <Card>
              <CardHeader title="Login"/>
              <CardContent>
                <Grid container>
                  <TextFieldElement name="email" label="Email" control={control} />
                  <TextFieldElement name="password" type="password" label="Password" control={control} />
                </Grid>
                <Grid container direction="column"
                      sx={{
                        alignItems: "right",
                        marginTop: "1rem",
                      }}>
                  <Button variant="contained" size="small" type="submit">Submit</Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
)
}

export default LoginView
