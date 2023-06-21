import { ClientData } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Action, ThunkAction } from '@reduxjs/toolkit'


interface CreateClientResponse {
  data: any
  error: any
}

interface CreateClientRequest {
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface UpdateClienteRequest {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

interface ClienteDetailsResponse {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}


interface DeleteClienteRequest {
  id: number
}

interface ClientListResponse extends ClientData {}

export const clientApi = createApi({
  tagTypes: ['Client'],
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/Cliente`,
  }),

  endpoints: (builder) => ({
    clientList: builder.query<ClientListResponse, void>({
      query: params => ({
          url: '',
          method: 'GET',
      }),
      providesTags: ['Client']
    }), 
    
    clientDetails: builder.query<ClienteDetailsResponse, void>({
      query: id => ({
          url: `/${id}`,
          method: 'GET',
      }),
      providesTags: ['Client']
    }),
    createClient: builder.mutation<CreateClientResponse, CreateClientRequest>({
      query: body => ({
          url: '',
          method: 'POST',
          body
      }),
      invalidatesTags: ['Client']
    }),
    updateClient: builder.mutation<void, UpdateClienteRequest>({
      query: body => ({
          url: `/${body.id}`,
          method: 'PUT',
          body
      }),
      invalidatesTags: ['Client']
     }),
    deleteClient: builder.mutation<void, DeleteClienteRequest>({
      query: body => (
        {
          url: `/${body.id}`,
          method: 'DELETE',
          body
      }),
    invalidatesTags: ['Client']
}),
  }),
})


interface ApiSlice {
  useClientListQuery: any
  useCreateClientMutation: any
  useDeleteClientMutation: any
  useClientDetailsQuery: any
  useUpdateClientMutation: any
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
   useClientListQuery,
   useCreateClientMutation,
   useDeleteClientMutation,
   useClientDetailsQuery,
   useUpdateClientMutation, 
   util: { getRunningQueriesThunk },
}: ApiSlice = clientApi
