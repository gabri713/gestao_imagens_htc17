import mysql from 'mysql2/promise';
import db from '../conexao.js';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createImagem(descricao,nome_imagem,imagem) {
    console.log('ImagemModel :: createImagem');
    const conexao = mysql.createPool(db);
    const sql = 'INSERT INTO imagens (caminho,descricao) VALUES(?,?);';
    const params = [nome_imagem,descricao];
    
    try{
        await imagem.mv(path.join(__dirname,'..','..','public','img',nome_imagem));
        const [retorno] = await conexao.query(sql,params);
        return [201, 'Imagem Cadastrada'];
    }catch(error){
        console.log(error);
        return [500,error];
    }
}

export async function readImagem() {
    console.log('ImagemModel :: readImagem');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM imagens';
    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500,error];
    }
}

export async function updateImagem(descricao,id_imagem) {
    console.log('ImagemModel :: updateImagem');
    const conexao = mysql.createPool(db);
    const sql = 'UPDATE imagens SET descricao = ? WHERE id_imagem = ?';
    const params = [descricao,id_imagem];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.affectedRows < 1){
            return [404, {message:'Imagem não encontrada'}] 
         }
         return [200, {message:'Imagem atualizada'}];
    } catch (error) {
        console.log(error);
        return [500,error];
    }
}

export async function deleteImagem(id_imagem) {
    console.log('ImagemModel :: deleteImagem');
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM imagens WHERE id_imagem = ?';
    const params = [id_imagem];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.affectedRows < 1){
           return [404, {message:'Imagem não encontrada'}] 
        }
        return [200, {message:'Imagem deletada'}];

    } catch (error) {
        console.log(error);
        return [500,error];
    }
}