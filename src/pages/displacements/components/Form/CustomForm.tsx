import { useClientListQuery } from "@/store/queries/clientApi";
import { useDriverListQuery } from "@/store/queries/driverApi";
import { useVehicleListQuery } from "@/store/queries/vehicleApi";
import { ClientData, DriverData, VehicleData } from "@/types";
import { Autocomplete, Button, FormControl, Grid, TextField, Typography } from "@mui/material"

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

  const { data: clients, } = useClientListQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  })


  const { data: drivers, } = useDriverListQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,

  })

  const { data: vehicles, } = useVehicleListQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,

  })

  const hasError = Object.keys(errors).length > 0


  return (
    <Form>
      <Grid container spacing={3}>

        {!isEdit ?
          (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={drivers as DriverData[]}
                    getOptionLabel={(driver) => driver.nome}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Condutor"
                        variant="outlined"
                        error={errors.idCondutor && touched.idCondutor ? true : false}
                        fullWidth

                      />
                    )}
                    onChange={(e, driver) => {
                      setFieldValue('idCondutor', driver?.id)
                    }}
                  />

                  {errors.idCondutor && touched.idCondutor && (
                    <div style={{ color: 'red' }}>{errors.idCondutor}</div>
                  )}

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={vehicles as VehicleData[]}
                    getOptionLabel={(vehicle) => vehicle?.marcaModelo}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Veiculo"
                        variant="outlined"
                        error={errors.idVeiculo && touched.idVeiculo ? true : false}
                        fullWidth

                      />
                    )}
                    onChange={(e, vehicle) => {
                      setFieldValue('idVeiculo', vehicle?.id)
                    }}
                  />

                  {errors.idVeiculo && touched.idVeiculo && (
                    <div style={{ color: 'red' }}>{errors.idVeiculo}</div>
                  )}

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    name='kmInicial'
                    label='KM inicial'
                    value={values.kmInicial}
                    type='text'
                    disabled={isEdit}
                    error={errors.kmInicial && touched.kmInicial ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.kmInicial && touched.kmInicial && (
                    <div style={{ color: 'red' }}>{errors.kmInicial}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={clients as ClientData[]}
                    getOptionLabel={(client) => client?.nome}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        error={errors.idCliente && touched.idCliente ? true : false}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    onChange={(e, client) => {
                      setFieldValue('idCliente', client?.id)
                    }}

                  />

                  {errors.idCliente && touched.idCliente && (
                    <div style={{ color: 'red' }}>{errors.idCliente}</div>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    name='checkList'
                    label='Check List'
                    value={values.checkList}
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    name='motivo'
                    label='Motivo'
                    value={values.motivo}
                    type='text'
                    disabled={isEdit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                </FormControl>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    name='kmFinal'
                    label='KM Final'
                    value={values.kmFinal}
                    type='text'
                    error={errors.kmFinal && touched.kmFinal ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.kmFinal && touched.kmFinal && (
                    <div style={{ color: 'red' }}>{errors.kmFinal}</div>
                  )}
                </FormControl>
              </Grid>
            </>
          )
        }

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              name='observacao'
              label='Observação'
              value={values.observacao}
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
            />

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
              {isEdit ? 'Finalizar' : 'Iniciar'}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Form >

  )
}