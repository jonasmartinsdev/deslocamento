import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Form } from "formik"

interface ICustomFormProps {
  values: any
  errors: any
  touched: any
  handleChange: any
  handleBlur: any
  isSubmitting: any
  setOpenPopup: any
  isEdit?: boolean
}

export function CustomForm({ values, errors, touched, handleChange, handleBlur, isSubmitting, setOpenPopup, isEdit }: ICustomFormProps) {

  const hasError = Object.keys(errors).length > 0


  return (
    <Form>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='nome'
              label='Nome'
              value={values.nome}
              type='text'
              error={errors.nome && touched.nome ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nome && touched.nome && (
              <div style={{ color: 'red' }}>{errors.nome}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='cidade'
              label='Cidade'
              value={values.cidade}
              type='text'
              error={errors.cidade && touched.cidade ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cidade && touched.cidade && (
              <div style={{ color: 'red' }}>{errors.cidade}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='uf'
              label='UF'
              value={values.uf}
              type='text'
              error={errors.uf && touched.uf ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.uf && touched.uf && (
              <div style={{ color: 'red' }}>{errors.uf}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>

          <FormControl fullWidth>
            <TextField
              name='bairro'
              label='Bairro'
              value={values.bairro}
              type='text'
              error={errors.bairro && touched.bairro ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.bairro && touched.bairro && (
              <div style={{ color: 'red' }}>{errors.bairro}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>

          <FormControl fullWidth>
            <TextField
              name='numero'
              label='Número'
              value={values.numero}
              type='text'
              error={errors.numero && touched.numero ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.numero && touched.numero && (
              <div style={{ color: 'red' }}>{errors.numero}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>

          <FormControl fullWidth>
            <TextField
              name='logradouro'
              label='Logradouro'
              value={values.logradouro}
              type='text'
              error={errors.logradouro && touched.logradouro ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.logradouro && touched.logradouro && (
              <div style={{ color: 'red' }}>{errors.logradouro}</div>
            )}
          </FormControl>
        </Grid >

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="tipoDocumento" error={errors.tipoDocumento && touched.tipoDocumento ? true : false}>Documento</InputLabel>
            <Select
              name='tipoDocumento'
              label='Documento'
              disabled={isEdit}
              value={values.tipoDocumento}
              error={errors.tipoDocumento && touched.tipoDocumento ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={'CPF'}>CPF</MenuItem>
              <MenuItem value={'RG'}>RG</MenuItem>
              <MenuItem value={'CNH'}>CNH</MenuItem>
            </Select>

            {errors.tipoDocumento && touched.tipoDocumento && (
              <div style={{ color: 'red' }}>{errors.tipoDocumento}</div>
            )}
          </FormControl>

        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='numeroDocumento'
              label='Número do Documento'
              value={values.numeroDocumento}
              type='text'
              disabled={isEdit}
              error={errors.numeroDocumento && touched.numeroDocumento ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.numeroDocumento && touched.numeroDocumento && (
              <div style={{ color: 'red' }}>{errors.numeroDocumento}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>

          <Button
            type='button'
            variant='outlined'
            color='inherit'
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
            disabled={isSubmitting}
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