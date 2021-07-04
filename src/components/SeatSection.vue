<template>
  <div>
    <table class="mx-auto">
      <tr v-for="(indexr, row) in rows" :key="row">
        <td
          class="pl-2"
          v-for="(indexc, column) in cols"
          :key="column"
          style="width: 50px"
        >
          <seat
            :idxc="indexc"
            :idxr="indexr"
            :seat="getSeat(indexr, indexc)"
            v-if="!isAisle(indexc, indexr)"
          ></seat>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Seat from "./Seat.vue";
export default {
  components: {
    Seat,
  },
  data() {
    return {
        set_prefix: 'A',
      seats: [],
      cols: 5,
      rows: 13,
      aisleColumns: [2, 4],
      aisleRows: [],
      gaps: [
        { row: 2, col: 1 },
        { row: 3, col: 1 },
      ],
      disabledSeats: [],
    };
  },
  methods: {
    getSeat(r, c) {
      const seat = this.seats.find((seat) => {
        return seat.position.r == r && seat.position.c == c;
      });

      return seat;
    },
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
        if (r >= 1 && r <= this.rows - 1) {
          return true;
        }
      }
      return false;
    },
  },
  beforeMount() {
    this.generateSeats();
  },
};
</script>