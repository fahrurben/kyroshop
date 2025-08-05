import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextFieldElement from '../../components/form/textfield.element.jsx'
import { useForm } from 'react-hook-form'
import { useNavigation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLogin } from '../../hooks/use-login.api.js'
import { actions as authActions } from '../../stores/auth.store.js'
import { useNavigate } from 'react-router'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

function LoginView () {
  const navigate = useNavigate()

  const { control, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'email': '',
      'password': '',
    },
  })

  const loginMutation = useLogin({
    onError: (err) => {
      setError('email', {
        type: 'server',
        message: 'Wrong email or password',
      })
      setError('password')
    },
    onSuccess: (data) => {
      authActions.setToken(data.data.access)
      navigate('/')
    },
  })

  const onSubmit = async (data) => {
    loginMutation.mutate(data)
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="row"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}>
          <Grid size={4}>
            <Card>
              <CardHeader title="Login"/>
              <CardContent>
                <Grid container>
                  <TextFieldElement name="email" label="Email"
                                    control={control}/>
                  <TextFieldElement name="password" type="password"
                                    label="Password" control={control}/>
                </Grid>
                <Grid container direction="column"
                      sx={{
                        alignItems: 'right',
                        marginTop: '1rem',
                      }}>
                  <Button variant="contained" size="small"
                          type="submit">Submit</Button>
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
