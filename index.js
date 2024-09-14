
const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value:"Tomar 3L de água por dia",
    checked: false,
}

let metas = [ meta ]
    


const cadastraMetas = async () => {
    const meta = await input ({ message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marca e desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }


    respostas.forEach((resposta)=> {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluídas(s)")
}


const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não exite metas realizadas! :(")
        return
    }
    await select ({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta)=> {
        return meta.checked != true
        
    })

    if(abertas.length == 0 ) {
        console.log("Não existe metas abertas!  :)")
        return
    }

    await select({
        message:" Metas Abertas: " +  abertas.length,
        choices: [ ...abertas]
    })
}


const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked:false }
    })
    
    const itemsADeletar  = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemsADeletar.length == 0) {
        console.log("Nenhum item para deletar")
        return
    }

    itemsADeletar.forEach((item) => {
       metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")
        
}

const start = async () => {
    
    while(true) {

        // espere que o usuário vai selecionar alguma coisa...

        const opcao = await select({      
            message: "Menu  >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })


        switch(opcao) {
            case "cadastrar":
               await cadastraMetas()
               console.log(metas)
                break;

            case "listar":
                await listarMetas()
                break;

            case "realizadas":
                await metasRealizadas()
                break;

            case "abertas":
                await metasAbertas()
                break;

            case "deletar":
                await deletarMetas()
                break;

            case "sair":
                console.log("Até a próxima!")
                return
            
        }
    }
}


start()



