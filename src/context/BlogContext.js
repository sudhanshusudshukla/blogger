import createDataContext from '../context/createDataContext';

//const BlogContext = React.createContext(); --> createDataContext will take care

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogPost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [...state,
            {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }
            ];
        case 'edit_blogPost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        if (callback) {
            callback();
        }
    };
};

const deleteBlog = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogPost', payload: id })
    };
};
const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
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
    { addBlogPost, deleteBlog, editBlogPost },
    []
);