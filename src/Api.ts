const bakcendURL="https://localhost:8080/"
const baseAPI="api/"
export type Article = {
    article_title: string;
    article_author: string;
    article_description: string;
    publications_date: string;
    article_change_date: string;
    time_to_complete: string;
    article_id: number;
    grade_levels?:[{
        grade_name:string,
    }]
    subjects?: [{
        subject_id:string,
        subject_name:string
    }];
    files?: [{
        "file_id":string,
        "fil_name":string
    }];
    images?:[{
        "file_id":string,
        "alt_text":string
    }];

};
const axios = require('axios').default;


export type ArticleState = Article;

export const fetchArticles = async (search?:string|null) => {
    let data;
    const endpoint = bakcendURL+baseAPI+"articlelist";
    if(search){
        data = await axios.get(endpoint,{
            headers:{
                query:search?search:""
            }
        })
    }else {
        data = await axios.get(endpoint)
    }
    return data.data;
  };

export const fetchArticlesByUser = async (userid:string) => {
    let data;
    const endpoint = bakcendURL+baseAPI+"articlelist";
    data = await axios.get(endpoint,{
        headers:{
            "query-type":"byUser",
            userID:userid
        }
    })
    return data.data;
};



export const login = async (email,password) => {
    const endpoint = bakcendURL+baseAPI+"login";
    let data;
    data = await axios.post(endpoint,{
            email: email,
            password: password
    }).catch(error=>{
        console.error(error)
    })

    return data.status===200?data.data:undefined

};

export const registration = async (email,password,username) => {
    const endpoint = bakcendURL+baseAPI+"user";
    let data;
    if(email&&password&&username){
        data = await axios.post(endpoint,{
            email: email,
            username:username,
            password: password
        }).catch(error=>{
            console.error(error)
        })
    }
    return data.status===200?data.data:undefined

};

export const newArticle=async (article,files)=>{
    let requestBody = new FormData();
    let response;
    requestBody.append("body",JSON.stringify(article))
    files.map(oneFile=>requestBody.append("file",oneFile,oneFile.name))
    response =await axios.post(bakcendURL+baseAPI+"article", requestBody).catch((error:any) => console.error("api newArticle:",error))
    return response.status===200
}

export const fetchArticle=async (id,userId)=>{
    let data = await axios.get(bakcendURL+baseAPI+"article/"+id,{
        headers:{
            user_id:userId
        }
    }).catch((err:any)=>console.error("Error fetchArticle",err))
    return data.status===200?data.data:undefined;
}