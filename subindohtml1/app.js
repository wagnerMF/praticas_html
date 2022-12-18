const { json } = require('express');
const express = require('express'); //importamos o modulo express
const app = express(); //criamos uma instancia do express
const usuarios = require('./usuarios.json')

app.use(express.json());//configuramos o express para receber requisição no formato json
     //get, 
     //post -> .body, ou seja, o corpo da requisicao, 
     //put, patch, delete
     // requisicao q é responsavel pelos dados q estou recebendo nas rotas
     // resposta q é responsavel por enviar uma resposta para o front-end
   

    //get - crie uma rota GET para /usuario
    app.get('/usuario',(requisicao,resposta) =>{
        resposta.status(404).json(usuarios); //enviar uma resposta para o front-end
    })

    //post - adicionar uma rota POST para add um usuario
    app.post('/usuario',(requisicao,resposta) =>{

        console.log(requisicao.body)
        const usuario = requisicao.body;

        if (!usuario){
            return resposta.status(400).json({mensagem: "usuario nao informado"});
        }

        //2 adiciona o usuaario ativo por padrao
        const usuarioParaAsicionar = { ...usuario, ativo: usuario.idade > 18};
        
        //3 adiciona o usuario no banco de dados
        usuarios.push(usuarioParaAsicionar);
        
        //4 retorna o usuario adicionado
        return resposta.status(201).json(usuarioParaAsicionar);
    })

    // PUT - crie uma rota PUT para /usuario/:id
    app.put('/usuario/:id',(requisicao,resposta) => {
      const id = requisicao.params.id; 
      
      const usuarioIndex = usuarios.findIndex((usuario) => usuario.id ==id)

      //se nao encontrar o usuario, retorna mensagem de erro
      if(usuarioIndex < 0){
        console.log("usuario nao encontrado");
        return resposta.status(404).json({mensagem: "usuario nao encontrado"});
      }

      //remova o usuario do banco de dados
      usuarios.splice(usuarioIndex, 1);   

    })

       // delete - crie uma rota DELETE para /usuario/:id
       app.delete('/usuario/:id',(requisicao,resposta) => {
        const id = requisicao.params.id; 
         
        const usuarioIndex = usuarios.findIndex((usuario) => usuario.id ==Number(id))
  
        //se nao encontrar o usuario, retorna mensagem de erro
        if(usuarioIndex < 0){
          return resposta.status(404).json({mensagem: "usuario nao encontrado"});
        }
  
        //remova o usuario do banco de dados
        usuarios.splice(usuarioIndex, 1);   

        //retorna o usuario removido
        return resposta.status(204).send();
  
      })


app.listen(3003, () => console.log('servidor rodando na porta 3005'));//iniciamos o servidor na porta 3003

//após isso no terminal:
// rodar esse comando: npx nodemon apps.js