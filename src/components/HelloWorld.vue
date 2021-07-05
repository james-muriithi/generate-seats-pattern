<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-5 py-5">
        <form-section></form-section>
      </div>
      <div class="col-sm-7 py-5">
        <seat-section
          :seats="seats"
          :cols="cols"
          :rows="rows"
          :aisleColumns="aisleColumns"
          :aisleRows="aisleRows"
          :disabledSeats="disabledSeats"
          :gaps="gaps"
        ></seat-section>
      </div>
    </div>
  </div>
</template>

<script>
import SeatSection from "./SeatSection.vue";
import FormSection from "./SeatLayoutForm.vue";
export default {
  components: {
    SeatSection,
    FormSection,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      set_prefix: "A",
      seats: [],
      cols: 5,
      rows: 13,
      aisleColumns: [2, 4],
      aisleRows: [5],
      gaps: [
        { row: 2, col: 1 },
        { row: 3, col: 1 },
      ],
      disabledSeats: [],
    };
  },
  methods: {
    generateSeats() {
      let seat_number = 1;
      for (let y = 1; y <= this.rows; ++y) {
        for (let x = 1; x <= this.cols; ++x) {
          if (!this.isAisle(x, y)) {
            this.seats.push({
              position: { r: y, c: x },
              status: "RA",
              seat_number: `${this.set_prefix}${seat_number}`,
            });
            seat_number++;
          }
        }
      }
    },
    isAisle(c, r) {
      if (this.gaps.length > 0) {
        if (this.gaps.some(({ row, col }) => row == r && col == c)) {
          return true;
        }
      }

      if (this.aisleColumns.some((column) => column == c)) {
        if (this.aisleRows.some((row) => row == r)) {
          return true;
        }
        if (r >= 1 && r <= this.rows - 1) {
          return true;
        }
      } else if (this.aisleRows.some((row) => row == r)) {
        return true;
      }
      return false;
    },
    makeGap(seat) {
      this.gaps.push({ row: seat.position.r, col: seat.position.c });
    },
    makeAisle(data) {
      if (data.target == "row") {
        this.aisleRows.push(data.index);
      } else {
        this.aisleColumns.push(data.index);
      }
    },
  },
  beforeMount() {
    this.generateSeats();
  },
};
</script>