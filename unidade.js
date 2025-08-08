// unidade.js

const unidadesPorTipo = {
  'UPA': [
    { id: 'upa1', name: 'UPA Central Dr. João Almeida', address: 'Rua das Flores, 120', phone: '(11) 3456-7890', shift: 'Plantão 24h', waiting: 12 },
    { id: 'upa2', name: 'UPA Jardim das Águas', address: 'Av. Rio Azul, 45', phone: '(11) 9876-5432', shift: 'Plantão 24h', waiting: 7 },
    { id: 'upa3', name: 'UPA Nova Esperança', address: 'Estrada Nova, 210', phone: '(11) 2222-3333', shift: 'Plantão 24h', waiting: 5 }
  ],
  'UBS': [
    { id: 'ubs1', name: 'UBS Centro', address: 'R. do Mercado, 10', phone: '(11) 3000-1111', shift: '08:00-17:00', waiting: 3 },
    { id: 'ubs2', name: 'UBS Vila Verde', address: 'R. das Palmeiras, 50', phone: '(11) 3000-2222', shift: '08:00-16:00', waiting: 2 }
  ],
  'Hospital': [
    { id: 'h1', name: 'Hospital Vida Nova', address: 'Av. Saúde, 250', phone: '(11) 4000-3333', shift: '24h', waiting: 20 }
  ]
};

const pacientesPorUnidade = {
  'UPA Central Dr. João Almeida': [
    { name: 'Maria Oliveira', age: 58, reason: 'Dor no peito', waitingTime: '00:30' },
    { name: 'João Silva', age: 34, reason: 'Fratura no braço', waitingTime: '00:50' },
    { name: 'Ana Souza', age: 27, reason: 'Febre alta', waitingTime: '01:10' }
  ],
  'UPA Jardim das Águas': [
    { name: 'Carlos Pereira', age: 45, reason: 'Crise de asma', waitingTime: '00:20' },
    { name: 'Fernanda Lima', age: 19, reason: 'Mal-estar', waitingTime: '00:45' }
  ],
  'UPA Nova Esperança': [
    { name: 'Paulo Mendes', age: 60, reason: 'Hipertensão', waitingTime: '00:10' }
  ],
  'UBS Centro': [
    { name: 'Clara Rocha', age: 33, reason: 'Consulta agendada', waitingTime: '00:05' }
  ],
  'UBS Vila Verde': [
    { name: 'Adriano Costa', age: 50, reason: 'Acompanhamento', waitingTime: '00:25' }
  ],
  'Hospital Vida Nova': [
    { name: 'Graça Almeida', age: 70, reason: 'Urgência clínica', waitingTime: '00:15' },
    { name: 'Lucas Pereira', age: 29, reason: 'Acidente', waitingTime: '00:40' }
  ]
};

let unidadeSelecionada = null;

// ativa os botões
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.tipo;
      mostrarTipos(tipo);
      // efeito visual de botão ativo
      document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('abrir-lista-btn').addEventListener('click', abrirLista);
});

function mostrarTipos(tipo) {
  const lista = document.getElementById('lista-unidades');
  const detalhes = document.getElementById('unit-details');
  const pacientesPanel = document.getElementById('pacientes-panel');

  detalhes.classList.add('hidden');
  pacientesPanel.classList.add('hidden');
  lista.innerHTML = '';

  const arr = unidadesPorTipo[tipo] || [];
  if (arr.length === 0) {
    lista.innerHTML = '<div class="center-note">Nenhuma unidade encontrada.</div>';
    return;
  }

  arr.forEach(u => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${u.name}</h4>
      <div class="upa-info">${u.address} • ${u.phone} • ${u.shift}</div>
      <div class="meta">
        <button class="open-btn">Abrir lista</button>
      </div>
    `;
    card.querySelector('.open-btn').addEventListener('click', () => selecionarUnidade(u));
    lista.appendChild(card);
  });

  lista.scrollIntoView({ behavior: 'smooth' });
}

function selecionarUnidade(unidadeObj) {
  unidadeSelecionada = unidadeObj.name;

  document.getElementById('unit-name').textContent = unidadeObj.name;
  document.getElementById('unit-info').textContent = `${unidadeObj.address} • ${unidadeObj.phone} • ${unidadeObj.shift}`;
  document.getElementById('unit-wait').textContent = unidadeObj.waiting || 0;

  document.getElementById('unit-details').classList.remove('hidden');
  document.getElementById('unit-details').scrollIntoView({ behavior: 'smooth' });
}

function abrirLista() {
  if (!unidadeSelecionada) {
    alert('Selecione uma unidade primeiro (clique em Abrir lista no card da unidade).');
    return;
  }

  const pacientes = pacientesPorUnidade[unidadeSelecionada] || [];
  const ul = document.getElementById('pacientes');
  ul.innerHTML = '';

  if (pacientes.length === 0) {
    ul.innerHTML = '<li class="center-note">Nenhum paciente aguardando.</li>';
  } else {
    pacientes.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="left">
          <div class="name">${p.name} <span style="font-weight:400;color:#6b7280">• ${p.age} anos</span></div>
          <div class="info">${p.reason}</div>
        </div>
        <div class="badge-time">${p.waitingTime}</div>
      `;
      ul.appendChild(li);
    });
  }

  document.getElementById('pacientes-title').textContent = `Pacientes aguardando em ${unidadeSelecionada}`;
  document.getElementById('pacientes-panel').classList.remove('hidden');
  document.getElementById('pacientes-panel').scrollIntoView({ behavior: 'smooth' });
}

function voltarUnidades() {
  document.getElementById('pacientes-panel').classList.add('hidden');
  // mantemos detalhes da unidade visível
}
