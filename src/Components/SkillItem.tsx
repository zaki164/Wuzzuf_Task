import { useGetSkillsDataQuery } from "../Store/Skills";

const SkillItem = ({ skill }: { skill: string }) => {
  const { data, isError, isLoading } = useGetSkillsDataQuery(skill);

  return (
    !isError &&
    <div className="skill">
      {
        isLoading
          ?
          "loading..."
          :
          data?.attributes?.name
      }
    </div>
  )
}

export default SkillItem