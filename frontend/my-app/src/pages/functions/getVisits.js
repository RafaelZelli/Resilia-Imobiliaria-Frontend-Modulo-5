import config from "../base/config.json";

export default async function getVisits(id) {
  let url = config.baseURL + "/agendamentos";
  var body = {
    codigo_imovel: `${id}`,
  };
  let myRequest = new Request(url);
  let works = [];
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
        works = json;
    })
    .catch((error) => {
      console.error(error);
      works = [];
    });
  return works;
}
