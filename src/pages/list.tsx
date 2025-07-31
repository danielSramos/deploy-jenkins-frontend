import { useCallback, useEffect, useState } from "react";
import { Card } from "../components/Card";
import RadioButton from "../components/inputs/RadioButton";

import SearchInput from "../components/inputs/SearchInput";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { Pricing } from "../components/Prices";
import { listMentors } from "../services";

export function List() {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [mentors, setMentors] = useState<any>([]);

  const fetchMentors = useCallback(async () => {
    const output = await listMentors();
    setMentors(output);
  }, []);

  const area_conhecimento = [
    { value: "produto", label: "Produto" },
    { value: "ux_ui", label: "UX/UI" },
    { value: "web", label: "Web" },
    { value: "startup", label: "Startup" },
    { value: "gestao", label: "Gestão e Negócios" },
    { value: "financas", label: "Finanças" },
    { value: "tecnologias", label: "Tecnologias" },
  ];

  const cargos = [
    { value: "CEO", label: "CEO" },
    { value: "CTO", label: "CTO" },
    { value: "senior", label: "Sênior" },
    { value: "pleno", label: "Pleno" },
    { value: "consultor", label: "Consultor" },
    { value: "professor", label: "Professor" },
  ];

  const empresas = [
    { value: "google", label: "Google" },
    { value: "amazon", label: "Amazon" },
    { value: "mercado_livre", label: "Mercado Livre" },
    { value: "meta", label: "Meta" },
    { value: "totvs", label: "TOTVS" },
    { value: "magalu", label: "Magazine Luiza" },
  ];

  const handleSearch = () => {};

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap w-full min-h-screen">
        <div className="flex flex-col my-5 w-full md:hidden">
          <button
            type="button"
            className="bg-blue-600 text-white font-semibold text-md rounded-lg h-10 mx-24 "
          >
            Filtros
          </button>
        </div>
        <div className="w-full sm:w-1/3 pr-0 sm:pr-10 hidden md:block">
          <div className="relative w-full max-w-full lg:max-w-md mt-10  ">
            <SearchInput
              onSearch={handleSearch}
              label="Buscar por habilidades"
            />
          </div>
          <div className="flex flex-col mt-20">
            <SearchInput onSearch={handleSearch} label="Área de conhecimento" />
            <RadioButton
              options={area_conhecimento}
              name="area_conhecimento"
              selected={selectedOption}
              onChange={setSelectedOption}
            />
            <SearchInput onSearch={handleSearch} label="Cargo" />
            <RadioButton
              options={cargos}
              name="cargos"
              selected={selectedOption}
              onChange={setSelectedOption}
            />
            <SearchInput onSearch={handleSearch} label="Empresas" />
            <RadioButton
              options={empresas}
              name="empresas"
              selected={selectedOption}
              onChange={setSelectedOption}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-2/3 my-10">
          {mentors.map((item: any) => {
            return <Card item={item} key={item.email} />;
          })}
        </div>
      </div>
      <div>
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
