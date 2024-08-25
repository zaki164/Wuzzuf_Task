export type IdObject = {
  id: string
}
export type Job = {
  id: string,
  type: string,
  attributes: {
    title: string
  },
  relationships: {
    jobs: IdObject[]
    skills: IdObject[]
  },
}
export type AllJobs = {
  jobs: Job[],
  meta: {
    next?: number,
    count?: number
  }
}
export type SingleSkill = {
  id: string,
  type: string,
  attributes: {
    name: string,
    type: string
    importance: string,
    level: string
  },
  relationships: {
    jobs: IdObject[]
    skills: IdObject[]
  },
}