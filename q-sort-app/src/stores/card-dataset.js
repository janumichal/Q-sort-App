import { defineStore } from 'pinia'

export const useCardDatesetStore = defineStore({
    id: "card-dataset",
    state: () => ({
        name: null,
        uid: null,
        question: "",
        delimiters: [],
        colors: [],
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
            this.delimiters = json.delimiters
            this.table_shape = json.table
            this.colors = this.getAllRowColors(json.colors)
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
        },
        //TODO add documentattion
        getAllRowColors(delimiter_colors){
            const row_count = this.table_shape.length
            const positive_pos = 0
            const neutral_pos = Math.round(row_count / 2) - 1
            const negative_pos = row_count - 1
            const midpoints = neutral_pos
            var array = Array(row_count).fill("")

            array[positive_pos] = delimiter_colors[0]
            array[neutral_pos] = delimiter_colors[1]
            array[negative_pos] = delimiter_colors[2]

            var between_colors1 = this.getColorsBetween(array[positive_pos].substring(1), array[neutral_pos].substring(1), midpoints)
            var between_colors2 = this.getColorsBetween(array[neutral_pos].substring(1), array[negative_pos].substring(1), midpoints)

            between_colors1.forEach((item, index) =>{
                array[positive_pos + index + 1] = "#"+item.toUpperCase()
            })
            between_colors2.forEach((item, index) =>{
                array[neutral_pos + index + 1] = "#"+item.toUpperCase()
            })

            return array
        },
        //TODO add documentattion
        isOnPos(index, position){
            return index == position
        },
        //TODO add documentattion
        getColorsBetween(hex_color1, hex_color2, midpoints){
            var hex1_array = hex_color1.match(/.{2}/g)
            var hex2_array = hex_color2.match(/.{2}/g)

            var new_colors = Array(midpoints-1).fill("")

            hex1_array.forEach((item, index) => {
                var num1 = Number("0x"+item)
                var num2 = Number("0x"+hex2_array[index])
                var step = Math.round(Math.abs(num1 - num2) / midpoints)
                var new_color = num1
                for (let idx = 0; idx < midpoints-1; idx++) {
                    if(num1 > num2){
                        new_color -= step
                    }else{
                        new_color += step
                    }
                    
                    new_colors[idx] += new_color.toString(16)
                }
            })  
            return new_colors
        }
    },
})
