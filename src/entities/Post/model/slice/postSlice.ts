import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/app/store/store";
import { Post } from "@/entities/Post";
import { fetchUser } from "@/entities/User/model/slice/userSlice";

import { PostPageSchema } from "../types/post";

export const fetchPost = createAsyncThunk<Post, string, ThunkConfig<string>>(
  "post/fetchPost",
  async (id, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
      const response = await extra.api.get<Post>(`/posts/${id}`);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchUser(response.data.userId));

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("error.message");
    }
  }
);

const initialState: PostPageSchema = {
  isLoading: false,
  error: undefined,
  post: undefined,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state: PostPageSchema) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchPost.fulfilled,
        (state: PostPageSchema, action: PayloadAction<Post>) => {
          state.isLoading = false;
          state.post = action.payload;
        }
      )
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: postReducer, actions: postActions } = postSlice;
