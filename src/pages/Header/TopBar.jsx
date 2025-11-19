import { Mail, Phone, SquareUser } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-secondary text-white px-4 py-3 block">
      <div className="sm:container md:max-w-6xl lg:max-w-[1400px] mx-auto flex flex-wrap justify-between items-center text-sm">
        <div className="flex items-center flex-wrap sm:space-x-4 sm:mb-0">
          <a
            href="mailto:wetoo.media@gmail.com"
            className="hidden sm:flex items-center mr-2 sm:mr-4 hover:text-white/80"
          >
            <Mail className="hidden sm:block h-4 w-4 mr-2" />
            wetoo.media@gmail.com
          </a>
          <a
            href="tel:+919773573083"
            className="flex items-center hover:text-white/80"
          >
            <Phone className="h-4 w-4 mr-2" />
            +91 9773573083
          </a>
        </div>
        <div className="flex items-center justify-center sm:justify-start flex-wrap">
          {/* <Link to="/result" className="hover:text-yellow-400">
            View Result
          </Link> */}
          {/* <a
            href="https://www.colbrownschool.com/cbs_prbms/login"
            className="hover:text-yellow-400"
            target="_blank"
          >
            View Result
          </a>
          <Link to="/notices" className="hover:text-yellow-400">
            Notice(s)
          </Link> */}
          {/* <Link to="/blog" className="hover:text-yellow-400">
            Blog
          </Link> */}
          <div className="grid sm:grid-cols-2 w-auto sm:mt-2  sm:flex sm:space-x-4">
            <a
              href="/#contact"
              className="sm:bg-primary flex items-center justify-center text-white sm:px-4 sm:py-1 rounded-md sm:hover:bg-primary/80 hover:text-white/80"
            >
              <SquareUser className="h-4 w-4 mr-2" />
              Contact Us
            </a>

            {/* <Link
              to="/admissions/registration"
              className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md hover:bg-yellow-500 text-center sm:text-left"
            >
              Register Now
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
