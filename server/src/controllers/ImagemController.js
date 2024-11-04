import path from 'path';
import url from 'url';
import { createImagem, deleteImagem, readImagem, updateImagem } from '../models/ImagemModel.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function inserindoImagem (req,res){
    console.log('ImagemController :: inserindoImagem');
    const {descricao} = req.body;
    const {imagem} = req.files;

    if(!descricao || !imagem){
        res.status(400).json({message:'Imagem e descrição são obrigatórios'})
    }else{
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg','.png','.jpeg'];

        if (extensoesPermitidas.includes(extensao)){
            const nome_imagem = `${Date.now()}${extensao}`;

            try {
                const [status,resposta] = await createImagem(descricao, nome_imagem,imagem);
                res.status(status).json(resposta);
            } catch (error) {
                console.log(error);
                res.status(500).json('ImagemController :: Erro');
            }

        }else{
           res.status(415).json({message:'Arquivo Invalido!'});
        }
    }
}

export async function mostrandoImagens(req,res) {
    console.log('ImagemController :: mostrandoImagens');
    try {
        const [status,resposta] = await readImagem();
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json('ImagemController :: Erro');
    }
}

export async function atualizandoImagem(req, res) {
    console.log('ImagemController :: atualizandoImagem');
    const {descricao} = req.body;
    const {id_imagem} = req.params;
    try {
        const [status, resposta] = await updateImagem(descricao,id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json('ImagemController :: Erro');
    }
}

export async function deletandoImagem (req,res){
    console.log('ImagemController :: deletandoImagem');
    const {id_imagem} = req.params;

    try {
        const [status,resposta] = await deleteImagem(id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json('ImagemController :: Erro');
    }
}

export function downloadImagem(req,res){
    console.log('ImagemController :: downloadImagem');
    
    const {nome_imagem} = req.params;
    const caminho = path.join(__dirname,'..','..','public','img',nome_imagem);

    res.sendFile(caminho,(erro) => {
        if(erro){
            console.log(erro);
            res.status(404).json({message:'Imagem não encontrada'});
        }
    }
    );
    console.log(caminho);
}