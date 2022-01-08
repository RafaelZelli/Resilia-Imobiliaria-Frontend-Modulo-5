import config from "../base/config.json";

export default async function findHouse(city, neighborhood, rooms, price) {
  let url = config.baseURL + "/buscaCasa";
  let body = {};
  if (city != undefined) body.municipio = `${city}`;
  if (neighborhood != undefined) body.bairro = `${neighborhood}`;
  if (rooms != 0 && rooms != undefined) body.num_quartos = `${rooms}`;
  if (price != 0 && price != undefined) body.valor_aluguel = `${price}`;
  let propertys = [];
  let myRequest = new Request(url);
  console.log(JSON.stringify(body))
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
      json.forEach((element) => {
        propertys.push(element);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  url = config.baseURL + "/buscaApartamento";
  myRequest = new Request(url);
  await fetch(myRequest, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
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
      json.forEach((element) => {
        propertys.push(element);
      });
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(propertys)
  return propertys;
}
