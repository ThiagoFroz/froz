async function carregarSugestoes() {
    const response = await fetch('/.netlify/functions/get-suggestions');
    const sugestoes = await response.json();
    
    const listaSugestoes = document.getElementById('sugestoes');
    listaSugestoes.innerHTML = '';
  
    sugestoes.forEach(sugestao => {
      const li = document.createElement('li');
      li.textContent = `${sugestao.nome}: ${sugestao.sugestao}`;
      listaSugestoes.appendChild(li);
    });
  }
  
  // Carregar sugestões quando a página é carregada
  window.onload = carregarSugestoes;
  