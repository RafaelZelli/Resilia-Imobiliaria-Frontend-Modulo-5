import config from "../base/config.json";

export default async function saveHouse(
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
  CEP,
  login_proprietario
) {
  let url = "";
  if (type == "Casa") {
    url = config.baseURL + "/casas";
  } else {
    url = config.baseURL + "/apartamentos";
  }
  let body = {
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
    login_proprietario: `${login_proprietario}`,
  };
  let isLogin = false;
  let myRequest = new Request(url);
  console.log(body);
  await fetch(myRequest, {
    method: "POST",
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
    .then((response) => {})
    .catch((error) => {});

  return isLogin;
}
