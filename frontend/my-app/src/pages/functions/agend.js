import config from "../base/config.json";

export default async function agend(date, id, nome, cpf, telefone) {
  let url = config.baseURL + "/agendar";
  var body = {
    data: `${date}`,
    codigo_imovel: `${id}`,
    nome: `${nome}`,
    CPF: `${cpf}`,
    telefone: `${telefone}`,
  };
  let myRequest = new Request(url);
  let works = false;
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
    .then((json) => {
        works = true;
    })
    .catch((error) => {
      console.error(error);
      works = false;
    });
  return works;
}
