import { VehicleData } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Action, ThunkAction } from '@reduxjs/toolkit'


interface CreateVehicleResponse {
  data: number
}

interface CreateVehicleRequest {
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface UpdateVehicleRequest {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface VehicleDetailsResponse {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}


interface DeleteVehicleRequest {
  id: number
}

interface VehicleListResponse extends VehicleData {}

export const vehicleApi = createApi({
  tagTypes: ['Vehicle'],
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/Veiculo`,
  }),

  endpoints: (builder) => ({
    VehicleList: builder.query<VehicleListResponse, void>({
      query: params => ({
          url: '',
          method: 'GET',
      }),
      providesTags: ['Vehicle']
    }), 
    
    VehicleDetails: builder.query<VehicleDetailsResponse, void>({
      query: id => ({
          url: `/${id}`,
          method: 'GET',
      }),
      providesTags: ['Vehicle']
    }),
    createVehicle: builder.mutation<CreateVehicleResponse, CreateVehicleRequest>({
      query: body => ({
          url: '',
          method: 'POST',
          body
      }),
      invalidatesTags: ['Vehicle']
    }),
    updateVehicle: builder.mutation<void, UpdateVehicleRequest>({
      query: body => ({
          url: `/${body.id}`,
          method: 'PUT',
          body
      }),
      invalidatesTags: ['Vehicle']
     }),
    deleteVehicle: builder.mutation<void, DeleteVehicleRequest>({
      query: body => (
        {
          url: `/${body.id}`,
          method: 'DELETE',
          body
      }),
    invalidatesTags: ['Vehicle']
}),
  }),
})


interface ApiSlice {
  useVehicleListQuery: any
  useCreateVehicleMutation: any
  useDeleteVehicleMutation: any
  useVehicleDetailsQuery: any
  useUpdateVehicleMutation: any
  util: {
    getRunningQueriesThunk: ThunkAction<
      void,
      RootState,
      unknown,
      Action<string>
    >
  }
}

export const {
   useVehicleListQuery,
   useCreateVehicleMutation,
   useDeleteVehicleMutation,
   useVehicleDetailsQuery,
   useUpdateVehicleMutation, 
   util: { getRunningQueriesThunk },
}: ApiSlice = vehicleApi
