const votos = {
  "Futebol": 0,
  "Futsal": 0,
  "Basquete": 0,
  "Handebol": 0,
  "Vôlei": 0,
  "Peteca": 0
};

const cores = [
  '#1e88e5', // Futebol
  '#43a047', // Futsal
  '#ff7043', // Basquete
  '#ab47bc', // Handebol
  '#fdd835', // Vôlei
  '#00bcd4'  // Peteca
];

const ctx = document.getElementById('graficoPizza').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: Object.keys(votos),
    datasets: [{
      data: Object.values(votos),
      backgroundColor: cores
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#000',
        }
      },
      title: {
        display: true,
        text: 'Porcentagem de Votos por Esporte',
        color: '#000'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.parsed;
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${value} voto(s) (${percent}%)`;
          }
        }
      }
    }
  }
});

function votar(esporte) {
  const jaVotou = localStorage.getItem('votou');
  const mensagem = document.getElementById('mensagem');

  if (jaVotou) {
    mensagem.textContent = "⚠️ Você já votou! Só é permitido um voto por pessoa.";
    return;
  }

  votos[esporte]++;
  localStorage.setItem('votou', 'sim');
  atualizarGrafico();

  mensagem.textContent = "✅ Obrigado pelo seu voto!";
}

function atualizarGrafico() {
  grafico.data.datasets[0].data = Object.values(votos);
  grafico.update();
}
