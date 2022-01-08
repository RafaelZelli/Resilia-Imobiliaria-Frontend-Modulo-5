import config from "../base/config.json";

export default async function deleteAgend(id) {
  console.log("F: "+id)
  let url = config.baseURL + "/agendar?codigo="+`${id}`;
 
  let myRequest = new Request(url);
  console.log(url)
  let works = false;
  await fetch(myRequest, {
    method: "DELETE",
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
