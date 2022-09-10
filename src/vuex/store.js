import {createStore} from'vuex';
import {postFn} from '../api/request';

export default createStore({
    state: {
        items: {}
    },
    actions: {
        fetchItem({commit}, id) {
            return postFn({
                url: '/getItem',
                data: {
                    id,
                }
            }).then((item) => {
                commit('setItem', {id, item});
            });
        },
    },
    mutations: {
        setItem(state, data) {
            state.items = data.items;
        },
    },
});