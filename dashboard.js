// dashboard.js

// Definição das prioridades de risco
const riskPriority = {
  vermelho: 5,
  laranja: 4,
  amarelo: 3,
  verde: 2,
  azul: 1
};

const pacientesPorUnidade = {
  'UPA Central Dr. João Almeida': [
    { name: 'Maria Oliveira', age: 58, reason: 'Dor no peito', waitingTime: '00:30', risk: 'vermelho' },
    { name: 'João Silva', age: 34, reason: 'Fratura no braço', waitingTime: '00:50', risk: 'amarelo' },
    { name: 'Ana Souza', age: 27, reason: 'Febre alta', waitingTime: '01:10', risk: 'laranja' }
  ],
  'UPA Jardim das Águas': [
    { name: 'Carlos Pereira', age: 45, reason: 'Crise de asma', waitingTime: '00:20', risk: 'vermelho' },
    { name: 'Fernanda Lima', age: 19, reason: 'Mal-estar', waitingTime: '00:45', risk: 'verde' }
  ],
  'UPA Nova Esperança': [
    { name: 'Paulo Mendes', age: 60, reason: 'Hipertensão', waitingTime: '00:10', risk: 'amarelo' }
  ],
  'UBS Centro': [
    { name: 'Clara Rocha', age: 33, reason: 'Consulta agendada', waitingTime: '00:05', risk: 'azul' }
  ],
  'UBS Vila Verde': [
    { name: 'Adriano Costa', age: 50, reason: 'Acompanhamento', waitingTime: '00:25', risk: 'verde' }
  ],
  'Hospital Vida Nova': [
    { name: 'Graça Almeida', age: 70, reason: 'Urgência clínica', waitingTime: '00:15', risk: 'vermelho' },
    { name: 'Lucas Pereira', age: 29, reason: 'Acidente', waitingTime: '00:40', risk: 'laranja' }
  ]
};

// Função para converter tempo mm:ss em segundos
function tempoEmSegundos(tempo) {
  const [min, seg] = tempo.split(':').map(Number);
  return min * 60 + seg;
}

// Formata um paciente como <li>
function formatPacienteLi(paciente) {
 // dados curtos em data- attributes (evita JSON quebrando HTML)
  return `
    <li>
      <button class="paciente-btn" data-id="${paciente.id}"
              data-name="${paciente.name}"
              data-age="${paciente.age}"
              data-reason="${paciente.reason}"
              data-wait="${paciente.waitingTime}"
              data-risk="${paciente.risk}"
              aria-label="Paciente ${paciente.name}, risco ${paciente.risk}, ${paciente.age} anos">
        <span class="risk-dot ${paciente.risk}" aria-hidden="true"></span>
        <div class="left">
          <div class="name">${paciente.name}
            <span class="muted"> • ${paciente.age} anos</span>
          </div>
          <div class="info">${paciente.reason}</div>
        </div>
        <div class="badge-time">${paciente.waitingTime}</div>

        <!-- texto acessível que descreve a cor (visível apenas para leitores) -->
        <span class="sr-only">Risco: ${capitalize(paciente.risk)}</span>
      </button>
    </li>
  `;
}

function capitalize(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }

document.addEventListener('DOMContentLoaded', () => {
  const unidade = sessionStorage.getItem('vital_unidade');
  if (!unidade) {
    alert('Nenhuma unidade selecionada. Voltando para seleção.');
    window.location.href = 'unidade.html';
    return;
  }

  document.getElementById('selectedUnit').textContent = unidade;

  let pacientes = pacientesPorUnidade[unidade] || [];

  // Ordena: primeiro pela prioridade de risco, depois pelo tempo de espera
  pacientes.sort((a, b) => {
    if (riskPriority[b.risk] !== riskPriority[a.risk]) {
      return riskPriority[b.risk] - riskPriority[a.risk];
    }
    return tempoEmSegundos(b.waitingTime) - tempoEmSegundos(a.waitingTime);
  });

  const ul = document.getElementById('patientList');
  ul.innerHTML = pacientes.length === 0
    ? '<li class="center-note">Nenhum paciente aguardando.</li>'
    : pacientes.map(formatPacienteLi).join('');

  // Alertas: pacientes que esperam mais de 45 minutos
  const alertas = pacientes.filter(p => tempoEmSegundos(p.waitingTime) > 45);
  const alertsUl = document.getElementById('alertsList');
  alertsUl.innerHTML = alertas.length === 0
    ? '<li class="center-note">Sem alertas no momento.</li>'
    : alertas.map(p => `<li>⚠️ ${p.name} espera ${p.waitingTime} minutos</li>`).join('');

  // Botão logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('vital_unidade');
      window.location.href = 'unidade.html';
    });
  }
});
