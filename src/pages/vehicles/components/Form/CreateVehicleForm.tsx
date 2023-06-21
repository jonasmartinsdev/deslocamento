import { Formik, FormikProps, } from "formik"

import * as yup from 'yup'
import { CustomForm } from "./CustomForm";
import { useCreateVehicleMutation } from "@/store/queries/vehicleApi";


const validationSchema = yup.object().shape({
  anoFabricacao: yup.string().required('Este campo é obrigatório'),
  placa: yup.string().required('Este campo é obrigatório'),
  marcaModelo: yup.string().required('Este campo é obrigatório'),
  kmAtual: yup.string().required('Este campo é obrigatório'),
});


interface IVehicleFormData {
  marcaModelo: string
  anoFabricacao: string
  kmAtual: string
  placa: string
}


interface ICreateVehicleFormProps {
  setOpenPopup: any
}

export function CreateVehicleForm({ setOpenPopup }: ICreateVehicleFormProps) {

  const [createVehicle] = useCreateVehicleMutation()

  async function createVehicleForm(data: IVehicleFormData) {
    const response = await createVehicle(data);
    setOpenPopup(false)
  }


  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        placa: '',
        anoFabricacao: '',
        marcaModelo: '',
        kmAtual: '',
      }}
      onSubmit={(values: IVehicleFormData) => {
        createVehicleForm(values)
      }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IVehicleFormData>) => {
        return <CustomForm setOpenPopup={setOpenPopup}  {...props} />
      }}
    </Formik>

  )
}