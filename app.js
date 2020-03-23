const express    = require('express');
const handlebars = require('express-handlebars');
const mysql      = require('mysql');
//body parser serve para renderizar o conteúno na tela, o front
const bodyparser = require('body-parser');
const path       = require('path');
const app        = express();

//as rotas para o node poder reconhecer os arquivos externos
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

//conexao com o servidor
app.listen('3000',()=>{
console.log("servidor rodando");

});


//app.set('view engine', 'ejs');

//template html para seguir, tipo boas práticas de codigo
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.json());

//app.use(bodyparser.urlencoded({extended:false}));
const urlencodeParser = bodyparser.urlencoded({extended:false});

app.use(express.static(path.join(__dirname, 'public')));

/*
const sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306

});
sql.query('use node');
*/


//conexao com o banco
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node'
})
//caso um possível erro na conexão, ele exibirá o erro
db.connect(function(err){
    if(err){
        console.log(err);
    }
    
});

//INDEX

app.get('/',function(req,res){

    res.render('index');
});


//CADASTRO
app.get("/inserir",function(req,res){
    res.render('inserir',{});
  });
  
app.post("/controllerForm", urlencodeParser, function(req,res){
    let nome = req.body.nome;
    let data_nasc = req.body.data_nasc;
    let email = req.body.email;
    let senha = req.body.senha;
    db.query("INSERT INTO cliente (nome, data_nasc, email, senha) VALUES (?,?,?,?)", [nome, data_nasc, email, senha], function(err,results){});

   res.render('controllerForm');
});
//FIM CADASTRO



app.get('/listar/:id?', function(req, res){
    if(!req.params.id){
     db.query('SELECT * FROM cliente order by id asc',(err, results, fields)=>{
        res.render('listar',{data:results});
     
    });
}else{
    db.query('SELECT * FROM cliente WHERE id =? order by id asc',[req.params.id],function(err, results, fields){
        res.render('listar',{data:results});
    });
}

}); 


app.get('/deletar/:id', function(req, res){
    db.query('DELETE  FROM cliente WHERE id =?',[req.params.id]);
 res.render('deletar');   
});
    


/*
app.post('/inserir',function(req,res){
    console.log("cadastro realizado !");
    let nome = req.body.nome;
    let data_nasc = req.body.data_nasc;
    let email = req.body.email;
    let senha = req.body.senha;
                                         //isso serve para evitar SQLInjection
    db.query("INSERT INTO cliente (nome, data_nasc, email, senha) VALUES (?,?,?,?)", [nome, data_nasc, email, senha], function(err,results){});

    res.render('inserir',{});
});

*/










/*
//rotas, a barra é para a página inicial
app.get('/listar', function(req, res){
   
    db.query('SELECT * FROM cliente',(err, rows, fields)=>{
   // let query = db.query("SELECT * FROM cliente", function(err,results){
       // res.render('listar',{lista:results});
        res.send(rows)
    });
    });


    //buscar pelo id
   app.get('/ver/:id?', function(req, res){
   
       // db.query('SELECT * FROM cliente WHERE id = ?',[res.params.id],(err, rows, fields)=>{
       // res.send(rows)
console.log(req.params.id)
        });
       // });

        //delete
        app.delete('/listar/:id', (req, res)=>{
   
            db.query('DELETE FROM cliente WHERE id = ?',[res.params.id],(err, rows, fields)=>{
            
                if(!err){
                    res.send('Registro Excluído !');
                }
                else{
                    console.log(err);
                }

            });
            });
    



app.get('/registrar',function(req,res){
    res.render('cadastro',{});
});



app.post('/registrar',function(req,res){
    console.log("cadastro realizado !");
    let nome = req.body.nome;
    let data_nasc = req.body.data_nasc;
    let email = req.body.email;
    let senha = req.body.senha;
                                         //isso serve para evitar SQLInjection
    db.query("INSERT INTO cliente (nome, data_nasc, email, senha) VALUES (?,?,?,?)", [nome, data_nasc, email, senha], function(err,results){});

    res.render('cadastro',{});
});

*/