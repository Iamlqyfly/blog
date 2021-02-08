import Vue from 'vue';
import Vuex from 'vuex';
import moduleA from './moduleA/index';
import moduleB from './moduleB/index';
Vue.use(vuex);

export default Vuex.Store({
  module: {
    moduleA,
    moduleB,
  }
})