<template>
   <div id="calendar">
      <div class="current"><span>{{ bindates.year }}年{{ bindates.month }}月</span></div>
      <table>
         <thead>
            <tr>
               <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(week, key) in calendar">
               <td v-for="(date, idx) in week" v-bind:class="isSpecial(key, idx)">
                  <div v-if="date.day != 'empty'" class="day" v-on:click="selectActiveBindata(key, idx)">
                     <span>{{ date.day }}</span>
                     <span v-if="date.bins != 'no bin'" v-bind:class="'symbol ' + date.bins[0].color">●</span>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>
<script>
   export default {
      props: {
         bindates: Object
      },
      data: function(){
         return {
            calendar:   new Array([], [], [], [], []),
            current:    new Array(2),
            active:     new Array(2)
         }
      },
      methods: {
         emptyDay: function(){
            return { day: 'empty' }
         },
         insertDays: function(d) {
            if(this.bindates.days[d][0] == undefined){
               return { day: d + 1, bins: 'no bin' }
            }else{
               return { day: d + 1, bins: this.bindates.days[d] }
            }
         },
         isSpecial: function(week, day){
            if(week == this.active[0] && day == this.active[1]){
               return 'active'
            }else if(week == this.current[0] && day == this.current[1]){
               return 'current'
            }else{
               return ''
            }
         },
         selectActiveBindata: function(key, idx){
            this.active = [key, idx]
            this.$emit('select-date', this.calendar[key][idx])
         }
      },
      created: function() {
         var calendar_cells = new Array(35)

         var year = this.bindates.year
         var month = this.bindates.month - 1
         var dates = this.bindates.days.length

         calendar_cells.fill(this.emptyDay())

         var current_month = new Date().getMonth() + 1
         var current_day = new Date().getDate()

         var first_day = new Date(year, month, 1).getDay()
         var j = first_day
         for(var i = 0; i < dates; i++){
            calendar_cells[j] = this.insertDays(i)
            if(i + 1 == current_day){
               this.current[1] = j
            }
            j += 1
         }

         if(month + 1 == current_month){
            this.current = [Math.floor(this.current[1] / 7), this.current[1] % 7]
            this.active = [this.current[0], this.current[1]]
         }

         for(var i = 0; i < this.calendar.length; i++){
            var first_idx = 0 + (7 * i)
            var last_idx = first_idx + 7
            this.calendar[i] = calendar_cells.slice(first_idx, last_idx)
         }

         this.selectActiveBindata(this.active[0], this.active[1])
      },
   }
</script>
