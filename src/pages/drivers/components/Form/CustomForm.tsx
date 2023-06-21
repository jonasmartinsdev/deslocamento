import { Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { Form } from "formik"
import moment from "moment";

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
              name='nome'
              label='Nome'
              value={values.nome}
              type='text'
              disabled={isEdit}
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
              name='numeroHabilitacao'
              label='Número da habilitação'
              value={values.numeroHabilitacao}
              type='text'
              disabled={isEdit}
              error={errors.numeroHabilitacao && touched.numeroHabilitacao ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.numeroHabilitacao && touched.numeroHabilitacao && (
              <div style={{ color: 'red' }}>{errors.numeroHabilitacao}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              name='categoriaHabilitacao'
              label='Categoria da habilitação'
              value={values.categoriaHabilitacao}
              type='text'
              error={errors.categoriaHabilitacao && touched.categoriaHabilitacao ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.categoriaHabilitacao && touched.categoriaHabilitacao && (
              <div style={{ color: 'red' }}>{errors.categoriaHabilitacao}</div>
            )}

          </FormControl>
        </Grid>

        {/* */}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Vencimento da habilitação"
                value={values.vencimentoHabilitacao ? moment(values.vencimentoHabilitacao) : moment()}
                onChange={value => setFieldValue("vencimentoHabilitacao", value)}
              />
            </LocalizationProvider>

            {errors.vencimentoHabilitacao && touched.vencimentoHabilitacao && (
              <div style={{ color: 'red' }}>{errors.vencimentoHabilitacao}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>

          <Button
            type='button'
            variant='outlined'
            color='inherit'
            size='large'
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