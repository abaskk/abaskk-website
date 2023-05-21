import Blob from "../../assets/blob.svg";

const About = (props) => {
    return (
    <div className="my-16">
        <div>
            <p className="text-3xl py-2">About me</p>
        </div>
        
        <div className="flex flex-wrap items-center">
            <div className=" w-full md:w-3/5 text-left my-4">
                <p className="pr-4 lg:pr-12 text-lg font-normal ">
                     {props.description}
                </p>
            </div>

            <div className="w-full md:w-2/5 my-2 ">
                <img className="mx-auto h-17 rounded-lg" src={Blob} />
            </div>
        </div>
    </div>
    )

}
export default About