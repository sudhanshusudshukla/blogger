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
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        callback();
    };
};

const deleteBlog = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogPost', payload: id })
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlog },
    []
);

//Not Required as we are creating Automated createDataContext


// export const BlogProvider = ({ children }) => {
//     // const blogPosts = [{ title: 'Blog Post #1' }, { title: 'Blog Post #2' }];
//     //const [blogPosts, setBlogPosts] = useState([]); ->using state
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     //will try other way by using useReducer
//     // const addBlogPost = () => {
//     //     setBlogPosts([...blogPosts,
//     //     { title: `Blog Post #${blogPosts.length + 1}` }]);
//     // };
//     const addBlogPost = () => {
//             dispatch({type: 'add_blogpost'});
//     }; 

//     return <BlogContext.Provider
//     value={{ data: blogPosts, addBlogPost }} >
//         {children}</BlogContext.Provider>;
// };
//export default BlogContext;