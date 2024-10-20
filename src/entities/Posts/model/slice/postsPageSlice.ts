import {
  EntityId,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { PostsPageSchema } from "../types/postsPage";
import axios from "axios";
import { RootState, ThunkConfig } from "@/app/store/store";
import { getPostsPage } from "../selectors/posts";
import { fetchUsers } from "@/entities/Users/model/slice/usersSlice";
import { Post } from "@/entities/Post";

export const fetchPosts = createAsyncThunk<
  Post[],
  number | undefined,
  ThunkConfig<string>
>("posts/fetchPosts", async (_, thunkAPI) => {
  try {
    const page = getPostsPage(thunkAPI.getState());
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: 10,
          _page: page,
        },
      }
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(fetchUsers());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("error.message");
  }
});

const initialState: PostsPageSchema = {
  isLoading: false,
  error: undefined,
  page: 1,
  limit: 10,
  isInit: false,
  ids: [],
  entities: {},
};

export const postsAdapter = createEntityAdapter<Post, EntityId>({
  selectId: (post) => post.id,
});

export const { selectById: selectPostById, selectAll: selectAllPosts } =
  postsAdapter.getSelectors((state: RootState) => state.posts);

export const postsPageSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(initialState),
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsPageSchema) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state: PostsPageSchema, action: PayloadAction<Post[]>) => {
          state.isLoading = false;
          state.isInit = true;
          postsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: postsPageReducer, actions: postsPageActions } =
  postsPageSlice;
