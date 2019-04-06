import initState from "./initStore";
import service from "../services/example";
export default {
  namespace: "example",

  state: { ...initState },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *getInitList({ payload }, { call, put, select }) {
      let list = yield select(state=>state.example.list);
      let r = [];
      let i;
      for (i = list.length; i < (list.length + 30); i++) {
        r.push({
          name: `${i}-name`,
          sex: `${i}-boy`,
          age: `${i}-25`,
          height: 170+i,
          game: `${i}-pubg`
        });
      }
      list = list.concat(r);
      yield put({
        type:"save",
        payload:{
          list
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
