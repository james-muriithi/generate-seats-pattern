<template>
  <div>
    <table class="mx-auto">
      <tr>
        <th></th>
        <table-header
          class="pb-2"
          v-for="(indexc, column) in cols"
          :key="column"
          style="width: 50px"
          :index="indexc"
          type="column"
          @makeAisle="makeAisle"
        >
        </table-header>
      </tr>

      <tr v-for="(indexr, row) in rows" :key="row">
        <table-header
          class="pl-2"
          style="width: 50px"
          :index="indexr"
          @makeAisle="makeAisle"
        ></table-header>
        <td
          class="pl-2"
          v-for="(indexc, column) in cols"
          :key="column"
          style="width: 50px; height: 50px;"
        >
          <seat
            :idxc="indexc"
            :idxr="indexr"
            :seat="getSeat(indexr, indexc)"
            v-if="!isAisle(indexc, indexr)"
            @makeGap="makeGap"
          ></seat>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Seat from "./Seat.vue";
import TableHeader from "./TableHeader.vue";
export default {
  components: {
    Seat,
    TableHeader,
  },
  data() {
    return {
      set_prefix: "A",
      seats: [],
      cols: 5,
      rows: 13,
      aisleColumns: [2, 4],
      aisleRows: [
        5
      ],
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
        if(this.aisleRows.some((row) => row == r)){
          return true;
        }
        if (r >= 1 && r <= this.rows - 1) {
          return true;
        }
      }else if(this.aisleRows.some((row) => row == r)) {
        return true;
      }
      return false;
    },
    makeGap(seat) {
      this.gaps.push({ row: seat.position.r, col: seat.position.c });
    },
    makeAisle(data){
      if (data.target == 'row') {
        this.aisleRows.push(data.index)
      }else{
        this.aisleColumns.push(data.index)
      }
    }
  },
  beforeMount() {
    this.generateSeats();
  },
};
</script>