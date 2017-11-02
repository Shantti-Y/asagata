<template>
   <div id="calendar">
      <div class="current"><span>{{ values.calendar.year }}年{{ values.calendar.month }}月</span></div>
      <table>
         <thead>
            <tr>
               <th>日</th>
               <th>月</th>
               <th>火</th>
               <th>水</th>
               <th>木</th>
               <th>金</th>
               <th>土</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(week, key) in calendar">
               <td v-for="(date, idx) in week">
                  <div v-if="date.day != 'empty'" class="day">
                     <span>
                        {{ date.day }}
                     </span>
                     <span v-if="date.bin != 'no bin'" v-bind:class="'symbol ' + date.bin.color">
                        ●
                     </span>
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
         values: Object,
         calendar: Array
      }
   }
</script>
