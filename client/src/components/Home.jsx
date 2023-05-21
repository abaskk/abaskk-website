import Intro from "./HomeViews/Intro"
import About from "./HomeViews/About"
import Skills from "./HomeViews/Skills"
import Projects from "./HomeViews/Projects"
import Experience from "./HomeViews/Experience"
import Footer from "./HomeViews/Footer"



const Home = (props) => {
  const userData = props.userData
  const introData = {
    name:userData.name,
    year:userData.year,
    resume_link: userData.resume_link,
    gh_link: userData.github_link,
    linkedin: userData.linkedin,
    email: userData.email,
  }

  const aboutData = userData.description
  const skillsData =  userData.skills
  const projectData = userData.projects
  const jobData = userData.experience
  


  return (
    
    <div className="h-screen w-screen bg-midnight text-white">
       <div className="container mx-auto px-8 sm:px-20 lg:px-36 xl:px-64">
         
          <Intro info={introData} />
          <About description={aboutData} />
          <Skills skills={skillsData} />
          <Projects projects={projectData} />
          <Experience experience={jobData} />
          <Footer />

       </div>
    </div>
  )
}

export default Home
