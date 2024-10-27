import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState, ThunkConfig } from "@/app/store/store";
import { Post } from "@/entities/Post";
import { fetchUsers } from "@/entities/Users/model/slice/usersSlice";

import { LIMIT } from "../../constants";
import { getPostsPage } from "../selectors/posts";
import { PostsPageSchema } from "../types/postsPage";

export const fetchPosts = createAsyncThunk<
  Post[],
  number | undefined,
  ThunkConfig<string>
>("posts/fetchPosts", async (_, thunkAPI) => {
  const { extra, getState, dispatch, rejectWithValue } = thunkAPI;

  try {
    const page = getPostsPage(getState());
    const response = await extra.api.get("/posts", {
      params: {
        _limit: LIMIT,
        _page: page,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    const usersId = response.data.map((data: Post) => data.userId);

    dispatch(fetchUsers(usersId));

    return response.data;
  } catch (error) {
    //TODO
    console.log(error);
    return rejectWithValue("error.message");
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
