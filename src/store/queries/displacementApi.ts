import { DisplacementData } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Action, ThunkAction } from '@reduxjs/toolkit'


interface CreateDisplacementResponse {
  data: number
}

interface CreateDisplacementRequest {
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface UpdateDisplacementRequest {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface DisplacementDetailsResponse {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}


interface DeleteDisplacementRequest {
  id: number
}

interface DisplacementListResponse extends DisplacementData {}

export const displacementApi = createApi({
  tagTypes: ['Displacement'],
  reducerPath: 'displacementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/Deslocamento`,
  }),

  endpoints: (builder) => ({
    DisplacementList: builder.query<DisplacementListResponse, void>({
      query: params => ({
          url: '',
          method: 'GET',
      }),
      providesTags: ['Displacement']
    }), 
    
    DisplacementDetails: builder.query<DisplacementDetailsResponse, void>({
      query: id => ({
          url: `/${id}`,
          method: 'GET',
      }),
      providesTags: ['Displacement']
    }),
    createDisplacement: builder.mutation<CreateDisplacementResponse, CreateDisplacementRequest>({
      query: body => ({
          url: '/IniciarDeslocamento',
          method: 'POST',
          body
      }),
      invalidatesTags: ['Displacement']
    }),
    updateDisplacement: builder.mutation<void, UpdateDisplacementRequest>({
      query: body => ({
          url: `/${body.id}/EncerrarDeslocamento`,
          method: 'PUT',
          body
      }),
      invalidatesTags: ['Displacement']
     }),
    deleteDisplacement: builder.mutation<void, DeleteDisplacementRequest>({
      query: body => (
        {
          url: `/${body.id}`,
          method: 'DELETE',
          body
      }),
    invalidatesTags: ['Displacement']
}),
  }),
})


interface ApiSlice {
  useDisplacementListQuery: any
  useCreateDisplacementMutation: any
  useDeleteDisplacementMutation: any
  useDisplacementDetailsQuery: any
  useUpdateDisplacementMutation: any
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
   useDisplacementListQuery,
   useCreateDisplacementMutation,
   useDeleteDisplacementMutation,
   useDisplacementDetailsQuery,
   useUpdateDisplacementMutation, 
   util: { getRunningQueriesThunk },
}: ApiSlice = displacementApi
