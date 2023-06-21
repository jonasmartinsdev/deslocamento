import { useCreateClientMutation } from "@/store/queries/clientApi";

import { Formik, FormikProps, useFormik } from "formik"

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
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
}

interface ICreateClientFormProps {
  setOpenPopup: any
}

export function CreateClientForm({ setOpenPopup }: ICreateClientFormProps) {
  const [createClient] = useCreateClientMutation()

  async function createClientForm(data: IClientFormData) {

    const response = await createClient(data)

    if (response.data) {
      toast('Cliente cadastrado com sucesso', {
        type: 'success',
      })
      setOpenPopup(false)
    }

    if (response?.error) {
      toast('Não foi possível cadastrar o cliente.', {
        type: 'error',
      })
    }

  }


  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        nome: '',
        cidade: '',
        bairro: '',
        logradouro: '',
        tipoDocumento: '',
        numeroDocumento: '',
        uf: '',
        numero: '',
      }}
      onSubmit={(values: IClientFormData) => {
        createClientForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IClientFormData>) => {
        return <CustomForm setOpenPopup={setOpenPopup}  {...props} />
      }}
    </Formik>

  )
}