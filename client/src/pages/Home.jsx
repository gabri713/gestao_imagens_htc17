import React, {useEffect, useState} from "react"

function Home(){
    const [imagens, setImagens] = useState([]);
    useEffect(() => {
        carregarImagens();
    },[]);

    async function carregarImagens() {
        try{
            const resposta = fetch('http://localhost:5000/imagem',{
                
            })
        }
        
    }
}