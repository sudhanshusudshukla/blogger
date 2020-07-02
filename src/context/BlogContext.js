import createDataContext from '../context/createDataContext';
import jsonServer from '../api/jsonServer';



const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;

        case 'edit_blogPost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });

        case 'delete_blogPost':
            return state.filter((blogPost) => blogPost.id !== action.payload);

        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({ type: 'get_blogposts', payload: response.data });

    };
};



const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        // dispatch({ type: 'add_blogpost', payload: { title, content } });
        await jsonServer.post('/blogposts', { title, content });

        if (callback) {
            callback();
        }
    };
};

const deleteBlog = (dispatch) => {
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogPost', payload: id })
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title,content})
       
        dispatch({
            type: 'edit_blogPost',
            payload: { id: id, title: title, content: content }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlog, editBlogPost, getBlogPosts },
    []
);