import { createStore } from 'vuex'

export default createStore({
    state: {
        name: null,
        uid: null,
        question: "",
        table_shape: [],
        table_selection_pos: [null, null],
        is_queue_selected: null,
        queue: {
            card_array: [],
            selection_idx: null
        }
    },

    getters: {
    },

    mutations: {
        loadDataset(state, json){
            state.name = json.name
            state.uid = json.uid
            state.question = json.question
            state.table_shape = json.table
            state.is_queue_selected = true

            state.queue.card_array = json.cards
            state.queue.selection_idx = 0
        },
        addCardToQueue(state, card){
            state.queue.card_array.push(card)
            //TODO add card to the cookie with queue and remove it from cookie with current table
        }
    },

    actions: {
    },

    modules: {
    }
})
