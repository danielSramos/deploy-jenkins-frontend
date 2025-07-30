import { Link } from "react-router-dom";
import SkillBadge from "../components/badges/SkillBadge";
import Testimonial from "../components/layouts/Testimonals";
import CardTutorSmall from "../components/tutor/CardTutorSmall";
// import developers from "../mocks/tutores.json";
import testimonials from "../mocks/testimonials.json";
import { useEffect, useState } from "react";

type Tutor = {
  id: number;
  name: string;
  role: string;
  rating: number;
  photo: string;
  skills: string[];
};

function Home() {
  const [tutores, setTutores] = useState<Tutor[]>([]);

  // COMO NÃO FAZER
  /*
  fetch(
    "https://my-json-server.typicode.com/caetanovns/mentorr-fake-json/tutores"
  )
    .then((res) => res.json())
    .then((data : Tutor[]) => setTutores(data));
  */

  // ALGO DESSE TIPO
  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/caetanovns/mentorr-fake-json/tutores"
    )
      .then((res) => res.json())
      .then((data: Tutor[]) => setTutores(data));
    //console.log("busca tutores");
  }, []);

  return (
    <>
      <Hero />
      <Testimonial testimonials={testimonials} />
      <section className="px-8 md:px-0">
        <div className="container mx-auto py-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Busque em 5.400+<span className="block">mentores disponíveis</span>
          </h2>
        </div>
        <div className="container mx-auto pb-14">
          <div className="grid md:grid-cols-3 gap-6">
            {tutores?.map((dev) => (
              <CardTutorSmall
                name={dev.name}
                role={dev.role}
                rating={dev.rating}
                skills={dev.skills}
                photo={dev.photo}
                key={dev.id}
              />
            ))}
          </div>
        </div>
      </section>
      <Pricing />
    </>
  );
}

function Hero() {
  const [busca, setBusca] = useState<string>("");
  return (
    <section className="flex flex-col justify-center py-14 px-8 md:px-0">
      <div className="flex flex-col text-center gap-6">
        <h3 className="text-md md:text-xl">
          Aprenda uma nova habilidade, lance um projeto e evolua na carreira
        </h3>
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Mentoria{" "}
          <span className="underline decoration-dashed decoration-blue-600">
            especializada
          </span>{" "}
          1 para 1
        </h1>
        <h2 className="text-md md:text-xl text-gray-600">
          Encontre um mentor hoje:
        </h2>

        <div className="flex w-full md:w-1/3 mx-auto gap-4 px-8">
          <input
            onChange={(event) => {
              setBusca(event.target.value);
            }}
            value={busca}
            className="border h-14 rounded-lg w-full md:w-3/4 px-4"
            type="text"
            placeholder="Busque por habilidades, tecnologias, etc..."
          />
          <a
            href={`/buscar?habilidade=${busca}`}
            className="flex justify-center items-center md:w-1/4 px-6 bg-blue-600 text-white font-bold rounded-lg cursor-pointer"
          >
            Buscar
          </a>
        </div>

        <div className="md:w-1/3 mx-auto">
          <SkillBadge
            skills={[
              "tecnologia",
              "ux/ui design",
              "gestão",
              "negócios",
              "financeiro",
              "startups",
            ]}
            is_small={false}
          />
        </div>

        <div className="container mx-auto py-6">
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 md:gap-24">
            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">5.400+</div>
              <div className="text-md md:text-lg text-gray-600">
                Mentores disponíveis
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">23.100+</div>
              <div className="text-md md:text-lg text-gray-600">
                Parcerias firmadas
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">130+</div>
              <div className="text-md md:text-lg text-gray-600">
                Países representados
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-slate-900 text-white py-14">
      <div className="container mx-auto flex flex-col justify-center items-center gap-10">
        <h4 className="md:text-3xl font-bold">
          Que tal monetizar sua experiência?
        </h4>
        <h3 className="text-2xl md:text-4xl font-bold">
          Torne-se um mentorr especializado
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <button className="bg-blue-600 px-12 font-bold py-4 rounded-lg hover:bg-blue-700">
            Quero ser Mentorr
          </button>
          <Link
            to="/buscar"
            className="font-bold border border-blue-600 px-12 py-4 rounded-lg hover:bg-blue-600"
          >
            Quero ser aluno
          </Link>
        </div>
        <p className="text-slate-300">Não é necessário cartão de crédito.</p>
      </div>
    </section>
  );
}

export default Home;
