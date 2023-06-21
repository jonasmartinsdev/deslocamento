import { Formik, FormikProps, useFormik } from "formik"
import { useRouter } from "next/router";

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { Box, CircularProgress } from "@mui/material";
import { useVehicleDetailsQuery, useUpdateVehicleMutation } from "@/store/queries/vehicleApi";


const validationSchema = yup.object().shape({
  id: yup.string().required('Este campo é obrigatório'),
  anoFabricacao: yup.string().required('Este campo é obrigatório'),
  placa: yup.string().required('Este campo é obrigatório'),
  marcaModelo: yup.string().required('Este campo é obrigatório'),
  kmAtual: yup.string().required('Este campo é obrigatório'),
});


interface IVehicleFormData {
  id: number
  marcaModelo: string
  anoFabricacao: string
  kmAtual: string
  placa: string
}


interface ICreateClientFormProps {
  setOpenPopup: any
  clientId: number | undefined
}

export function EditVehicleForm({ setOpenPopup, clientId }: ICreateClientFormProps) {
  const router = useRouter()

  const [updateVehicle] = useUpdateVehicleMutation()

  const { data, isLoading, isFetching } = useVehicleDetailsQuery(
    clientId,
    {
      refetchOnMountOrArgChange: true,
      skip: !clientId,
    }
  )

  async function updateClientForm(data: IVehicleFormData) {
    const response = await updateVehicle(data);
    setOpenPopup(false)
  }


  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '800px',
          height: '300px'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }


  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        marcaModelo: data?.marcaModelo,
        anoFabricacao: data?.anoFabricacao,
        kmAtual: data?.kmAtual,
        placa: data?.placa,
        id: data?.id,
      }}
      onSubmit={(values: IVehicleFormData) => {
        updateClientForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IVehicleFormData>) => {
        return (
          <>
            <CustomForm setOpenPopup={setOpenPopup}  {...props} isEdit={true} />
          </>
        )
      }}
    </Formik>

  )
}