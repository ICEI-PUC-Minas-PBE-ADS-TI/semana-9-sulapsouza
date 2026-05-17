const data = {
  produtos: [
    {
      id: 1,
      nome: "Vestido Tomara que Caia",
      preco: 189.90,
      categoria: "Roupas",
      imagem: "images/vestido.svg",
      descricao: "Vestido curto tomara que caia com botões, acompanha cinto. Perfeito para arrasar em qualquer ocasião especial.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Óculos Rosa",
      preco: 129.00,
      categoria: "Acessórios",
      imagem: "images/oculos.svg",
      descricao: "Óculos maximalista rosa, usado no São Paulo Fashion Week (SFFW) - 2026.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Calça Jeans Cargo",
      preco: 319.90,
      categoria: "Roupas",
      imagem: "images/calca.svg",
      descricao: "Calça Jeans Cargo, modelo wide Leg. Super estilosa e despojada, para ocasiões básicas com muito estilo.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Camisa Brasil",
      preco: 249.00,
      categoria: "Roupas",
      imagem: "images/brasil.svg",
      descricao: "Camisa do Brasil, para arrasar na Copa do Mundo de 2026.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Bolsa Rosa Chanel",
      preco: 998.90,
      categoria: "Acessórios",
      imagem: "images/bolsa.svg",
      descricao: "Bolsa elegante rosa, Chanel. Usada pela Barbie em eventos de gala e tapetes vermelhos.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Sandália Gladiadora",
      preco: 99.90,
      categoria: "Sapatos",
      imagem: "images/sapato.svg",
      descricao: "Sandália gladiora branca, com tiras. Perfeita para compor looks confortáveis do dia a dia",
      emEstoque: true
    },
    {
      id: 9,
      nome: "Saia jeans curta",
      preco: 179.00,
      categoria: "Roupas",
      imagem: "images/saia.svg",
      descricao: "Saia jeans curta, levemente desfiada.",
      emEstoque: false
    },
    {
      id: 10,
      nome: "Capinha de celular rosa",
      preco: 69.90,
      categoria: "Acessórios",
      imagem: "images/capa.svg",
      descricao: "Capinha de celular rosa, acessório fofo e indispensável para proteger seu aparelho com estilo.",
      emEstoque: true
    }
  ]
};

const productList    = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput    = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender      = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-id", produto.id);

  card.style.transition = "box-shadow 0.25s, transform 0.25s, border-color 0.25s";

  const badge = document.createElement("span");
  badge.classList.add("card-badge");
  if (!produto.emEstoque) {
    badge.classList.add("out");
    badge.textContent = "Esgotado";
  } else {
    badge.textContent = "Em estoque";
  }

  const imgWrap = document.createElement("div");
  imgWrap.classList.add("card-img-wrap");

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  imgWrap.appendChild(img);

  const body = document.createElement("div");
  body.classList.add("card-body");

  const catEl = document.createElement("p");
  catEl.classList.add("card-category");
  catEl.textContent = produto.categoria;

  const nameEl = document.createElement("h3");
  nameEl.classList.add("card-title");
  nameEl.textContent = produto.nome;

  const priceEl = document.createElement("p");
  priceEl.classList.add("card-price");
  priceEl.innerHTML = "<span>a partir de</span>" + formatPrice(produto.preco);

  body.appendChild(catEl);
  body.appendChild(nameEl);
  body.appendChild(priceEl);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn-details");
  btnDetails.textContent = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.classList.add("btn-highlight");
  btnHighlight.textContent = "✦";
  btnHighlight.setAttribute("title", "Destacar produto");

  btnDetails.addEventListener("click", function () {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", function () {
    card.classList.toggle("highlight");
  });

  actions.appendChild(btnDetails);
  actions.appendChild(btnHighlight);

  card.appendChild(badge);
  card.appendChild(imgWrap);
  card.appendChild(body);
  card.appendChild(actions);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  if (produtos.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("empty-state");
    const msg = document.createElement("p");
    msg.textContent = "nenhum produto encontrado :(";
    empty.appendChild(msg);
    productList.appendChild(empty);
    return;
  }

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const allCards = document.querySelectorAll(".card");
  allCards.forEach(function (c) {
    console.log("card renderizado — data-id:", c.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = ["Todas"];
  data.produtos.forEach(function (p) {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  categorySelect.innerHTML = "";

  categorias.forEach(function (cat) {
    const opt = document.createElement("option");
    opt.setAttribute("value", cat.toLowerCase() === "todas" ? "todas" : cat);
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = "";

  const box = document.createElement("div");
  box.classList.add("details-box");

  const titleBar = document.createElement("div");
  titleBar.classList.add("details-title-bar");
  const titleH2 = document.createElement("h2");
  titleH2.textContent = "detalhes do produto";
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("details-close");
  closeBtn.textContent = "✕ fechar";
  closeBtn.addEventListener("click", function () {
    productDetails.innerHTML = "";
  });
  titleBar.appendChild(titleH2);
  titleBar.appendChild(closeBtn);

  const imgWrap = document.createElement("div");
  imgWrap.classList.add("details-img-wrap");
  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  imgWrap.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("details-info");

  const catEl = document.createElement("p");
  catEl.classList.add("details-cat");
  catEl.textContent = produto.categoria;

  const nameEl = document.createElement("h2");
  nameEl.classList.add("details-name");
  nameEl.textContent = produto.nome;

  const priceEl = document.createElement("p");
  priceEl.classList.add("details-price");
  priceEl.innerHTML = "<small>R$</small> " + produto.preco.toFixed(2).replace(".", ",");

  const stockEl = document.createElement("span");
  stockEl.classList.add("details-stock");
  if (produto.emEstoque) {
    stockEl.classList.add("in");
    stockEl.textContent = "✓ Em estoque";
  } else {
    stockEl.classList.add("out");
    stockEl.textContent = "✗ Esgotado";
  }

  const descEl = document.createElement("p");
  descEl.classList.add("details-desc");
  descEl.textContent = produto.descricao;

  info.appendChild(catEl);
  info.appendChild(nameEl);
  info.appendChild(priceEl);
  info.appendChild(stockEl);
  info.appendChild(descEl);

  box.appendChild(titleBar);
  box.appendChild(imgWrap);
  box.appendChild(info);

  productDetails.appendChild(box);
  productDetails.scrollIntoView({ behavior: "smooth", block: "start" });
}

function filterProducts() {
  const termo    = searchInput.value.toLowerCase().trim();
  const catValue = categorySelect.value;

  return data.produtos.filter(function (p) {
    const nomeMatch = p.nome.toLowerCase().includes(termo);
    const catMatch  = catValue === "todas" || p.categoria === catValue;
    return nomeMatch && catMatch;
  });
}

renderCategories();
renderProducts(data.produtos);

searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});