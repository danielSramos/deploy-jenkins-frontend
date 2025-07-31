import { useState } from "react";
import SkillBadge from "./badges/SkillBadge";
import Star from "./Star";

export function Card({ item }: any) {
  const [rating, setRating] = useState(item.rating ?? 0);

  const handleMessage = (rating: number) => {
    setRating(rating);
  };

  return (
    <div className="p-4 rounded border flex gap-4">
      <div className="col-span-1 min-h-44 min-w-44">
        <img src="./imgmentor.png" alt="imgmentor" />
      </div>
      <div className="flex flex-col col-span-5 gap-4">
        <div className="flex flex-col gap-1">
          <strong className="text-xl">{item.name}</strong>
          <span>
            {item.position} na {item.company}
          </span>
          <div>
            <Star rating={rating} is_small={false} mouseClick={handleMessage} />
          </div>
        </div>
        <span>{item.description}</span>
        <div className="mx-auto">
          <SkillBadge skills={item.skills} is_small={false} />
        </div>
        <div className="flex justify-between gap-2 items-center">
          <span className="text-2xl font-bold">R$ 800,00 / mês</span>
          <button className="bg-blue-600 px-12 font-bold py-4 rounded-lg hover:bg-blue-700 text-white">
            Ver perfil completo
          </button>
        </div>
      </div>
    </div>
  );
}
