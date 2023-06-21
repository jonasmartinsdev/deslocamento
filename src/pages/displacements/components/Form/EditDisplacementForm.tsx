import { Formik, FormikProps, useFormik } from "formik"
import { useRouter } from "next/router";

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { Box, CircularProgress } from "@mui/material";
import { useDisplacementDetailsQuery, useUpdateDisplacementMutation } from "@/store/queries/displacementApi";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
  // id: yup.string().required('Este campo é obrigatório'),
  // categoriaHabilitacao: yup.string().required('Este campo é obrigatório'),
  // vencimentoHabilitacao: yup.string().required('Este campo é obrigatório'),

});


interface IDisplacementFormData {
  id: number
  kmFinal: string
  observacao: string
}


interface ICreateDisplacementFormProps {
  setOpenPopup: any
  displacementId: number | undefined
}

export function EditDisplacementForm({ setOpenPopup, displacementId }: ICreateDisplacementFormProps) {
  const router = useRouter()

  const [updateDisplacement] = useUpdateDisplacementMutation()

  const { data, isLoading, isFetching } = useDisplacementDetailsQuery(
    displacementId,
    {
      refetchOnMountOrArgChange: true,
      skip: !displacementId,
    }
  )

  async function updateDisplacementForm(data: IDisplacementFormData) {
    const updateDisplacementData = {
      ...data,
      fimDeslocamento: new Date(),
    }
    const response = await updateDisplacement(updateDisplacementData);

    if (response?.error) {
      toast(response?.error.data, {
        type: 'error',
      })
    } else {
      toast('Deslocamento atualizado com sucesso', {
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
        observacao: data?.observacao,
        kmFinal: data?.kmFinal,
        id: data?.id,
      }}
      onSubmit={(values: IDisplacementFormData) => {
        updateDisplacementForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IDisplacementFormData>) => {
        return (
          <>
            <CustomForm setOpenPopup={setOpenPopup}  {...props} isEdit={true} />
          </>
        )
      }}
    </Formik>

  )
}