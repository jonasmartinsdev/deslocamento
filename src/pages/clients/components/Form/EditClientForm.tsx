import { useClientDetailsQuery, useUpdateClientMutation } from "@/store/queries/clientApi";

import { Formik, FormikProps } from "formik"

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
  nome: yup.string().required('Este campo é obrigatório'),
  cidade: yup.string().required('Este campo é obrigatório'),
  bairro: yup.string().required('Este campo é obrigatório'),
  logradouro: yup.string().required('Este campo é obrigatório'),
  numero: yup.string().required('Este campo é obrigatório'),
  uf: yup.string().required('Este campo é obrigatório'),
  tipoDocumento: yup.string().required('Este campo é obrigatório'),
  numeroDocumento: yup.string().required('Este campo é obrigatório'),
});


interface IClientFormData {
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  id: number
}

interface ICreateClientFormProps {
  setOpenPopup: any
  clientId: number | undefined
}

export function EditClientForm({ setOpenPopup, clientId }: ICreateClientFormProps) {
  const [updateClient] = useUpdateClientMutation()

  const { data, isLoading, isFetching } = useClientDetailsQuery(
    clientId,
    {
      refetchOnMountOrArgChange: true,
      skip: !clientId,
    }
  )


  async function updateClientForm(data: IClientFormData) {
    const response = await updateClient(data);

    toast('Cliente atualizado com sucesso', {
      type: 'success',
    })

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
        nome: data?.nome,
        cidade: data?.cidade,
        bairro: data?.bairro,
        logradouro: data?.logradouro,
        tipoDocumento: data?.tipoDocumento,
        numeroDocumento: data?.numeroDocumento,
        uf: data?.uf,
        numero: data?.numero,
        id: data?.id,
      }}
      onSubmit={(values: IClientFormData) => {
        updateClientForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IClientFormData>) => {
        return (
          <>
            <CustomForm setOpenPopup={setOpenPopup}  {...props} isEdit={true} />
          </>
        )
      }}
    </Formik>

  )
}