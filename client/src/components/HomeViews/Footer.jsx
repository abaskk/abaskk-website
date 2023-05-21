const Footer = () => {
    let year = new Date().getFullYear();

    return (
        <footer className="bg-white rounded-lg  dark:bg-midnight">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
           <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year}  Amruth H.B
           </span>
        </div>
     </footer>
    )


}

export default Footer