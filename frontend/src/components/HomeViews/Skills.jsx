
const Skills = (props) =>{

   const skills = props.skills
   const skillsList = skills.map((skill,index) => {
      return (
         <div key={index}
              className="border w-full md:w-1/3 lg:w-1/4 border-white border-2 text-lg rounded-md p-2">
            {skill}
         </div>
      )
   })

    return (
        <div className="my-24">
            <div>
                <p className="text-3xl py-4 mb-4">Skills</p>
            </div>

            <div className="flex flex-wrap gap-3 mr-28 md:mr-0">
               {skillsList}
            </div>
        </div>
    )
}

export default Skills