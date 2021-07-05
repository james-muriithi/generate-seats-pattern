<template>
  <div>
    <table class="mx-auto" v-if="cols > 0 && rows > 0">
      <tr>
        <th></th>
        <table-header
          class="pb-2"
          v-for="(indexc, column) in cols"
          :key="column"
          style="width: 50px"
          :index="indexc"
          type="column"
        >
        </table-header>
      </tr>

      <tr v-for="(indexr, row) in rows" :key="row">
        <table-header
          class="pl-2"
          style="width: 50px"
          :index="indexr"
        ></table-header>
        <td
          class="pl-2"
          v-for="(indexc, column) in cols"
          :key="column"
          style="width: 50px; height: 50px"
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
import TableHeader from "./TableHeader.vue";
export default {
  components: {
    Seat,
    TableHeader,
  },
  props: {
    seats: {
      required: true,
      type: Array,
    },
    cols: {
      required: true,
      type: Number,
    },
    rows: {
      required: true,
      type: Number,
    },
    aisleColumns: {
      default: () => [],
      type: Array,
    },
    aisleRows: {
      default: () => [],
      type: Array,
    },
    gaps: {
      type: Array,
      default: () => [],
    },
    disabledSeats: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    getSeat(r, c) {
      const seat = this.seats.find((seat) => {
        return seat.position.r == r && seat.position.c == c;
      });

      return seat;
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
  },
};
</script>