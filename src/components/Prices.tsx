export function Pricing() {
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
          <button className="font-bold border border-blue-600 px-12 py-4 rounded-lg hover:bg-blue-600">
            Quero ser aluno
          </button>
        </div>
        <p className="text-slate-300">Não é necessário cartão de crédito.</p>
      </div>
    </section>
  );
}
