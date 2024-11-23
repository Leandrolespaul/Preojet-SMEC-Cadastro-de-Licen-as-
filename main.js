
function verificarCpf(cpf) {
  const botaoCadastrar = document.getElementById("btnCadastrar")
  const mensagemErro = document.getElementById("mensagem-erro");
  axios.get("http://localhost:3002/funcionarios").then((response) => {
  cpf = document.getElementById("cpf").value
  console.log(response.data)
  const existe = response.data.find(funcionario => funcionario.cpf === cpf)
    if(existe) {
      
      mensagemErro.textContent = "CPF já existe."
     return  botaoCadastrar.disabled = true
      
    } else {
      mensagemErro.textContent = "";
    }
    
      
    
  })

}


const filtrarFuncionarios = () => {
  const pesquisa = document.getElementById("pesquisar").value.toLowerCase()
  const tabela = document.querySelector("#dados tbody")
  const linhas = tabela.getElementsByTagName("tr")

  for (let i = 0; i < linhas.length; i++) {
    const colunas = linhas[i].getElementsByTagName("td")
    let corresponde = false;

    for (let j = 0; j < colunas.length; j++) {
      if (colunas[j]) {
        const conteudo = colunas[j].textContent || colunas[j].innerText;
        if (conteudo.toLowerCase().indexOf(pesquisa) > -1) {
          corresponde = true
          break
        }
      }
    }
    linhas[i].style.display = corresponde ? "" : "none" // Exibe ou oculta a linha
  }
}



const mascaraCpf = () => {
  const cpf = document.getElementById("cpf")
  // Remove caracteres que não sejam números
  cpf.value = cpf.value.replace(/\D/g, "")

  // Aplica a máscara no formato XXX.XXX.XXX-XX
  cpf.value = cpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}
const primeiraLetraMaiuscula = (nome) => {
  return nome.toLowerCase().replace(/\b\w/g, function (palavra) {
    return palavra.toUpperCase();
  });
};

const formatDate = (date) => {
  return date.split('-').reverse().join('/');
}

const mascaraMatricula = () => {
  const matricula = document.getElementById("matricula")
  matricula.value = matricula.value.replace(/\D/g, "")
  matricula.value = matricula.value.replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{2})(\d)/, "$1.$2")

  const matriculaCalcular = document.getElementById("matricula-data")
  matriculaCalcular.value = matriculaCalcular.value.replace(/\D/g, "")
  matriculaCalcular.value = matriculaCalcular.value.replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{2})(\d)/, "$1.$2")
}

const validaCPF = (cpf) => {
  const botaoCadastrar = document.getElementById("btnCadastrar")
  const mensagemErro = document.getElementById("mensagem-erro");
  cpf = document.getElementById("cpf").value
  cpf = cpf.replace(/\D+/g, '');

  if (cpf.length !== 11) return botaoCadastrar.disabled = true
  let soma = 0;
  let resto;
  if (/^(\d)\1{10}$/.test(cpf)) return botaoCadastrar.disabled = true
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return botaoCadastrar.disabled = true
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return botaoCadastrar.disabled = true

  return botaoCadastrar.disabled = false
}




const celular = document.getElementById("telefone");

celular.addEventListener("input", () => {
  let limparValor = celular.value.replace(/\D/g, "").substring(0, 11);
  let numeroArray = limparValor.split("");
  let numeroFormatado = "";

  if (numeroArray.length > 0) {
    numeroFormatado += `${numeroArray.slice(0, 2).join("")}`
  }
  if (numeroArray.length > 2) {
    numeroFormatado += ` ${numeroArray.slice(2, 7).join("")}`
  }
  if (numeroArray.length > 7) {
    numeroFormatado += `-${numeroArray.slice(7, 11).join("")}`
  }
  celular.value = numeroFormatado;
})




