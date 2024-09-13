

const { select } = require('@inquirer/prompts')

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
                console.log("Vamos Cadastrar");
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



