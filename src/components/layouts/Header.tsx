import { Link } from "react-router-dom";
import logo from "../../assets/logo-mentorr.svg";

function Header() {
  return (
    <>
      <header className="px-8 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row py-6 md:py-0 gap-6 md:gap-0 justify-between items-center md:h-24">
          <div>
            <Link to="/">
              <img src={logo} alt="logotipo Mentorr" />
            </Link>
          </div>
          <div className="flex gap-4 md:gap-12 items-center">
            <div className="flex gap-2">
              <a href="/">For Business</a>
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 font-semibold rounded-lg">
              Quero ser Mentorr
            </button>
            <a href="/">Login</a>
          </div>
        </div>
      </header>

      <HeaderMenu />
    </>
  );
}

function HeaderMenu() {
  return (
    <div className="md:border h-14 flex items-center">
      <div className="container mx-auto">
        <nav className="hidden md:block">
          <ul className="flex justify-between">
            <li>
              <Link to={`/buscar?habilidade=${"UX/UI"}`}>UX/UI</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"Front-end"}`}>Front-end</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"Back-end"}`}>Back-end</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"DevOps"}`}>DevOps</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"agile"}`}>Agile</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"Cloud Computing"}`}>Cloud Computing</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"Inteligência Artificial"}`}>Inteligência Artificial</Link>
            </li>
            <li>
              <Link to={`/buscar?habilidade=${"Segurança da Informação"}`}>Segurança da Informação</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
