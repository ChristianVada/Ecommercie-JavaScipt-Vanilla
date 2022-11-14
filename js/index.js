let vitrine = document.querySelector(".vitrine");

function addVitrine(lista){
    for(let i = 0; i < lista.length; i++){
        let ficha = lista[i];

        let card = document.createElement("li");
        card.classList.add("card");
        vitrine.appendChild(card);

        let imagem = document.createElement("img");
        imagem.src = ficha.img;
        let divInformacao = document.createElement("div");
        divInformacao.classList.add("informaçoes");
        card.append(imagem, divInformacao);

        let tag = document.createElement("span");
        tag.classList.add("tag");
        tag.innerText = ficha.tag;
        let titulo = document.createElement("h3");
        titulo.innerText = ficha.nameItem;
        let descricao = document.createElement("p");
        descricao.innerText = ficha.description;
        let preco = document.createElement("span");
        preco.classList.add("preco");
        preco.innerText = "R$ "+ ficha.value;
        let a = document.createElement("a");
        divInformacao.append(tag, titulo, descricao, preco, a);

        let addCarrinho = document.createElement("span");
        addCarrinho.innerText = ficha.addCart;
        addCarrinho.classList.add("addCarrinho");
        addCarrinho.id = ficha.id;
        a.appendChild(addCarrinho);

    }
}
addVitrine(data);

let carCount = 0;
let soma = 0;
let botoesProdutos = document.querySelectorAll(".addCarrinho");

function addCarrinho(lista){
    for(let i = 0; i < botoesProdutos.length; i++){
        let botao = botoesProdutos[i];

        botao.addEventListener("click", function(e){
            let id = parseInt(e.target.id);
            let produto = procuraProduto(id);
            
            if(verificarCarrinho(id) === false){
                carCount++;
                document.querySelector("#quantidade").innerHTML = `${carCount}`;
                mudarFundoCarrinho()

                soma += produto.value;
                document.querySelector("#total").innerHTML = `R$ ${soma}`;
                let elementoCarrinho = criarCarrinho(produto);

                let carrinhoAdd = document.querySelector(".carrinhoAdd");

                carrinhoAdd.appendChild(elementoCarrinho);
            }
        })
    }
}
addCarrinho(botoesProdutos);

function verificarCarrinho(id){
    let elem = document.querySelector("#li_"+id);
    if(elem === null){
        return false;
    }else{
        return true;
    }
}

function procuraProduto(id){
    for(let i = 0; i < data.length; i++){
        let produto = data[i];
        if(produto.id === id){
            return produto;
        }
    }
    return "Produto não encontrado";
}

function criarCarrinho(produto){
    let li = document.createElement("li");
    li.id = "li_" + produto.id;
    let img = document.createElement("img");
    img.src = produto.img;
    let div = document.createElement("div");
    div.classList.add("favInfo");
    li.append(img, div);

    let h3 = document.createElement("h3");
    h3.innerText = produto.nameItem;
    let span = document.createElement("span");
    span.innerText = "R$ " + produto.value;
    let a = document.createElement("a");
    a.innerText = "Remover produto";
    a.id = "cart_"+ produto.id;

    a.addEventListener("click", function(e){
        let li = document.querySelector("#li_" + produto.id);
        li.remove();
        carCount--;
        mudarFundoCarrinho();
        document.querySelector("#quantidade").innerHTML = `${carCount}`;
        soma -= produto.value;
        document.querySelector("#total").innerHTML = `R$ ${soma}`;
    })
    div.append(h3, span, a);
    return li;
}

function mudarFundoCarrinho(){
    let car =  document.querySelector(".carrinhoAdd");
    let total = document.querySelector(".infoTotal");
    let vazio = document.querySelector(".carrinhoVazio")
    if(carCount !== 0){
        car.style.display = "block";
        total.style.display = "flex";
        vazio.style.display = "none";
    }else{
        car.style.display = "none";
        total.style.display = "none";
        vazio.style.display = "flex";
    }
}
