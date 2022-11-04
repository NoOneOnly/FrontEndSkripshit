import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://node-server-skripsi.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/' }),
    ragTypes: ['Note', 'User'],
    endpoints: builder => ({})
})


