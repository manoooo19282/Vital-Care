// script.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const crm = document.getElementById('crm').value.trim();
  const password = document.getElementById('password').value;

  if (!crm || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // salvar CRM no sessionStorage para uso posterior (opcional)
  sessionStorage.setItem('vital_crm', crm);

  // redireciona para seleção de unidade
  window.location.href = 'unidade.html';
});
