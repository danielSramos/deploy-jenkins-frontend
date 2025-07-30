import { useState } from "react";
import Star from "../Star";

function Testimonial(props: {
  testimonials: {
    rating: number;
    testimonial: string;
    person: { name: string; role: string; photo: string };
  }[];
}) {
  return (
    <section className="bg-slate-200 px-8 md:px-0">
      <div
        id="default-carousel"
        className="relative w-full p-14"
        data-carousel="static"
      >
        <div className="relative h-56 overflow-hidden rounded-lg">
          {props.testimonials.map((item) => (
            <TestimonialItem item={item} key={item.person.name} />
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {props.testimonials.map((item, index) => (
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label={item.testimonial}
              data-carousel-slide-to={index}
              key={index}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialItem({
  item,
}: {
  item: {
    rating: number;
    testimonial: string;
    person: { name: string; role: string; photo: string };
  };
}) {
  const [rating, setRating] = useState(item.rating);

  const handleMessage = (rating: number) => {
    setRating(rating);
  };

  return (
    <div className="hidden duration-700 ease-in-out" data-carousel-item>
      <div className="container mx-auto flex flex-col gap-8">
        <div>
          <Star rating={rating} is_small={false} mouseClick={handleMessage} />
        </div>

        <div>
          <p className="md:w-2/3">{item.testimonial}</p>
        </div>

        <div className="flex gap-4">
          <div>
            <figure>
              <img
                className="w-16 rounded-full"
                src="https://placehold.co/400"
                alt="Kauan Ribeiro"
              />
            </figure>
          </div>
          <div>
            <div className="font-bold text-slate-600 text-lg">
              {item.person.name}
            </div>
            <div className="text-slate-600">{item.person.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
