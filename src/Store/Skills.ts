import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./dataService";
import { SingleSkill } from "../Types";

export const SkillsApi = createApi({
  reducerPath: "SkillsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Skills"],
  endpoints: ({ query }) => ({
    getSkillsData: query<SingleSkill, string | undefined>({
      query: (id) => `skill/${id}`,
      providesTags: ["Skills"],
      transformResponse: (response: any) => {
        return response?.data?.skill;
      },
    }),
  }),
});

export const { useGetSkillsDataQuery } = SkillsApi;
