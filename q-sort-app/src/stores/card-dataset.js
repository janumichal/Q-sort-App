import { defineStore } from 'pinia'

export const useCardDatesetStore = defineStore({
    id: "card-dataset",
    state: () => ({
        name: null,
        uid: null,
        question: "",
        table_shape: [],
        table_selection_pos: [null, null],
        is_queue_selected: null,
        queue: {
            card_array: [],
            selected_idx: null
        }
    }),

    getters: {
    },

    actions: {
        /**
         * 
         * @param {String} json Loads the json file into the structure
         */
        loadDataset(json){
            this.name = json.name
            this.uid = json.uid
            this.question = json.question
            this.table_shape = json.table
            this.is_queue_selected = true

            this.queue.card_array = json.cards
            this.queue.selected_idx = 0
        },
        /**
         * 
         * @param {dict} card Adds card (with id and text) into the card queue
         */
        addCardToQueue(card){
            this.queue.card_array.push(card)
            //TODO add card to the cookie with queue and remove it from cookie with current table
        },
        /**
         * 
         * @param {Number} change How much is shifted seletion in card queue
         */
        changeSelectedIdx(change){
            if(this.queue.selected_idx + change >= 0 && 
                this.queue.selected_idx + change < this.queue.card_array.length){
                    this.queue.selected_idx += change
                }
            console.log(this.queue.selected_idx)
        }
    },
})
