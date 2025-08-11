document.addEventListener('DOMContentLoaded', () => {
  const paciente = JSON.parse(sessionStorage.getItem('vital_paciente'));

  if (!paciente) {
    alert('Nenhum paciente selecionado.');
    window.location.href = 'dashboard.html';
    return;
  }

  document.getElementById('paciente-nome').textContent = paciente.name;
  document.getElementById('paciente-idade').textContent = `${paciente.age} anos`;
  document.getElementById('paciente-motivo').textContent = paciente.reason;
  document.getElementById('paciente-tempo').textContent = paciente.waitingTime;

  const riscoElem = document.getElementById('paciente-risco');
  riscoElem.textContent = paciente.risk;

  // cor do risco
  const cores = {
    'Vermelho': '#ff4d4d',
    'Laranja': '#ff944d',
    'Amarelo': '#ffdb4d',
    'Verde': '#4dff88',
    'Azul': '#4db8ff'
  };
  riscoElem.style.backgroundColor = cores[paciente.risk] || '#ccc';
  riscoElem.style.padding = '5px 10px';
  riscoElem.style.borderRadius = '5px';
  riscoElem.style.color = '#000';
});

function voltar() {
  window.location.href = 'dashboard.html';
}
