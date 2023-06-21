import { Formik, FormikProps, } from "formik"

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { useCreateDisplacementMutation } from "@/store/queries/displacementApi";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
  kmInicial: yup.string().required('Este campo é obrigatório'),
  idCondutor: yup.string().required('Este campo é obrigatório'),
  idVeiculo: yup.string().required('Este campo é obrigatório'),
  idCliente: yup.string().required('Este campo é obrigatório'),
});


interface IDisplacementFormData {
  kmInicial: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: string
  idVeiculo: string
  idCliente: string
}


interface ICreateDisplacementFormProps {
  setOpenPopup: any
}

export function CreateDisplacementForm({ setOpenPopup }: ICreateDisplacementFormProps) {

  const [createDisplacement] = useCreateDisplacementMutation()

  async function createDisplacementForm(data: IDisplacementFormData) {

    const createDisplacementData = {
      ...data,
      inicioDeslocamento: new Date()
    }

    const response = await createDisplacement(createDisplacementData);

    if (response?.error) {
      toast(response?.error.data, {
        type: 'error',
      })
    } else {
      toast('Deslocamento cadastrado com sucesso', {
        type: 'success',
      })
    }

    setOpenPopup(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        kmInicial: '',
        checkList: '',
        motivo: '',
        observacao: '',
        idCondutor: '',
        idVeiculo: '',
        idCliente: '',
      }}
      onSubmit={(values: IDisplacementFormData) => {
        createDisplacementForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IDisplacementFormData>) => {
        return <CustomForm setOpenPopup={setOpenPopup}  {...props} />
      }}
    </Formik>

  )
}