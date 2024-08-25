import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./dataService";
import { AllJobs, Job } from "../Types";

export const JobsApi = createApi({
  reducerPath: "JobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Jobs"],
  endpoints: ({ query }) => ({
    getJobsData: query<AllJobs, { cursor?: number, limit?: number }>({
      query: ({ cursor, limit }) => `/jobs?cursor=${cursor}&limit=${limit}`,
      providesTags: ["Jobs"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getJobsSearch: query<AllJobs, string>({
      query: (search) => `/jobs/search?query=${search || ''}`,
      providesTags: ["Jobs"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getSingleJob: query<Job, string | undefined>({
      query: (id) => `/job/${id}`,
      providesTags: ["Jobs"],
      transformResponse: (response: any) => {
        return response?.data?.job;
      },
    }),
  }),
});

export const { useGetJobsDataQuery, useGetSingleJobQuery, useGetJobsSearchQuery } = JobsApi;
