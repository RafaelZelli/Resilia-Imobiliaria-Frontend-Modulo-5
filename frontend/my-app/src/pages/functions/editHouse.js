import config from "../base/config.json";

export default async function editHouse(
  codigo,
  type,
  valor_aluguel,
  num_quartos,
  num_suites,
  num_sala_estar,
  num_vagas_garagem,
  area,
  armario_embutido,
  descricao,
  condominio,
  municipio,
  bairro,
  logradouro,
  numero,
  complemento,
  num_sala_jantar,
  andar,
  portaria_24,
  CEP
) {
  let url = "";
  if (type == "Casa") {
    url = config.baseURL + "/casa";
  } else {
    url = config.baseURL + "/apartamento";
  }
  let body = {
    codigo,
    valor_aluguel: `${valor_aluguel}`,
    num_quartos,
    num_suites,
    num_sala_estar,
    num_vagas_garagem,
    area: `${area}`,
    armario_embutido: `${armario_embutido}`,
    descricao: `${descricao}`,
    condominio: `${condominio}`,
    municipio: `${municipio}`,
    bairro: `${bairro}`,
    logradouro: `${logradouro}`,
    numero,
    complemento: `${complemento}`,
    num_sala_jantar,
    andar,
    portaria_24: `${portaria_24}`,
    CEP: `${CEP}`,
  };
  let edited = false;
  console.log(body);
  let myRequest = new Request(url);
  await fetch(myRequest, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return "error";
      }
    })
    .then((response) => {
      console.log(response);
      if(response.ok>=1){
        edited = true
      }
    })
    .catch((error) => {});

  return edited;
}
