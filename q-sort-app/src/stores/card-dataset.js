import { defineStore } from 'pinia'


export const useCardDatesetStore = defineStore({
    id: "card-dataset",
    state: () => ({
        name: null,
        uid: null,
        question: "",
        delimiters: [],
        colors: [],
        selected_card_id: null,
        queue: [],
        selected_idx: 0,
        table: [],
        selected_row: null,
        selected_col: null,
        card_list: {},
        cookie_table: "",
        cookie_queue: ""
    }),

    getters: {

    },

    actions: {
        /**
         * load JSON file and save vale to store
         * @param {String} json Loads the json file into the structure
         */
        loadDataset(json){
            //General Q-sort info
            this.uid = json.uid
            this.name = json.name
            this.question = json.question
            this.delimiters = json.delimiters
            this.table = this.loadJsonTable(json.table)
            this.colors = this.getAllRowColors(json.colors)
            this.card_list = this.loadCards(json.cards)

            this.cookie_table = "Q-sortApp-"+ this.uid +"-table"
            this.cookie_queue = "Q-sortApp-"+ this.uid +"-queue"

            // Table
            if($cookies.isKey(this.cookie_table)){
                //Load table from cookie
                var c_table = this.loadCookieToArray(true)
                setTimeout(()=>{
                    this.table = this.loadTable(c_table)
                }, 50)
            }else{
                //Create empty cookie 
                this.updateCookies(true)
            }

            // Queue
            if($cookies.isKey(this.cookie_queue)){
                //load queue from cookie
                var c_queue = this.loadCookieToArray(false)
                setTimeout(() =>{
                    this.queue = c_queue.map(Number)
                    this.setSelected()
                }, 50)
            }else{
                //Add all cards to cookie and load them to queue
                this.queue = this.loadCardIds()
                this.updateCookies(false)
            }
            
            //Selected card generated based on queue
            if(this.table.length > 0){
                this.selected_card_id = json.cards[this.selected_idx].id
            }else{
                this.unselect()
            }


            
        },
        loadCookieToArray(is_table){
            var cookie_value = $cookies.get(is_table ? this.cookie_table : this.cookie_queue)
            if(cookie_value == null){
                return []
            }else{
                return cookie_value.split(",")
            }
        },
        updateCookies(is_table){
            var arr = is_table ? this.get2dTo1dArray(this.table) : this.queue
            var csv_str = arr.join(",")
            $cookies.set(is_table ? this.cookie_table : this.cookie_queue, csv_str)
        },
        updateBothCookies(){
            this.updateCookies(true)
            this.updateCookies(false)
        },
        loadTable(array){
            var arr = this.table
            var linear_idx = 0
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if(array[linear_idx] != ""){
                        arr[i][j] = parseInt(array[linear_idx])
                    }else{
                        arr[i][j] = null
                    }
                    linear_idx++
                }
            }
            return arr
        },
        loadCards(cards){
            var arr = {}
            cards.forEach(card => {
                arr[card.id] = card.text
            })
            return arr
        },
        loadCardIds(){
            var arr = Object.keys(this.card_list)
            arr = arr.map(id => parseInt(id))
            return arr
        },
        get2dTo1dArray(array_2D){
            var array_1D = []
            for (var row of array_2D) for (var element of row) array_1D.push(element)
            return array_1D
        },
        getCardText(id){
            return this.card_list[id]
        },
        
        /**
         * Add card to the end of queue
         * @param {dict} card Adds card (with id and text) into the card queue
         */
        addCardToQueue(card_id){
            this.queue.push(card_id)
            //TODO add card to the cookie with queue and remove it from cookie with current table
        },

        /**
         * Change index of selected card in queue
         * @param {Number} change How much is shifted seletion in card queue
         */
        changeSelectedIdx(change){
            if(this.selected_idx + change >= 0 && 
                this.selected_idx + change < this.queue.length){
                    this.selected_idx += change
                    this.selected_card_id = this.queue[this.selected_idx]
                }
        },
        /**
         * Get colors of all rows
         * @param {Array} delimiter_colors Hex numbers of edge colors
         * @returns {Array} interpolated colors of row
         */
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
        /**
         * Get Colors between two colors
         * @param {String} hex_color1 
         * @param {String} hex_color2 
         * @param {Number} midpoints how many colors generate between
         * @returns array with all colors
         */
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
                    var part_color = new_color.toString(16)
                    new_colors[idx] += part_color.length < 2 ? "0" + part_color : part_color
                }
            })  
            return new_colors
        },
        /**
         * removes card from queue and choses new elected color
         */
        removeCardFromQueue(){
            if(this.queue.length > 0){
                this.queue.splice(this.selected_idx, 1)
                if(this.queue.length  == 0){
                    this.unselect()
                } else if(this.queue.length - 1 < this.selected_idx){
                    this.setSelected(this.queue[--this.selected_idx])
                }else{
                    this.setSelected()
                }
            }
        },
        /**
         * removes card from table and changes selected card
         */
        removeCardFromTable(){
            var old_pos = this.getCardPos(this.selected_card_id)
            this.table[old_pos.row][old_pos.col] = null
            if(this.queue.length!=0){
                this.setSelected()
            }else{
                this.unselect()
            }
        },
        /**
         * Set new selected card
         * @param {Object} card Selected card
         * @param {Number} row Row of card if it has one
         * @param {Number} col Col of card if it has one
         */
        setSelected(card_id=this.queue[this.selected_idx], row=null, col=null){
            this.selected_card_id = card_id
            this.selected_row = row
            this.selected_col = col
        },
        /**
         * Checks if selected card is in queue
         * @returns {boolean}
         */
        isSelectedInQueue(){
            return this.queue.includes(this.selected_card_id)
        },
        /**
         * Loads JSON value basd on which creates table array
         * @param {Array} table 
         * @returns {Array}
         */
        loadJsonTable(table){
            var array = Array(table.length)
            for (let idx = 0; idx < array.length; idx++) {
                array[idx] = Array(table[idx]).fill(null)                
            }
            return array
        },
        /**
         * Moves card to slot
         * @param {Number} row of slot
         * @param {Number} col of slot
         */
        moveToSlot(row, col){
            if(!this.isNothingSelected()){
                var tmp_card_id = this.selected_card_id
                if(this.isSelectedInQueue()){
                    this.removeCardFromQueue()
                }else{
                    this.removeCardFromTable()
                }
                this.table[row][col] = tmp_card_id
                this.updateBothCookies()
            }
        },
        /**
         * get card om table
         * @param {Number} row of card slot
         * @param {Number} col of card slot
         * @returns 
         */
        getTableCardId(row, col){
            return this.table[row][col]
        },
        /**
         * Get pos of card on table
         * @param {String} text of card
         * @param {Number} id of card
         * @returns {dict} card pos
         */
        getCardPos(id){
            for (var row = 0; row < this.table.length; row++) {
                for (var col = 0; col < this.table[row].length; col++) {
                    var card_id = this.table[row][col]
                    if(card_id != null && card_id == id){
                        return {'row': row, 'col': col}
                    }
                }
            }
            return {'row': null, 'col': null}
        },
        /**
         * Spaw cards
         * @param {*} id of card to swap with (nonselected)
         * @param {*} text of card to swap with (nonselected)
         */
        swapSlots(id){
            if(!this.isNothingSelected()){
                var card1_pos = this.getCardPos(id)
                var card2_pos = {col: this.selected_col, row: this.selected_row}

                var card1_id = this.getTableCardId(card1_pos.row, card1_pos.col)
                var card2_id = this.getTableCardId(card2_pos.row, card2_pos.col)

                this.table[card1_pos.row][card1_pos.col] = card2_id
                this.table[card2_pos.row][card2_pos.col] = card1_id
                
                if(this.queue.length==0){
                    this.unselect()
                }else{
                    this.setSelected()
                }
                this.updateBothCookies()
            }
        },
        /**
         * Check if nothing is selected
         * @returns {boolean}
         */
        isNothingSelected(){
            return this.selected_card_id == null
        },
        /**
         * Unselects all cards
         */
        unselect(){
            this.selected_card_id = null
        },
        getRowValue(idx){
            var offset = Math.round(this.table.length / 2) - 1
            return offset - idx
        }
    },
})
