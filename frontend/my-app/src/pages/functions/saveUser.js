import config from "../base/config.json";

export default async function saveUser(nome, email, login, senha, telefone) {
  let url = config.baseURL + "/usuario";
  let body = {
    nome: `${nome}`,
    email:`${email}`,
    login: `${login}`,
    senha: `${senha}`,
    telefone: `${telefone}`,
  };
  console.log(JSON.stringify(body))
  let isLogin = false;
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
      console.log(response.json())
      isLogin = login;
    } else {
      isLogin = false;
    }
  });

  return isLogin;
}
