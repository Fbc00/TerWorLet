let contLinha = 1
let contQuadradinho = 1
let palavra =  ''
const escolhida = 'termo'
const TerWorLet = []

function setLetras(valor,tempo) {
    let time = 0
    valor.forEach((element, iterator) => {
        setTimeout(() => {
            if (!escolhida.includes(element.innerHTML)) {
                element.classList.add('cinzado')
           } else {
            if (element.innerHTML === escolhida[iterator] ) {
                element.classList.add('green')
            }   
            else {
                element.classList.add('yellow')
            }
        }
        }, time);
        time += tempo
    } )
}
function selectLinha(keylinha, keyq) {
    const liQ = document.querySelector(`.linha${keylinha} .quadradinho${keyq} `)
    return liQ
}
function apagaLetra() {
    const deletado = selectLinha(contLinha, ((contQuadradinho - 1) || 1)) 
    if(palavra.length) {
        deletado.innerHTML = '' 
        palavra = palavra.slice(0, -1) || ''
        contQuadradinho--
    } 
    return 
}
function setValueTecla(letra) {  
    const quadrado = selectLinha(contLinha, contQuadradinho)
        if (palavra.length < 5) {
            palavra += letra
            for (const l of palavra) { quadrado.innerHTML = l }
            contQuadradinho++
        return
    } 
}
function palavraLinha(confirm) {
    const filhos = document.querySelector(`.linha${contLinha}`).querySelectorAll('.quadradinho')
    if(confirm) {
        setLetras(filhos, 750)
        TerWorLet.push(palavra)
        localStorage.setItem('storagePalavras',  JSON.stringify(TerWorLet))
        contLinha++
        palavra = ''
        }
    return
}
function eventClick(e) {
    if (e.target.classList.contains('key') && e.target.innerHTML  != 'enter' && !e.target.classList.contains('delete'))  { 
        setValueTecla(e.target.innerHTML)
    } else if (e.target.classList.contains('key') && e.target.innerHTML === 'enter' && !e.target.classList.contains('delete')) {
        palavraLinha(true)
    }
}
function eventkeyDown(e) {
    if(65 <= e.keyCode && e.keyCode <= 90)  { 
        setValueTecla(e.key)
        return
    } else if (e.key === 'Backspace') {
        apagaLetra()
        return
    } else if (e.key === 'Enter'){
        palavraLinha(true)
    }
}
function algoNoStorage() {
    const storage = JSON.parse(localStorage.getItem('storagePalavras'))
    if(storage) {
        storage.forEach((element, indice) =>  {
            const quadradinhos = document.querySelector(`.linha${indice+1}`).querySelectorAll('.quadradinho')
            contLinha++
            for (let key in element) {
                quadradinhos[key].innerHTML = element[key]
                contQuadradinho++
            }
            setLetras(quadradinhos, 0)
        })
        TerWorLet.push(...storage)
    }
    return 
}