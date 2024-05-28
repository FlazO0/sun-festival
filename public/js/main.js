// Data e hora de início do festival (formato: "ano-mês-dia horas:minutos:segundos")
const festivalStartTime = new Date('2024-06-01T12:00:00').getTime();

// Atualiza o timer a cada segundo
const timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    // Data e hora atual
    const now = new Date().getTime();

    // Calcula o tempo restante até o início do festival
    const timeRemaining = festivalStartTime - now;

    // Calcula dias, horas, minutos e segundos restantes
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Formata o tempo restante como uma string
    const timerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Atualiza o conteúdo da div com ID "timer"
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = timerText;
    }

    // Verifica se o tempo restante é zero para parar a atualização do timer
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerElement.textContent = 'O festival começou!';
    }
}
