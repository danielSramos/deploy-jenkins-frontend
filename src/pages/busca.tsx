import { useEffect, useMemo, useState } from "react";
import lupa from "../assets/lupa.svg";
import CardMentor from "../components/layouts/CardMentor";
import { useSearchParams } from "react-router-dom";
import { Mentor, Option } from "../types";

function Buscar() {
  const areas_data: Option[] = [
    { id: 1, nome: "Back-end" },
    { id: 2, nome: "UX/UI" },
    { id: 3, nome: "Front-end" },
    { id: 4, nome: "Startup" }, // Corrigido "Starup" para "Startup"
    { id: 5, nome: "Finanças" },
  ];

  const empresas_data: Option[] = [
    { id: 1, nome: "Back-end" }, // Esses dados parecem ser os mesmos de 'areas_data'. Verifique se é o esperado.
    { id: 2, nome: "UX/UI" },
    { id: 3, nome: "Front-end" },
    { id: 4, nome: "Startup" },
    { id: 5, nome: "Finanças" },
  ];

  const cargos_data: Option[] = [
    { id: 1, nome: "CEO" },
    { id: 2, nome: "CTO" },
    { id: 3, nome: "Sênior" },
    { id: 4, nome: "Pleno" },
    { id: 5, nome: "Professor" },
  ];

  const [mentores, setMentores] = useState<Mentor[]>([]); // Tipagem adicionada aqui
  const [empresas] = useState<Option[]>(empresas_data);
  const [cargos] = useState<Option[]>(cargos_data);
  const [areas] = useState<Option[]>(areas_data);
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [query] = useSearchParams();
  const buscaTudo = query.get("habilidade");
  const [buscaSimples, setBuscaSimples] = useState("");

  const dataSource = useMemo(() => {
    // Tipagem adicionada aqui para o 'item'
    const todosMentores = mentores.filter((item: Mentor) => {
      // Se não há áreas selecionadas e nem busca simples, retorne todos
      if (areasSelecionadas.length === 0 && !buscaSimples) {
        return true;
      }

      let selecionadoPorArea =
        areasSelecionadas.length > 0
          ? areasSelecionadas.includes(item.habilidade_principal)
          : false;

      let temBusca = buscaSimples
        ? item.habilidade_principal
            .toLowerCase()
            .includes(buscaSimples.toLowerCase())
        : false;

      // Retorna se está selecionado por área OU se a busca simples corresponde
      return selecionadoPorArea || temBusca;
    });
    return todosMentores;
  }, [mentores, buscaSimples, areasSelecionadas]);

  useEffect(() => {
    setLoading(true);
    setMentores([]); // Limpa os mentores antes de carregar
    setBuscaSimples(buscaTudo ?? ""); // Define a busca simples com base na URL
    fetch(
      `https://my-json-server.typicode.com/caetanovns/mentorr-fake-json/mentores`
    )
      .then((res) => res.json())
      .then((data: Mentor[]) => {
        // Tipagem para os dados recebidos da API
        setMentores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar mentores:", error);
        setLoading(false);
      });
  }, [buscaTudo]);

  const handleAreaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    areaNome: string
  ) => {
    if (event.target.checked) {
      // Adiciona a área se ela foi marcada
      setAreasSelecionadas((prevAreas) => [...prevAreas, areaNome]);
    } else {
      // Remove a área se ela foi desmarcada
      setAreasSelecionadas((prevAreas) =>
        prevAreas.filter((area) => area !== areaNome)
      );
    }
  };

  return (
    <section>
      <div className="container mx-auto flex flex-col md:flex-row md:gap-16 py-4">
        <div className="flex flex-col md:w-1/3 md:p-0 p-6 gap-10">
          <div className="w-full md:w-full mx-auto relative">
            <input
              value={buscaSimples}
              onChange={(event) => {
                setBuscaSimples(event.target.value);
              }}
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              placeholder="Busque por habilidades"
            />
            <img
              src={lupa}
              className="absolute top-1/3 right-4"
              alt="Ícone de Busca" // Alterado para português
            />
          </div>
          <div className="w-full relative">
            <label
              htmlFor="conhecimento"
              className="text-slate-800 font-semibold"
            >
              Área do Conhecimento
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="conhecimento"
              // Adicione um estado e onChange se quiser que este input filtre
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Ícone de Busca" // Alterado para português
            />
          </div>
          <div id="area-container" className="flex flex-col gap-3">
            {areas.map((area) => {
              return (
                <div className="flex gap-3 items-center" key={area.id}>
                  <input
                    checked={areasSelecionadas.includes(area.nome)}
                    onChange={(event) => handleAreaChange(event, area.nome)} // Usando a nova função
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                  />
                  <span className="text-slate-600">{area.nome}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full relative">
            <label htmlFor="cargo" className="text-slate-800 font-semibold">
              Cargo
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="cargo"
              // Adicione um estado e onChange se quiser que este input filtre
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Ícone de Busca"
            />
          </div>
          <div id="cargo-container" className="flex flex-col gap-3">
            {cargos.map((cargo) => {
              return (
                <div className="flex gap-3 items-center" key={cargo.id}>
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                    // Adicione lógica de `checked` e `onChange` se for para filtrar
                  />
                  <span className="text-slate-600">{cargo.nome}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full relative">
            <label htmlFor="empresa" className="text-slate-800 font-semibold">
              Empresas
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="empresa"
              // Adicione um estado e onChange se quiser que este input filtre
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Ícone de Busca"
            />
          </div>
          <div id="empresa-container" className="flex flex-col gap-3">
            {empresas.map((empresa) => {
              return (
                <div className="flex gap-3 items-center" key={empresa.id}>
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                    // Adicione lógica de `checked` e `onChange` se for para filtrar
                  />
                  <span className="text-slate-600">{empresa.nome}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div id="mentor-container" className="flex flex-col md:w-2/3 gap-6">
          {loading ? (
            <Loading />
          ) : dataSource.length > 0 ? (
            dataSource.map((mentor) => (
              <CardMentor key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div
              className="p-4 mb-4 text-sm text-center text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">Nenhum Mentor Disponível</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Loading() {
  return <p className="text-gray-900 text-lg dark:text-white">CARREGANDO...</p>;
}

export default Buscar;
