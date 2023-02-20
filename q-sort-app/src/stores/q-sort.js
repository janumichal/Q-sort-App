import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'
import { ref } from 'vue'

export const useQSortStore = defineStore("q-sort", () => {

        const s_store = useSettingsStore()

        const name = ref(null)
        const uid = ref(null)
        const question = ref("")
        const delimiters = ref([])
        const colors = ref([])
        const selected_card_id = ref(null)
        const queue = ref([])
        const selected_idx = ref(0)
        const table = ref([])
        const selected_row = ref(null)
        const selected_col = ref(null)
        const card_list = ref({})

        const cookie_table = ref("")
        const cookie_queue = ref("")
    

        /**
         * load JSON file and save vale to store
         * @param {String} json Loads the json file into the structure
         */
        function loadDataset(json){
            //General Q-sort info
            uid.value = json.uid
            name.value = json.name
            question.value = json.question
            delimiters.value = json.delimiters
            table.value = loadJsonTable(json.table)
            colors.value = getAllRowColors(json.colors)
            card_list.value = loadCards(json.cards)

            cookie_table.value = "Q-sortApp-"+ uid.value +"-table"
            cookie_queue.value = "Q-sortApp-"+ uid.value +"-queue"

            s_store.loadSettings()

            // Table
            if(s_store.saving_enabled && $cookies.isKey(cookie_table.value)){
                //Load table from cookie
                var c_table = loadCookieToArray(true)
                setTimeout(()=>{
                    table.value = loadTable(c_table)
                }, 50)
            }else{
                //Create empty cookie 
                updateCookies(true)
            }

            // Queue
            if(s_store.saving_enabled && $cookies.isKey(cookie_queue.value)){
                //load queue from cookie
                var c_queue = loadCookieToArray(false)
                setTimeout(() =>{
                    queue.value = c_queue.map(Number)
                    setSelected()
                }, 50)
            }else{
                //Add all cards to cookie and load them to queue
                queue.value = loadCardIds()
                updateCookies(false)
            }
            
            //Selected card generated based on queue
            if(table.value.length > 0){
                selected_card_id.value = queue.value[selected_idx.value]
            }else{
                unselect()
            }


            
        }
        function loadCookieToArray(is_table){
            var cookie_value = $cookies.get(is_table ? cookie_table.value : cookie_queue.value)
            if(cookie_value == null){
                return []
            }else{
                return cookie_value.split(",")
            }
        } 
        function updateCookies(is_table){
            var arr = is_table ? get2dTo1dArray(table.value) : queue.value
            var csv_str = arr.join(",")
            $cookies.set(is_table ? cookie_table.value : cookie_queue.value, csv_str)
        } 
        function updateBothCookies(){
            if(s_store.saving_enabled){
                updateCookies(true)
                updateCookies(false)
            }
        }
        function loadTable(array){
            var arr = table.value
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
        }
        function loadCards(cards){
            var arr = {}
            cards.forEach(card => {
                arr[card.id] = card.text
            })
            return arr
        }
        function loadCardIds(){
            var arr = Object.keys(card_list.value)
            arr = arr.map(id => parseInt(id))
            return arr
        }
        function get2dTo1dArray(array_2D){
            var array_1D = []
            for (var row of array_2D) for (var element of row) array_1D.push(element)
            return array_1D
        }
        function getCardText(id){
            return card_list.value[id]
        }
        
        /**
         * Add card to the end of queue
         * @param {dict} card Adds card (with id and text) into the card queue
         */
        function addCardToQueue(card_id){
            queue.value.push(card_id)
            //TODO add card to the cookie with queue and remove it from cookie with current table
        }

        /**
         * Change index of selected card in queue
         * @param {Number} change How much is shifted seletion in card queue
         */
        function changeSelectedIdx(change){
            if(selected_idx.value + change >= 0 && 
                selected_idx.value + change < queue.value.length){
                    selected_idx.value += change
                    selected_card_id.value = queue.value[selected_idx.value]
                }
        }
        /**
         * Get colors of all rows
         * @param {Array} delimiter_colors Hex numbers of edge colors
         * @returns {Array} interpolated colors of row
         */
        function getAllRowColors(delimiter_colors){
            const row_count = table.value.length
            const positive_pos = 0
            const neutral_pos = Math.round(row_count / 2) - 1
            const negative_pos = row_count - 1
            const midpoints = neutral_pos
            var array = Array(row_count).fill("")

            array[positive_pos] = delimiter_colors[0]
            array[neutral_pos] = delimiter_colors[1]
            array[negative_pos] = delimiter_colors[2]

            var between_colors1 = getColorsBetween(array[positive_pos].substring(1), array[neutral_pos].substring(1), midpoints)
            var between_colors2 = getColorsBetween(array[neutral_pos].substring(1), array[negative_pos].substring(1), midpoints)

            between_colors1.forEach((item, index) =>{
                array[positive_pos + index + 1] = "#"+item.toUpperCase()
            })
            between_colors2.forEach((item, index) =>{
                array[neutral_pos + index + 1] = "#"+item.toUpperCase()
            })

            return array
        }
        /**
         * Get Colors between two colors
         * @param {String} hex_color1 
         * @param {String} hex_color2 
         * @param {Number} midpoints how many colors generate between
         * @returns array with all colors
         */
        function getColorsBetween(hex_color1, hex_color2, midpoints){
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
        }
        /**
         * removes card from queue and choses new elected color
         */
        function removeCardFromQueue(){
            if(queue.value.length > 0){
                queue.value.splice(selected_idx.value, 1)
                if(queue.value.length  == 0){
                    unselect()
                } else if(queue.value.length - 1 < selected_idx.value){
                    setSelected(queue.value[--selected_idx.value])
                }else{
                    setSelected()
                }
            }
        }
        /**
         * removes card from table and changes selected card
         */
        function removeCardFromTable(){
            var old_pos = getCardPos(selected_card_id.value)
            table.value[old_pos.row][old_pos.col] = null
            if(queue.value.length!=0){
                setSelected()
            }else{
                unselect()
            }
        }
        /**
         * Set new selected card
         * @param {Object} card Selected card
         * @param {Number} row Row of card if it has one
         * @param {Number} col Col of card if it has one
         */
        function setSelected(card_id=queue.value[selected_idx.value], row=null, col=null){
            selected_card_id.value = card_id
            selected_row.value = row
            selected_col.value = col
        }
        /**
         * Checks if selected card is in queue
         * @returns {boolean}
         */
        function isSelectedInQueue(){
            return queue.value.includes(selected_card_id.value)
        }
        /**
         * Loads JSON value basd on which creates table array
         * @param {Array} table 
         * @returns {Array}
         */
        function loadJsonTable(table){
            var array = Array(table.length)
            for (let idx = 0; idx < array.length; idx++) {
                array[idx] = Array(table[idx]).fill(null)                
            }
            return array
        }
        /**
         * Moves card to slot
         * @param {Number} row of slot
         * @param {Number} col of slot
         */
        function moveToSlot(row, col){
            if(!isNothingSelected()){
                var tmp_card_id = selected_card_id.value
                if(isSelectedInQueue()){
                    removeCardFromQueue()
                }else{
                    removeCardFromTable()
                }
                table.value[row][col] = tmp_card_id
                updateBothCookies()
            }
        }
        /**
         * get card om table
         * @param {Number} row of card slot
         * @param {Number} col of card slot
         * @returns 
         */
        function getTableCardId(row, col){
            return table.value[row][col]
        }
        /**
         * Get pos of card on table
         * @param {String} text of card
         * @param {Number} id of card
         * @returns {dict} card pos
         */
        function getCardPos(id){
            for (var row = 0; row < table.value.length; row++) {
                for (var col = 0; col < table.value[row].length; col++) {
                    var card_id = table.value[row][col]
                    if(card_id != null && card_id == id){
                        return {'row': row, 'col': col}
                    }
                }
            }
            return {'row': null, 'col': null}
        }
        /**
         * Spaw cards
         * @param {*} id of card to swap with (nonselected)
         * @param {*} text of card to swap with (nonselected)
         */
        function swapSlots(id){
            if(!isNothingSelected()){
                var card1_pos = getCardPos(id)
                var card2_pos = {col: selected_col.value, row: selected_row.value}

                var card1_id = getTableCardId(card1_pos.row, card1_pos.col)
                var card2_id = getTableCardId(card2_pos.row, card2_pos.col)

                table.value[card1_pos.row][card1_pos.col] = card2_id
                table.value[card2_pos.row][card2_pos.col] = card1_id
                
                if(queue.value.length==0){
                    unselect()
                }else{
                    setSelected()
                }
                updateBothCookies()
            }
        }
        /**
         * Check if nothing is selected
         * @returns {boolean}
         */
        function isNothingSelected(){
            return selected_card_id.value == null
        }
        /**
         * Unselects all cards
         */
        function unselect(){
            selected_card_id.value = null
        }
        function getRowValue(idx){
            var offset = Math.round(table.value.length / 2) - 1
            return offset - idx
        }
        function returnCardToQueue(){
            if(!isSelectedInQueue()){
                queue.value.push(selected_card_id.value)
                table.value[selected_row.value][selected_col.value] = null
                setSelected()
                updateBothCookies()
            }
        }
        function resetTable(){
            for (var i = 0; i < table.value.length; i++) {
                for (var j = 0; j < table.value[i].length; j++) {
                    var card = table.value[i][j]
                    if(card != null){
                        queue.value.push(card)
                        table.value[i][j] = null
                    }
                }
            }
            setSelected()
            updateBothCookies()
        }
        return {
            name, question, delimiters, colors, selected_card_id, queue, selected_idx, table,
            selected_row, selected_col,

            loadDataset, changeSelectedIdx, getCardText, addCardToQueue, getAllRowColors, setSelected, 
            isSelectedInQueue, moveToSlot, getTableCardId, getCardPos, swapSlots, 
            isNothingSelected, getRowValue, returnCardToQueue, resetTable
        }
    })
