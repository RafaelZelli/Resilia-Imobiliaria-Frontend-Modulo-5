import config from "../base/config.json";

export default async function getPropertyById(id) {
  let url = config.baseURL + "/casa/user";
  let body = {
    login_proprietario: id,
  };
  let propertys = [];
  let myRequest = new Request(url);
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
  url = config.baseURL + "/apartamento/user";
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
   
    return propertys;
}
