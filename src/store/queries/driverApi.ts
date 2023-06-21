import {DriverData } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Action, ThunkAction } from '@reduxjs/toolkit'


interface DriverListResponse extends DriverData {}

interface CreateDriverResponse {
  data: number
}

interface CreateDriverRequest {
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

interface DriverDetailsResponse {
  id: number
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

interface UpdateDriverRequest {
  id: number
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}


interface DeleteDriverRequest {
  id: number
}

export const driverApi = createApi({
  tagTypes: ['Driver'],
  reducerPath: 'driverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/Condutor`,
  }),

  endpoints: (builder) => ({
    driverList: builder.query<DriverListResponse, void>({
      query: params => ({
          url: '',
          method: 'GET',
      }),
      providesTags: ['Driver']
    }), 

    driverDetails: builder.query<DriverDetailsResponse, void>({
      query: id => ({
          url: `/${id}`,
          method: 'GET',
      }),
      providesTags: ['Driver']
    }),

    createDriver: builder.mutation<CreateDriverResponse, CreateDriverRequest>({
      query: body => ({
          url: '',
          method: 'POST',
          body
      }),
      invalidatesTags: ['Driver']
    }),

    updateDriver: builder.mutation<void, UpdateDriverRequest>({
      query: body => ({
          url: `/${body.id}`,
          method: 'PUT',
          body
      }),
      invalidatesTags: ['Driver']
     }),

    deleteDriver: builder.mutation<void, DeleteDriverRequest>({
      query: body => (
        {
          url: `/${body.id}`,
          method: 'DELETE',
          body
      }),
      invalidatesTags: ['Driver']  
    }),
  }),
})


interface ApiSlice {
  useDriverListQuery: any
  useDriverDetailsQuery: any
  useCreateDriverMutation: any
  useUpdateDriverMutation: any
  useDeleteDriverMutation: any

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
  useDriverListQuery,
  useDriverDetailsQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
   util: { getRunningQueriesThunk },
}: ApiSlice = driverApi
