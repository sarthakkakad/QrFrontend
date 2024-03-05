import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VerifyQr, bulkQrSend, checkUser, createParticipant, deleteParticipant, getAllEntries, getAllParticipants, sendEveryoneQr, sendPersonalQr } from './counterAPI';

const initialState = {
  user : null,
  status: 'idle',
  error : null,
  participants : null,
  entries : null,
  VerifyQr : null,
  VerifiedUser : null,
  sendEveryoneQr : null
};

export const checkUserAsync = createAsyncThunk(
  "counter/checkUser",
  async (userData) => {
    try {
      const response = await checkUser(userData);
      return response.data;
    } catch (error) {
      const response = await checkUser(userData);
      return response.error;
    }
  }
);

export const getAllParticipantsAsync = createAsyncThunk(
  "counter/getAllParticipants",
  async () => {
    try {
      const response = await getAllParticipants();
      return response.data;
    } catch (error) {
      const response = await getAllParticipants();
      return response.error;
    }
  }
);

export const getAllEntriesAsync = createAsyncThunk(
  "counter/getAllEntries",
  async () => {
    try {
      const response = await getAllEntries();
      return response.data;
    } catch (error) {
      const response = await getAllEntries();
      return response.error;
    }
  }
);

export const createParticipantAsync = createAsyncThunk(
  "counter/createParticipant",
  async (userData) => {
    try {
      const response = await createParticipant(userData);
      return response.data;
    } catch (error) {
      const response = await createParticipant(userData);
      return response.error;
    }
  }
);

export const bulkQrSendAsync = createAsyncThunk(
  "counter/bulkQrSend",
  async (userData) => {
    try {
      const response = await bulkQrSend(userData);
      return response.data;
    } catch (error) {
      const response = await bulkQrSend(userData);
      return response.error;
    }
  }
);

export const VerifyQrAsync = createAsyncThunk(
  "counter/VerifyQr",
  async (userData) => {
    try {
      const response = await VerifyQr(userData);
      return response.data;
    } catch (error) {
      const response = await VerifyQr(userData);
      return response.error;
    }
  }
);

export const deleteParticipantAsync = createAsyncThunk(
  "counter/deleteParticipant",
  async (id) => {
    try {
      const response = await deleteParticipant(id);
      return response.data;
    } catch (error) {
      const response = await deleteParticipant(id);
      return response.error;
    }
  }
);

export const sendPersonalQrAsync = createAsyncThunk(
  "counter/sendPersonalQr",
  async (id) => {
    try {
      const response = await sendPersonalQr(id);
      return response.data;
    } catch (error) {
      const response = await sendPersonalQr(id);
      return response.error;
    }
  }
);

export const sendEveryoneQrAsync = createAsyncThunk(
  "counter/sendEveryoneQr",
  async () => {
    try {
      const response = await sendEveryoneQr();
      return response.data;
    } catch (error) {
      const response = await sendEveryoneQr();
      return response.error;
    }
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('token' , action.payload.user.id)
        state.status = "idle";
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(getAllParticipantsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllParticipantsAsync.fulfilled, (state, action) => {
        state.participants = action.payload.participants;
        state.status = "idle";
      })
      .addCase(getAllParticipantsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(getAllEntriesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllEntriesAsync.fulfilled, (state, action) => {
        state.entries = action.payload.Entries;
        state.status = "idle";
      })
      .addCase(getAllEntriesAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(createParticipantAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createParticipantAsync.fulfilled, (state, action) => {
        state.participants.push(action.payload.participant);
        state.status = "idle";
      })
      .addCase(createParticipantAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(deleteParticipantAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteParticipantAsync.fulfilled, (state, action) => {
        const id = action.payload.id
        // const index = state.participants.findIndex((participant)=> participant.id === id)
        // state.participants.splice(index , 1)
        state.participants = state.participants.filter((obj) => obj.id !== id);
        state.status = "idle";
      })
      .addCase(deleteParticipantAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(sendPersonalQrAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendPersonalQrAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(sendPersonalQrAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(bulkQrSendAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bulkQrSendAsync.fulfilled, (state, action) => {
        state.participants = state.participants.concat(action.payload.participants)
        state.status = "idle";
      })
      .addCase(bulkQrSendAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(sendEveryoneQrAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendEveryoneQrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sendEveryoneQr = true
      })
      .addCase(sendEveryoneQrAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(VerifyQrAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.VerifyQr = null
        state.VerifiedUser = null
      })
      .addCase(VerifyQrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.VerifyQr = action.payload.message;
        state.VerifiedUser = action.payload.user
      })
      .addCase(VerifyQrAsync.rejected, (state, action) => {
        state.VerifyQr = action.error.message;
        state.status = "idle";
      })
  },
});

export const { increment, incrementByAmount } = counterSlice.actions;

export const selectError = (state) => state.counter.error;
export const selectUser = (state) => state.counter.user;
export const selectEntries = (state) => state.counter.entries;
export const selectParticipants = (state) => state.counter.participants;
export const selectQrMessage = (state) => state.counter.VerifyQr;
export const selectVerifiedUser = (state) => state.counter.VerifiedUser;
export const selectsendEveryoneQr = (state) => state.counter.sendEveryoneQr


// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
