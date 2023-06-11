
const Projects = (props) => {

   const projects = props.projects
   const projectShow = projects.map((project,index) => {
      return (
         <div
               key={index} className=" py-5 w-full  md:wd-1/3 flex flex-col flex-shrink-0 bg-dark_purp  dark:text-white max-w-sm rounded-lg  shadow-lg">
               <div className="px-6 py-2">
                  <div className="font-bold text-xl my-3">{project.title}</div>

                  <div className="my-3">
                     {
                        project.technologies.map((tech,index2) => {
                           return (
                              <span
                                 key={index2} className="inline-block border border-white rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                    {tech}
                              </span>
                           )

                        })

                     }
                          
                  </div>
                  <p>
                     {project.description}
                  </p>
               </div>


               <div className="px-6 py-4 mt-auto">
                  <button className="p-2 mr-2 bg-pastel_red text-white text-sm font-medium rounded-md">
                  <a href={project.repo_link} target="_blank"> Github </a>
                  </button>
                  <button className="p-2 mr-2 bg-pastel_red text-white text-sm font-medium rounded-md">
                  <a href={project.demo_link} target="_blank">Demo </a>
                  </button>
               </div>
            </div>

      )
   })


    return(
        <div className="my-24">
            <div>
                <p className="text-3xl py-4">Projects</p>
            </div>

            <div className="flex flex-nowrap lg:flex-wrap gap-5 place-content-start overflow-x-scroll xl:overflow-x-hidden">
      
               {projectShow}

            </div>

        </div>
    )

}

export default Projects