import React, { useState } from 'react';
import axios from 'axios';

export default function Article() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState("");
    const [author_id, setAuthorId] = useState("");
    const [created_at, setDate] = useState("");

    const addArticle = () => {
        const article = {
            title: title,
            content: content,
            author_id: author_id,
            created_at: created_at,

        };
        axios.post('http://localhost:3002/api/articles', article)
            .then(res => console.log(res.data));
    };

    const editArticle = () => {
        const article = {
            title: title,
            content: content,
        };
        axios.put(`http://localhost:3002/api/articles/${id}`, article)
            .then(res => console.log(res.data));
    };

    const deleteArticle = () => {
        axios.delete(`http://localhost:3002/api/articles/${id}`)
            .then(res => console.log(res.data));
    };

    return (
        <div>
            <h2>Gérer l'article</h2>

            <form onSubmit={addArticle}>
                <label>
                    Titre:
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Contenu:
                    <input type="text" name="content" onChange={(e) => setContent(e.target.value)} />
                

                
                </label>
                <button type="submit">Ajouter</button>
            </form>

            <form onSubmit={editArticle}>
                <label>
                    ID:
                    <input type="text" name="id" onChange={(e) => setId(e.target.value)} />
                </label>
                <label>
                    Titre:
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Contenu:
                    <input type="text" name="content" onChange={(e) => setContent(e.target.value)} />
                </label>
                <button type="submit">Modifier</button>
            </form>

            {/* <form onSubmit={deleteArticle}>
                <label>
                    supprimer un article par so:
                    <input type="text" name="id" onChange={(e) => setId(e.target.value)} />
                </label>
                <button type="submit">Supprimer</button> */}
            {/* </form> */}
        </div>
    );
}