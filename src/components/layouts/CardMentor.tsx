import Star from "../Star";
import dollar from "../../assets/dollar.svg";
import checked from "../../assets/verified.svg";
import SkillBadge from "../badges/SkillBadge";
import { Link } from "react-router-dom";

function CardMentor(props: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-start items-center w-full p-4 border rounded gap-4">
      <div className="md:w-1/4 flex items-center justify-center">
        <img
          src="https://placehold.co/400"
          className="w-32 h-32 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1 md:w-2/3">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold">{props.mentor.user.name}</h3>
          <figure>
            <img src={checked} />
          </figure>
        </div>
        <span className="text-slate-600">
          {props.mentor.cargo && props.mentor.empresa
            ? `${props.mentor.cargo.name} na ${props.mentor.empresa.name}`
            : ""}
        </span>
        <figure>
          <Star
            rating={props.mentor.avaliacao ?? 0}
            is_small={false}
            mouseClick={() => {}}
          />
        </figure>
        <p className="text-sm text-justify">{props.mentor.biografia}</p>
        <div className="mx-auto m-4">
          <SkillBadge
            skills={
              props.mentor.habilidades?.map(
                (habilidade: any) => habilidade.name
              ) ?? []
            }
            is_small={true}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <figure>
              <img src={dollar} />
            </figure>
            <span className="text-2xl font-extrabold">
              {props.mentor.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <span className="text-sm font-medium">/mês</span>
            </span>
          </div>
          <Link
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg"
            to={`perfil/${props.mentor.id}`}
          >
            Ver perfil completo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardMentor;
