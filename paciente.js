// Dados fictícios de pacientes
const pacientes = [
    { id: 1, nome: "João Silva", status: "Em atendimento", observacoes: "Paciente com febre." },
    { id: 2, nome: "Maria Oliveira", status: "Aguardando", observacoes: "Consulta de rotina." },
    { id: 3, nome: "Carlos Santos", status: "Finalizado", observacoes: "Alta dada ontem." }
];

document.addEventListener("DOMContentLoaded", () => {
    const pacienteId = parseInt(sessionStorage.getItem("pacienteSelecionado"));
    if (!pacienteId) {
        alert("Nenhum paciente selecionado!");
        window.location.href = "dashboard.html";
        return;
    }

    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) {
        alert("Paciente não encontrado!");
        window.location.href = "dashboard.html";
        return;
    }

    // Preenche dados na tela
    document.getElementById("nomePaciente").textContent = paciente.nome;
    document.getElementById("statusPaciente").textContent = paciente.status;
    document.getElementById("observacoes").value = paciente.observacoes;

    // Botão voltar
    document.getElementById("voltarBtn").addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

    // Botão salvar
    document.getElementById("salvarBtn").addEventListener("click", () => {
        paciente.observacoes = document.getElementById("observacoes").value;
        alert("Alterações salvas (ainda só no front-end).");
        // Aqui no futuro faremos um fetch para salvar no backend
    });
});
