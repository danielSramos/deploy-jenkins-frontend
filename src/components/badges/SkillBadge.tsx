function SkillBadge(props: { skills: string[]; is_small: boolean }) {
  // leading-8 ou text-sm

  return (
    <ul
      className={`flex gap-2 flex-wrap ${
        props.is_small
          ? "justify-left leading-6 text-sm"
          : "justify-center leading-8"
      }`}
    >
      {props.skills.map((skill) => (
        <li key={skill}>
          <a className="bg-gray-200 py-1 px-3 rounded-full">
            {skill}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SkillBadge;
