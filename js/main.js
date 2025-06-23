document.getElementById("pesquisar").addEventListener("click", () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido! Deve conter 8 dígitos.");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      return response.json();
    })
    .then((dados) => {
      if (dados.erro) {
        alert("CEP não encontrado!");
        return;
      }

      document.getElementById("logradouro").value = dados.logradouro || "";
      document.getElementById("bairro").value = dados.bairro || "";
      document.getElementById("cidade").value = dados.localidade || "";
      document.getElementById("estado").value = dados.uf || "";

    })
    .catch((erro) => {
      console.error("Erro ao buscar o CEP:", erro);
      alert("Não foi possível buscar o endereço. Tente novamente.");
    });
});
