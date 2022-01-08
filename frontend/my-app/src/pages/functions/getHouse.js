import config from "../base/config.json";

export default async function getHouse(houseId, type) {
  let url = "";
  if (type == "Casa") {
    url = config.baseURL + "/casa?codigo=" + houseId;
  } else {
    url = config.baseURL + "/apartamento?codigo=" + houseId;
  }
  let house = false;
  let myRequest = new Request(url);
  await fetch(myRequest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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
      house = json;
    })
    .catch((error) => {});

  return house;
}
