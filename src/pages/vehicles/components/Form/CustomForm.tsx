import { Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { Form } from "formik"

interface ICustomFormProps {
  values: any
  errors: any
  touched: any
  handleChange: any
  handleBlur: any
  isSubmitting: any
  setOpenPopup: any
  setFieldValue?: any
  isEdit?: boolean
}

export function CustomForm({ values, errors, touched, handleChange, handleBlur, isSubmitting, setOpenPopup, setFieldValue, isEdit }: ICustomFormProps) {

  const hasError = Object.keys(errors).length > 0

  return (
    <Form>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='placa'
              label='Placa'
              value={values.placa}
              type='text'
              disabled={isEdit}
              error={errors.placa && touched.placa ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.placa && touched.placa && (
              <div style={{ color: 'red' }}>{errors.placa}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='marcaModelo'
              label='Modelo'
              value={values.marcaModelo}
              type='text'
              error={errors.marcaModelo && touched.marcaModelo ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.marcaModelo && touched.marcaModelo && (
              <div style={{ color: 'red' }}>{errors.marcaModelo}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='anoFabricacao'
              label='Ano'
              inputProps={{ maxLength: "4" }}
              value={values.anoFabricacao}
              type='text'
              error={errors.anoFabricacao && touched.anoFabricacao ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.anoFabricacao && touched.anoFabricacao && (
              <div style={{ color: 'red' }}>{errors.anoFabricacao}</div>
            )}

          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='kmAtual'
              label='KM atual'
              value={values.kmAtual}
              type='text'
              error={errors.kmAtual && touched.kmAtual ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.kmAtual && touched.kmAtual && (
              <div style={{ color: 'red' }}>{errors.kmAtual}</div>
            )}

          </FormControl>
        </Grid>



        <Grid item xs={6} sm={6}>

          <Button
            type='button'
            variant='outlined'
            color='inherit'
            size='large'
            disabled={isSubmitting}
            sx={{
              cursor: `${hasError ? 'not-allowed' : 'default'}`,
            }}
            title={hasError ? 'Please fill all the fields' : ''}
            fullWidth
            onClick={() => setOpenPopup(false)}
          >
            <Typography
              variant='button'
              fontSize={20}
              fontWeight={600}
              textTransform='capitalize'
            >
              Cancelar
            </Typography>
          </Button>

        </Grid>

        <Grid item xs={6} sm={6}>
          <Button
            type='submit'
            variant={'contained'}
            color={hasError ? 'error' : 'primary'}
            size='large'
            disabled={isSubmitting}
            sx={{
              cursor: `${hasError ? 'not-allowed' : 'default'}`,
            }}
            title={hasError ? 'Please fill all the fields' : ''}
            fullWidth
          >
            <Typography
              variant='button'
              fontSize={20}
              fontWeight={600}
              textTransform='capitalize'
            >
              {isEdit ? 'Atualizar' : 'Cadastrar'}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Form >

  )
}