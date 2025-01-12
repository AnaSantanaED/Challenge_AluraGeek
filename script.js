const apiURL = "http://localhost:3000/produtos";
const container = document.getElementById("products-container");
const addProductForm = document.getElementById("add-product-form");

// Renderizar produtos
async function fetchProdutos() {
    try {
        const response = await fetch(apiURL);
        const produtos = await response.json();
        renderizarProdutos(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

function renderizarProdutos(produtos) {
    container.innerHTML = "";

    if (produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto foi adicionado.</p>";
        return;
    }

    produtos.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="card-container--info">
                <p>${produto.nome}</p>
                <p><strong>${produto.preco}</strong></p>
                <button onclick="removerProduto(${produto.id})">Excluir</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Criar novo produto
async function criarProduto(produto) {
    try {
        await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });
        fetchProdutos();
    } catch (error) {
        console.error("Erro ao criar produto:", error);
    }
}

// Capturar evento do formulário
addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("product-name").value;
    const preco = document.getElementById("product-price").value;
    const imagem = document.getElementById("product-image").value;

    const novoProduto = { nome, preco, imagem };
    criarProduto(novoProduto);
    addProductForm.reset();
});

// Remover produto
async function removerProduto(id) {
    try {
        await fetch(`${apiURL}/${id}`, {
            method: "DELETE",
        });
        fetchProdutos();
    } catch (error) {
        console.error("Erro ao remover produto:", error);
    }
}

// Inicializar
fetchProdutos();
