function atualizarPreview() {
  const nome = document.getElementById('nome').value || 'Seu Nome';
  const cargo = document.getElementById('cargo').value || 'Cargo Pretendido';
  const telefone = document.getElementById('telefone').value || 'Telefone';
  const email = document.getElementById('email').value || 'E-mail';
  const localizacao = document.getElementById('localizacao').value || 'Cidade, Província';
  const bi = document.getElementById('bi').value ? `BI: ${document.getElementById('bi').value}` : '';
  const dataBi = document.getElementById('dataBi').value ? `Emitido em: ${document.getElementById('dataBi').value}` : '';
  const resumo = document.getElementById('resumo').value || '';
  const objetivo = document.getElementById('objetivo').value || '';
  const habilidades = document.getElementById('habilidades').value || '';
  const idiomas = document.getElementById('idiomas').value || '';

  let expHTML = '';
  document.querySelectorAll('.exp-item').forEach(item => {
    const empresa = item.querySelector('.empresa').value;
    const cargoExp = item.querySelector('.cargoExp').value;
    const periodo = item.querySelector('.periodo').value;
    const desc = item.querySelector('.descExp').value;
    if (empresa) {
      expHTML += `<p><strong>${cargoExp}</strong> - ${empresa} (${periodo})</p><p>${desc}</p>`;
    }
  });

  let formHTML = '';
  document.querySelectorAll('.form-item').forEach(item => {
    const instituicao = item.querySelector('.instituicao').value;
    const curso = item.querySelector('.curso').value;
    const ano = item.querySelector('.ano').value;
    const desc = item.querySelector('.descForm').value;
    if (instituicao) {
      formHTML += `<p><strong>${curso}</strong> - ${instituicao} (${ano})</p>`;
      if (desc) formHTML += `<p>${desc}</p>`;
    }
  });

  const modelo = document.querySelector('input[name="modelo"]:checked').value;

  document.getElementById('preview').innerHTML = `
    <div class="cv-modelo ${modelo}">
      <h2>${nome}</h2>
      <p><strong>${cargo}</strong></p>
      <p>${telefone} | ${email} | ${localizacao}</p>
      <p>${bi} | ${dataBi}</p>
      ${resumo ? `<h3>Resumo Profissional</h3><p>${resumo}</p>` : ''}
      ${objetivo ? `<h3>Objetivo Profissional</h3><p>${objetivo}</p>` : ''}
      ${expHTML ? `<h3>Experiência Profissional</h3>${expHTML}` : ''}
      ${formHTML ? `<h3>Formação Académica</h3>${formHTML}` : ''}
      ${habilidades ? `<h3>Habilidades</h3><p>${habilidades}</p>` : ''}
      ${idiomas ? `<h3>Idiomas</h3><p>${idiomas}</p>` : ''}
    </div>
  `;
}

function mudarModelo(modelo) {
  const preview = document.getElementById('preview');
  preview.className = '';
  preview.classList.add('preview');
  if (modelo === 'moderno') {
    preview.style.backgroundColor = '#f8f9fa';
    preview.querySelector('h2').style.color = '#2c3e50';
  } else if (modelo === 'criativo') {
    preview.style.backgroundColor = '#e3f2fd';
    preview.querySelector('h2').style.color = '#1565c0';
  } else {
    preview.removeAttribute('style');
  }
  atualizarPreview();
}

function adicionarExperiencia() {
  const container = document.getElementById('experiencias');
  const div = document.createElement('div');
  div.className = 'exp-item';
  div.innerHTML = `
    <input type="text" placeholder="Empresa" class="empresa" oninput="atualizarPreview()"/>
    <input type="text" placeholder="Cargo" class="cargoExp" oninput="atualizarPreview()"/>
    <input type="text" placeholder="Período (ex: 2020-2023)" class="periodo" oninput="atualizarPreview()"/>
    <textarea placeholder="Descrição das atividades" class="descExp" oninput="atualizarPreview()"></textarea>
    <button type="button" onclick="ajudaIA(this.previousElementSibling)" class="ia-btn">💡 IA</button>
    <button type="button" onclick="remover(this)" class="ia-btn" style="background:#e74c3c;">🗑️</button>
  `;
  container.appendChild(div);
}

function adicionarFormacao() {
  const container = document.getElementById('formacoes');
  const div = document.createElement('div');
  div.className = 'form-item';
  div.innerHTML = `
    <input type="text" placeholder="Instituição" class="instituicao" oninput="atualizarPreview()"/>
    <input type="text" placeholder="Curso" class="curso" oninput="atualizarPreview()"/>
    <input type="text" placeholder="Ano de conclusão" class="ano" oninput="atualizarPreview()"/>
    <textarea placeholder="Descrição (opcional)" class="descForm" oninput="atualizarPreview()"></textarea>
    <button type="button" onclick="ajudaIA(this.previousElementSibling)" class="ia-btn">💡 IA</button>
    <button type="button" onclick="remover(this)" class="ia-btn" style="background:#e74c3c;">🗑️</button>
  `;
  container.appendChild(div);
}

function remover(btn) {
  btn.parentElement.remove();
  atualizarPreview();
}

function ajudaIA(elemento) {
  const input = typeof elemento === 'string' ? document.getElementById(elemento) : elemento;
  const texto = prompt("Descreva com suas palavras (ex: 'Trabalhei num mercado'):");

  if (!texto) return;

  const sugestoes = {
    mercado: "Profissional com experiência em atendimento ao cliente, organização de produtos e controle de estoque em ambiente de supermercado.",
    eletricista: "Técnico eletricista com experiência em instalação e manutenção de sistemas elétricos residenciais e comerciais.",
    ajudante: "Auxiliar geral com habilidades em organização, suporte operacional e execução de tarefas sob orientação.",
    escola: "Formado em ensino médio com foco em disciplinas técnicas e boas práticas de trabalho em equipe.",
    curso: "Profissional capacitado com formação em [área], prático e comprometido com qualidade e produtividade."
  };

  let resposta = "Profissional comprometido e com vontade de crescer na área.";
  for (const [key, value] of Object.entries(sugestoes)) {
    if (texto.toLowerCase().includes(key)) {
      resposta = value.replace(/\[área\]/g, texto.split('em')[1]?.trim() || 'sua área');
      break;
    }
  }

  input.value = resposta;
  atualizarPreview();
}

function abrirModalPagamento() {
  document.getElementById('modalPagamento').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modalPagamento').style.display = 'none';
}

function gerarPDF() {
  const element = document.getElementById('preview');
  const opt = {
    margin: 1,
    filename: 'curriculo.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
  fecharModal();
}

atualizarPreview();
