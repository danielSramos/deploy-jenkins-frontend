import SkillBadge from "../badges/SkillBadge";
import Star from "../Star";

function CardTutorSmall(props: {
  name: string;
  role: string;
  rating: number;
  photo: string;
  skills: string[];
}) {
  return (
    <div className="col-span-1 border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between">
        <div className="flex">
          <img className="w-20 rounded-lg" src={props.photo} alt={props.name} />
          <div className="ml-2">
            <h4 className="font-bold text-slate-900 text-lg">{props.name}</h4>
            <span className="text-gray-600">{props.role}</span>
          </div>
        </div>
        <div className="flex items-start">
          <Star rating={props.rating} is_small={true} mouseClick={() => {}}/>
        </div>
      </div>
      <div className="mt-4">
        <SkillBadge skills={props.skills} is_small={true} />
      </div>
    </div>
  );
}

export default CardTutorSmall;
