const CreatePostReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, blogData: action.blogData };

    default:
      return { state };
  }
};

export default CreatePostReducer;
