import { isGloballyWhitelisted } from '@vue/shared'
import { defineStore } from 'pinia'

export const useCardDatesetStore = defineStore({
    id: "card-dataset",
    state: () => ({
        name: null,
        uid: null,
        question: "",
        delimiters: [],
        colors: [],
        selected_card: {
            id: null,
            text: "",
        },
        queue: [],
        selected_idx: null,
        table: [],
        selected_row: null,
        selected_col: null
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
            this.queue = json.cards
            this.selected_idx = 0
            this.selected_card.id = json.cards[this.selected_idx].id
            this.selected_card.text = json.cards[this.selected_idx].text
            this.table = this.loadJsonTable(json.table)
            this.colors = this.getAllRowColors(json.colors)
        },
        
        /**
         * 
         * @param {dict} card Adds card (with id and text) into the card queue
         */
        addCardToQueue(card){
            this.queue.push(card)
            //TODO add card to the cookie with queue and remove it from cookie with current table
        },

        /**
         * 
         * @param {Number} change How much is shifted seletion in card queue
         */
        changeSelectedIdx(change){
            if(this.selected_idx + change >= 0 && 
                this.selected_idx + change < this.queue.length){
                    this.selected_idx += change
                    this.selected_card.id = this.queue[this.selected_idx].id
                    this.selected_card.text = this.queue[this.selected_idx].text
                }
        },
        //TODO add documentattion
        getAllRowColors(delimiter_colors){
            const row_count = this.table.length
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
                var step = Math.round((num1 - num2) / midpoints)
                var new_color = num1
                for (let idx = 0; idx < midpoints-1; idx++) {
                    new_color -= step
                    new_colors[idx] += new_color.toString(16)
                }
            })  
            return new_colors
        },
        removeCardFromQueue(){
            if(this.queue.length > 0){
                this.queue.splice(this.selected_idx, 1)
                if(this.queue.length  == 0){
                    this.setSelected({id: null, text: null})
                } else if(this.queue.length - 1 < this.selected_idx){
                    this.setSelected(this.queue[--this.selected_idx])
                }else{
                    this.setSelected()
                }
            }
        },
        removeCardFromTable(newRow, newPos){
            var old_pos = this.getCardPos(this.selected_card.text, this.selected_card.id)
            this.table[old_pos.row][old_pos.col] = null
            if(this.queue.length!=0){
                this.setSelected()
            }else{
                this.setSelected({id: null, text: null})
            }
        },
        setSelected(card=this.queue[this.selected_idx], row=null, col=null){
            this.selected_card.id = card.id
            this.selected_card.text = card.text
            this.selected_row = row
            this.selected_col = col
        },
        isSelectedInQueue(){
            return this.queue.some(item => item.id == this.selected_card.id &&
                item.text == this.selected_card.text)
        },
        loadJsonTable(table){
            var array = Array(table.length)
            for (let idx = 0; idx < array.length; idx++) {
                array[idx] = Array(table[idx]).fill(null)                
            }
            return array
        },
        moveToTable(row, col){
            var tmp = {...this.selected_card}
            if(tmp.text != null && tmp.id != null){
                if(this.isSelectedInQueue()){
                    this.removeCardFromQueue()
                }else{
                    this.removeCardFromTable()
                }
                this.table[row][col] = tmp
            }
        },
        getTableCard(row, col){
            return this.table[row][col]
        },
        getCardPos(text, id){
            for (var row = 0; row < this.table.length; row++) {
                for (var col = 0; col < this.table[row].length; col++) {
                    var card = this.table[row][col]
                    if(card != null && card.id == id && card.text == text){
                        return {'row': row, 'col': col}
                    }
                }
            }
            return {'row': null, 'col': null}
        },
        swapOnTable(id, text){
            var card1_pos = this.getCardPos(text, id)
            var card2_pos = {col: this.selected_col, row: this.selected_row}

            var card1 = this.getTableCard(card1_pos.row, card1_pos.col)
            var card2 = this.getTableCard(card2_pos.row, card2_pos.col)

            this.table[card1_pos.row][card1_pos.col] = {...card2}
            this.table[card2_pos.row][card2_pos.col] = {...card1}

            this.setSelected()
        },
        isNothingSelected(){
            return this.selected_card.id == null
        }
    },
})
