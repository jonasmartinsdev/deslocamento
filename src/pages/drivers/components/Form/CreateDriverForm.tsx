import { Formik, FormikProps, } from "formik"

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { useCreateDriverMutation } from "@/store/queries/driverApi";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
  nome: yup.string().required('Este campo é obrigatório'),
  numeroHabilitacao: yup.string().required('Este campo é obrigatório'),
  categoriaHabilitacao: yup.string().required('Este campo é obrigatório'),
  vencimentoHabilitacao: yup.string().required('Este campo é obrigatório'),
});


interface IDriverFormData {
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}


interface ICreateDriverFormProps {
  setOpenPopup: any
}

export function CreateDriverForm({ setOpenPopup }: ICreateDriverFormProps) {

  const [createDriver] = useCreateDriverMutation()

  async function createDriverForm(data: IDriverFormData) {
    const response = await createDriver(data);


    if (response.data) {
      toast('Condutor cadastrado com sucesso', {
        type: 'success',
      })
    }

    if (response?.error) {
      toast('Não foi possível cadastrar o condutor.', {
        type: 'error',
      })
    }

    setOpenPopup(false)
  }


  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        nome: '',
        numeroHabilitacao: '',
        categoriaHabilitacao: '',
        vencimentoHabilitacao: '',
      }}
      onSubmit={(values: IDriverFormData) => {
        createDriverForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IDriverFormData>) => {
        return <CustomForm setOpenPopup={setOpenPopup}  {...props} />
      }}
    </Formik>

  )
}