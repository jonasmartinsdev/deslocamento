import { useClientDetailsQuery, useCreateClientMutation, useUpdateClientMutation } from "@/store/queries/clientApi";

import { Formik, FormikProps, useFormik } from "formik"
import { useRouter } from "next/router";

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { Box, CircularProgress } from "@mui/material";
import { useDriverDetailsQuery, useUpdateDriverMutation } from "@/store/queries/driverApi";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
  id: yup.string().required('Este campo é obrigatório'),
  categoriaHabilitacao: yup.string().required('Este campo é obrigatório'),
  vencimentoHabilitacao: yup.string().required('Este campo é obrigatório'),

});


interface IDriverFormData {
  id: number
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}


interface ICreateClientFormProps {
  setOpenPopup: any
  driverId: number | undefined
}

export function EditDriverForm({ setOpenPopup, driverId }: ICreateClientFormProps) {
  const router = useRouter()

  const [updateDriver] = useUpdateDriverMutation()

  const { data, isLoading, isFetching } = useDriverDetailsQuery(
    driverId,
    {
      refetchOnMountOrArgChange: true,
      skip: !driverId,
    }
  )

  async function updateDriverForm(data: IDriverFormData) {
    const response = await updateDriver(data);

    if (response?.error) {
      toast(response?.error?.data, {
        type: 'error',
      })
    } else {
      toast('Condutor atualizado com sucesso', {
        type: 'success',
      })
    }
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
        categoriaHabilitacao: data?.catergoriaHabilitacao,
        nome: data?.nome,
        vencimentoHabilitacao: data?.vencimentoHabilitacao,
        numeroHabilitacao: data?.numeroHabilitacao,
        id: data?.id,
      }}
      onSubmit={(values: IDriverFormData) => {
        updateDriverForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IDriverFormData>) => {
        return (
          <>
            <CustomForm setOpenPopup={setOpenPopup}  {...props} isEdit={true} />
          </>
        )
      }}
    </Formik>

  )
}