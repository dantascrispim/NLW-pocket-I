
const { select, input } = require('@inquirer/prompts')

let meta = {
    value:"Tomar 3L de água por dia",
    checked:"false"
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
                console.log("Vamos listar");
                break;
            case "sair":
                console.log("Até a próxima!")
                return
            
        }
    }
}


start()



