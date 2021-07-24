import axios from 'axios';
const getPost = () => {
    let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/list`
    return axios.get(url).then(response => {
        console.log("response.data", response.data)
        return response.data
    }).catch(e => {
        return {
            data: false
        }
    })
}
const getUserPost = () => {
    let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/list?user_id=` + localStorage.getItem('user_id')
    return axios.get(url).then(response => {
        console.log("response.data", response.data)
        return response.data
    }).catch(e => {
        return {
            data: false
        }
    })
}

const signup = (data) => {
    let requestBody = {
        email: data.email,
        password: data.password,
        name: data.username
    }
    console.log("requestBody", requestBody)
    let url = `${process.env.REACT_APP_API_SERVER_HOST}/account/register`
    return axios.post(url, requestBody).then(response => {
        if (response.data.success == true) {
            console.log("response.data", response.data.data[0].user_id)

            localStorage.setItem('user_id', response.data.data[0].user_id)
        }
        console.log("response.data", response)
        return response.data
    }).catch((error, response) => {
        // console.log("error",error.response,"response",response)
        return error.response.data;
    })
}
const login = (data) => {

    let url = `${process.env.REACT_APP_API_SERVER_HOST}/account/login?email=${data.email}&password=${data.password}`
    return axios.get(url).then(response => {
        if (response.data.success == true) {
            console.log("response.data", response.data.data[0].user_id)

            localStorage.setItem('user_id', response.data.data[0].user_id)
        }
        console.log("response.data", response)
        return response.data
    }).catch((error, response) => {
        // console.log("error",error.response,"response",response)
        return error.response.data;
    })
}
const editPost = (id) => {

    let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/${id}`
    return axios.get(url).then(response => {
        if (response.data.success == true) {
            return response.data


        }
        console.log("response.data", response)
    }).catch((error, response) => {
        // console.log("error",error.response,"response",response)
        return error.response.data;
    })
}
const deletePost = (id) => {

    let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/delete/${id}`
    return axios.get(url).then(response => {
        return response



        console.log("response.data", response)
    }).catch((error, response) => {
        // console.log("error",error.response,"response",response)
        return error.response.data;
    })
}
const addPost = (data) => {
    const formData = new FormData();
    data.fileUrl && formData.append('fileUrl', data.fileUrl.raw)

    return axios.post(`${process.env.REACT_APP_API_SERVER_HOST}/upload/thumbnail`, formData)
        .then((response) => {
            if (response.data.success === true) {
                console.log("response.data.data", response.data.data)
                var image = response.data.data[0].filename
                var is_public = 0;
                if (data.public) {
                    is_public = 1
                }
                let requestBody = {
                    title: data.postTitle,
                    description: data.description,
                    image: image,
                    public_post: is_public,
                    user_id: localStorage.getItem('user_id')
                }
                let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/add`
                return axios.post(url, requestBody).then(response => {
                    console.log("response.data", response)


                    //console.log("response.data", response)
                    return response
                }).catch((error, response) => {
                    // console.log("error",error.response,"response",response)
                    return error.response.data;
                })
            }
        })
}
const updatePost = (data, filename) => {
    const formData = new FormData();
    data.fileUrl && formData.append('fileUrl', data.fileUrl.raw)
    if (data.fileUrl) {
        return axios.post(`${process.env.REACT_APP_API_SERVER_HOST}/upload/thumbnail`, formData)
            .then((response) => {
                if (response.data.success === true) {
                    console.log("response.data.data", response.data.data)
                    var image = response.data.data[0].filename
                    var is_public = 0;
                    if (data.public) {
                        is_public = 1
                    }
                    let requestBody = {
                        post_id: data.post_id,
                        title: data.postTitle,
                        description: data.description,
                        image: image,
                        public_post: is_public,
                        user_id: localStorage.getItem('user_id')
                    }
                    let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/update`
                    return axios.post(url, requestBody).then(response => {
                        if (response.data.success == true) {
                            console.log("response.data", response.data.data[0].user_id)

                            localStorage.setItem('user_id', response.data.data[0].user_id)
                        }
                        console.log("response.data", response)
                        return response.data
                    }).catch((error, response) => {
                        // console.log("error",error.response,"response",response)
                        return error.response.data;
                    })
                }
            })
    } else {
        var is_public = 0;
        if (data.public) {
            is_public = 1
        }
        let requestBody = {
            post_id: data.post_id,
            title: data.postTitle,
            description: data.description,
            image: filename,
            public_post: is_public,
            user_id: localStorage.getItem('user_id')
        }
        let url = `${process.env.REACT_APP_API_SERVER_HOST}/post/update`
        return axios.post(url, requestBody).then(response => {

            return response.data
        }).catch((error, response) => {
            // console.log("error",error.response,"response",response)
            return error.response.data;
        })
    }
}
export const Service = {
    getPost,
    signup,
    getUserPost,
    addPost,
    login,
    editPost,
    updatePost,
    deletePost
}