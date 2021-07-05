<template>
  <div class="container">
    <div class="row">
      <div class="col-5 py-5">
        
      </div>
      <div class="col-7 py-5">
          <seat-section></seat-section>
      </div>
    </div>
  </div>
</template>

<script>
import SeatSection from './SeatSection.vue'
export default {
  components: {
    SeatSection
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>