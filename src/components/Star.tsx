function Star({
  rating,
  is_small,
  mouseClick,
}: {
  rating: number;
  is_small: boolean;
  mouseClick: (rating: number) => void;
}) {
  return (
    <figure className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          onMouseOver={() => mouseClick(index + 1)}
          key={index}
          width={is_small ? "16" : "31"}
          height={is_small ? "16" : "31"}
          viewBox={is_small ? "0 0 31 31" : "0 0 31 31"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7027 3.87004C15.0021 2.94873 16.3055 2.94873 16.6048 3.87004L18.7463 10.4607C18.8802 10.8728 19.2641 11.1517 19.6974 11.1517L26.6272 11.1517C27.5959 11.1517 27.9987 12.3913 27.215 12.9607L21.6086 17.034C21.2581 17.2887 21.1115 17.74 21.2454 18.1521L23.3868 24.7428C23.6862 25.6641 22.6317 26.4302 21.848 25.8608L16.2416 21.7875C15.8911 21.5329 15.4165 21.5329 15.066 21.7875L9.45962 25.8608C8.67591 26.4302 7.62143 25.6641 7.92078 24.7428L10.0622 18.1521C10.1961 17.74 10.0494 17.2887 9.69896 17.034L4.09258 12.9607C3.30886 12.3913 3.71164 11.1517 4.68036 11.1517L11.6102 11.1517C12.0435 11.1517 12.4274 10.8728 12.5613 10.4607L14.7027 3.87004Z"
            fill={index < rating ? "#F5BF14" : ""}
            stroke={index >= rating ? "#F5BF14" : "none"}
          />
        </svg>
      ))}
    </figure>
  );
}

export default Star;
