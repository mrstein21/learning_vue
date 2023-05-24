import Vuex from 'vuex';
import {auth} from "./auth_store";
import { airsoft } from './airsoft_store';

export default new Vuex.Store({
  modules: {
    auth,
    airsoft
  }
});