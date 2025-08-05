// Variável para armazenar o carrinho
let carrinho = [];

// Função para adicionar produto ao carrinho
function addToCart(botao) {
  const produtoDiv = botao.parentElement;
  const nome = produtoDiv.getAttribute("data-nome");
  const preco = Number(produtoDiv.getAttribute("data-preco"));

  // Verifica se o produto já está no carrinho
  let item = carrinho.find(p => p.nome === nome);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarContagemCarrinho();

  // Mostrar alerta com opções
  if (confirm(`${nome} adicionado ao carrinho.\n\nClique OK para ver o carrinho ou Cancelar para continuar comprando.`)) {
    goToCart();
  }
}

// Atualiza o contador visível no ícone do carrinho
function atualizarContagemCarrinho() {
  const count = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const spanCount = document.getElementById("cart-count");
  if (spanCount) {
    spanCount.textContent = count;
  }
}

// Navega para a página do carrinho (checkout)
function goToCart() {
  window.location.href = "checkout.html";
}

// Exibe os itens do carrinho na página checkout.html
function mostrarCarrinho() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalSpan = document.querySelector("#cart-total span");

  if (!cartItemsDiv || !totalSpan) return;

  cartItemsDiv.innerHTML = "";

  if (carrinho.length === 0) {
    cartItemsDiv.innerHTML = "<p>O carrinho está vazio.</p>";
    totalSpan.textContent = "0 MZN";
    return;
  }

  let total = 0;

  carrinho.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <span><strong>${item.nome}</strong> - ${item.preco.toLocaleString()} MZN</span>
      <span>Quantidade: ${item.quantidade}</span>
      <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += item.preco * item.quantidade;
  });

  totalSpan.textContent = total.toLocaleString() + " MZN";
}

// Remove um produto do carrinho pelo nome
function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarContagemCarrinho();
  mostrarCarrinho();
}

// Função para finalizar compra (simulação)
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  alert("Obrigado pela sua compra! (Simulação)");
  carrinho = [];
  atualizarContagemCarrinho();
  mostrarCarrinho();
}

// Ao carregar a página checkout, mostrar o carrinho
window.addEventListener("load", () => {
  if (document.getElementById("cart-items")) {
    mostrarCarrinho();
  }
});