const btnEnviarCadastro = () => {

  const mensagemErro = document.getElementById("mensagem-erro");

  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("data").value;
  const telefone = document.getElementById("telefone").value;
  const cpf = document.getElementById("cpf").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const logradouro = document.getElementById("logradouro").value;
  const bairro = document.getElementById("bairro").value;
  const numero = document.getElementById("numero").value;
  const matricula = document.getElementById("matricula").value;
  const regimeSuplementar = document.getElementById("res").value;
  const localRes = document.getElementById("local-res").value;
  const lotacao = document.getElementById("lotacao").value
  const cargo = document.getElementById("cargo").value
  const admissaoMatricula = document.getElementById("admissaoMatricula").value;
  const email = document.getElementById("email").value;

  if (!nome || !dataNascimento || !telefone || !cpf || !cidade || !estado || !logradouro || !bairro || !numero || !matricula || !lotacao || !cargo || !admissaoMatricula) {
    mensagemErro.textContent = "Preencha todos os campos, por favor.";
    return false;
  }

  axios
    .post("http://localhost:3002/funcionarios", {
      nome: nome,
      dataNascimento: dataNascimento,
      telefone: telefone,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
      logradouro: logradouro,
      bairro: bairro,
      numero: numero,
      matricula: matricula,
      regimeSuplementar: regimeSuplementar,
      localRes: localRes,
      lotacao: lotacao,
      cargo: cargo,
      admissaoMatricula: admissaoMatricula,
      email: email
    })
    .then(() => {
      document.getElementById("nome").value = "";
      document.getElementById("data").value = "";
      document.getElementById("telefone").value = "";
      document.getElementById("cpf").value = "";
      document.getElementById("cidade").value = "";
      document.getElementById("estado").value = "";
      document.getElementById("logradouro").value = "";
      document.getElementById("bairro").value = "";
      document.getElementById("numero").value = "";
      document.getElementById("matricula").value = "";
      document.getElementById("res").value = ""
      document.getElementById("local-res").value = ""
      document.getElementById("lotacao").value = "";
      document.getElementById("cargo").value = "";
      document.getElementById("admissaoMatricula").value = "";
      document.getElementById("email").value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
  location.reload()
};


let funcionarios = []



const carregarFuncionarios = () => {
  axios.get("http://localhost:3002/funcionarios").then((response) => {
    funcionarios = response.data
    
    let adicionar = "";
    response.data.forEach((dado) => {
      adicionar += `
        <tr>
          <td>${dado.id}</td>
          <td>${primeiraLetraMaiuscula(dado.nome)}</td>
          <td>${formatDate(dado.dataNascimento)}</td>
          <td>${dado.telefone}</td>
          <td>${dado.cpf}</td>
          <td>${primeiraLetraMaiuscula(dado.cidade)}</td>
          <td>${dado.estado}</td>
          <td>${primeiraLetraMaiuscula(dado.logradouro)}</td>
          <td>${primeiraLetraMaiuscula(dado.bairro)}</td>
          <td>${dado.numero}</td>
          <td>${dado.matricula}</td>
          <td>${dado.regimeSuplementar}</td>
          <td>${dado.localRes}</td>
          <td>${dado.lotacao}</td>
          <td>${dado.cargo}</td>
          <td>${formatDate(dado.admissaoMatricula)}</td>
          <td>${dado.email}</td>
          <td><button title="Para editar preencha os campos acima" id="btnAtualizar" class="btn btn-secondary btn-sm" onclick="btnAtualizar(${dado.id})"><img class=img-deletar src="/src/imagens/user_ok.png"></button></td>
          <td><button title="Atualizar Funcionário" type="button" class="btn btn-secondary btn-sm" onclick="btnEnviarAtualizacao()"><img class=img-deletar src="/src/imagens/user.png"></button></td>
          <td><button title="Para deletar clique aqui!" id="btnDeletar" class="btn btn-secondary btn-sm" onclick=btnDeletar(${dado.id})><img class=img-deletar src="/src/imagens/user_delete.png"></button></td>
          </tr>
      `
    });
    document.querySelector("#dados tbody").innerHTML = adicionar;
  });

};


const btnAtualizar = (id) => {
  document.getElementById("formulario").style.display = "block";
  const encontrarFuncionario = funcionarios.find(funcionario => funcionario.id === id)
  if (!encontrarFuncionario) return
  document.getElementById("id").value = encontrarFuncionario.id
  document.getElementById("nome").value = encontrarFuncionario.nome
  document.getElementById("data").value = encontrarFuncionario.dataNascimento
  document.getElementById("telefone").value = encontrarFuncionario.telefone
  document.getElementById("cpf").value = encontrarFuncionario.cpf
  document.getElementById("cidade").value = encontrarFuncionario.cidade
  document.getElementById("estado").value = encontrarFuncionario.estado
  document.getElementById("logradouro").value = encontrarFuncionario.logradouro
  document.getElementById("bairro").value = encontrarFuncionario.bairro
  document.getElementById("numero").value = encontrarFuncionario.numero
  document.getElementById("matricula").value = encontrarFuncionario.matricula
  document.getElementById("res").value = encontrarFuncionario.regimeSuplementar
  document.getElementById("local-res").value = encontrarFuncionario.localRes
  document.getElementById("lotacao").value = encontrarFuncionario.lotacao
  document.getElementById("cargo").value = encontrarFuncionario.cargo
  document.getElementById("admissaoMatricula").value = encontrarFuncionario.admissaoMatricula
  document.getElementById("email").value = encontrarFuncionario.email
};

const btnEnviarAtualizacao = () => {
  const id = document.getElementById("id").value
  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("data").value;
  const telefone = document.getElementById("telefone").value;
  const cpf = document.getElementById("cpf").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const logradouro = document.getElementById("logradouro").value;
  const bairro = document.getElementById("bairro").value;
  const numero = document.getElementById("numero").value;
  const matricula = document.getElementById("matricula").value;
  const regimeSuplementar = document.getElementById("res").value
  const localRes = document.getElementById("local-res").value
  const lotacao = document.getElementById("lotacao").value
  const cargo = document.getElementById("cargo").value
  const admissaoMatricula = document.getElementById("admissaoMatricula").value;
  const email = document.getElementById("email").value;

  axios
    .put(`http://localhost:3002/funcionarios/${id}`, {
      nome,
      dataNascimento,
      telefone,
      cpf,
      cidade,
      estado,
      logradouro,
      bairro,
      numero,
      matricula,
      regimeSuplementar,
      localRes,
      lotacao,
      cargo,
      admissaoMatricula,
      email
    })
    .then(() => {
      document.getElementById("id").value = ""
      document.getElementById("nome").value = ""
      document.getElementById("data").value = ""
      document.getElementById("telefone").value = ""
      document.getElementById("cpf").value = ""
      document.getElementById("cidade").value = ""
      document.getElementById("estado").value = ""
      document.getElementById("logradouro").value = ""
      document.getElementById("bairro").value = ""
      document.getElementById("numero").value = ""
      document.getElementById("matricula").value = ""
      document.getElementById("res").value = ""
      document.getElementById("local-res").value = ""
      document.getElementById("lotacao").value = ""
      document.getElementById("cargo").value = "";
      document.getElementById("admissaoMatricula").value = ""
      document.getElementById("email").value = ""
      carregarFuncionarios()
    })
    .catch((error) => {
      console.log(error);
    });

}

const btnDeletar = (id) => {
  axios
    .delete(`http://localhost:3002/funcionarios/${id}`)
    .then(() => {
      carregarFuncionarios()
    })
    .catch((error) => {
      console.log(error);
    });
  document.getElementById("formulario").style.display = "none"
};

const dataFinalNaoAparecer = () => {
  const dias = document.getElementById("dias").value
  if (dias === "") {
    return document.getElementById("data-final").style.display = "block",
      document.getElementById("data-final-span").style.display = "block"
  }
  document.getElementById("data-final-span").style.display = "none"
  document.getElementById("data-final").style.display = "none";
}

const diasNãoAparecer = () => {
  const dataFinal = document.getElementById("data-final").value
  if (dataFinal === "") {
    return document.getElementById("dias").style.display = "block"

  }
  document.getElementById("dias-span").style.display = "none"
  document.getElementById("dias").style.display = "none";
}
document.getElementById("local-trabalho-res").style.display = "none"
document.getElementById("local-res").style.display = "none";
const resDesaparecer = () => {
  const regimeSuplementar = document.getElementById("res").value
  if (regimeSuplementar === "Sim") {
    return document.getElementById("local-trabalho-res").style.display = "block",
      document.getElementById("local-res").style.display = "block";
  }

  return document.getElementById("local-trabalho-res").style.display = "none",
    document.getElementById("local-res").style.display = "none";


}



const calculoDataLicenca = () => {
  const dataInicial = document.getElementById("data-inicial").value
  const matricula = document.getElementById("matricula-data").value
  const dias = document.getElementById("dias").value
  const dataFinal = document.getElementById("data-final").value



  axios.get("http://localhost:3002/funcionarios").then((response) => {
    const encontrarFuncionarios = response.data.find(funcionario => funcionario.matricula === matricula)
    if (encontrarFuncionarios) {
      if (dataInicial && dias) {

        const calculoEntreDataInicialEDias = dateFns.addDays(new Date(dataInicial), parseInt(dias));
        const result = dateFns.format(new Date(calculoEntreDataInicialEDias), 'dd/MM/yyyy')
        return document.getElementById("div-mostrar-calculo").innerText = `O Funcionário ${primeiraLetraMaiuscula(encontrarFuncionarios.nome)}, na matrícula ${encontrarFuncionarios.matricula}, tem ${dias} dias, sua licença irá ate a data de ${result}.`
      }
      if (dataInicial && dataFinal) {
        const calculoEntreDatas = dateFns.differenceInDays(new Date(dataFinal), new Date(dataInicial))
        console.log(calculoEntreDatas + 1)
        return document.getElementById("div-mostrar-calculo").innerText = `O Funcionário ${primeiraLetraMaiuscula(encontrarFuncionarios.nome)}, na matrícula ${encontrarFuncionarios.matricula}, tem ${calculoEntreDatas + 1} dias, entre as datas de ${formatDate(dataInicial)} e ${formatDate(dataFinal)}.`

      }
    }
    if (dataInicial && dias) {
      const calculoEntreDataInicialEDias = dateFns.addDays(new Date(dataInicial), parseInt(dias));
      const result = dateFns.format(new Date(calculoEntreDataInicialEDias), 'dd/MM/yyyy')
      document.getElementById("div-mostrar-calculo").innerText = `O Funcionário, tem ${dias} dias, sua licença irá ate a data de ${result}.`
      console.log(formatDate(dataInicial))
    }
    if (dataInicial && dataFinal) {

      const calculoEntreDatas = dateFns.differenceInDays(new Date(dataFinal), new Date(dataInicial))
      console.log(calculoEntreDatas + 1)
      document.getElementById("div-mostrar-calculo").innerText = `O Funcionário, tem ${calculoEntreDatas + 1} dias, entre as datas de ${formatDate(dataInicial)} e ${formatDate(dataFinal)}.`

    }
  })

  document.getElementById("data-inicial").value = ""
  document.getElementById("matricula-data").value = ""
  document.getElementById("dias").value = ""
  document.getElementById("data-final").value = ""
  document.getElementById("data-final-span").style.display = "none"
  document.getElementById("data-final").style.display = "block";
  document.getElementById("dias").style.display = "block";
  document.getElementById("dias-span").style.display = "block";
}

