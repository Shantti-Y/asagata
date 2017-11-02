<template>
   <div id="description">
      <ul>
         <li v-for="bin in bins"><span class="symbol" v-bind:class="bin.color">{{ bin.type }}</span></li>
      </ul>
   </div>
</template>
<script>
   export default {
      props: { bins: Array }
   }
</script>
