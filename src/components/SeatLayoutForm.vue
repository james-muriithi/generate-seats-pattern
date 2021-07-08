<template>
  <form class="text-start">
    <div class="row mb-4">
      <div class="col-6 mb-2">
        <label for="" class="form-label">Rows</label>
        <input
          type="number"
          class="form-control"
          aria-describedby="emailHelp"
          autocomplete="off"
          v-model="rows"
        />
      </div>
      <div class="col-6 mb-2">
        <label for="" class="form-label">Columns</label>
        <input
          type="number"
          class="form-control"
          aria-describedby="emailHelp"
          autocomplete="off"
          v-model="cols"
        />
      </div>
      <div class="col-12 mb-2">
        <label for="" class="form-label">Default Seat class</label>
        <select class="form-control" v-model="defaultSeatClass">
          <option
            :value="seatClass.id"
            v-for="seatClass in seatClasses"
            :key="seatClass.id"
          >
            {{ seatClass.name }}
          </option>
        </select>
      </div>
      <div class="col-12 mb-2">
        <label for="" class="form-label">Seat Number Prefix (optional)</label>
        <input
          type="text"
          class="form-control"
          v-model="seat_prefix"
          autocomplete="off"
        />
      </div>
    </div>

    <button type="button" class="btn btn-primary" @click="generate">
      Preview
    </button>
    <div class="mt-3">
      <div class="mb-1" v-if="gaps.length > 0">
        <p class="mb-1">Removed Seats</p>
        <material-chip
          v-for="gap in gaps"
          :text="`Col ${gap.col} Row ${gap.row}`"
          :index="gap"
          :key="gap"
          @remove="removeGap(gap)"
        />
      </div>
      <div class="mb-1" v-if="aisleColumns.length > 0">
        <p class="mb-1">Aisle Columns</p>
        <material-chip
          v-for="col in aisleColumns"
          :text="`Column ${col}`"
          :index="col"
          :key="col"
          @remove="removeAisleColumn(col)"
        />
      </div>

      <!-- aisle rows -->
      <div class="" v-if="aisleRows.length > 0">
        <p class="mb-1">Aisle Rows</p>
        <material-chip
          v-for="row in aisleRows"
          :text="`Row ${row}`"
          :index="row"
          :key="row"
          @remove="removeAisleRow(row)"
        />
      </div>
    </div>
  </form>
</template>

<script>
import MaterialChip from "./UI/MaterialChip.vue";
export default {
  components: { MaterialChip },
  emits: ["generate"],
  inject: ["removeAisleColumn", "removeAisleRow", "removeGap"],
  props: {
    aisleColumns: {
      default: () => [],
      type: Array
    },
    aisleRows: {
      default: () => [],
      type: Array
    },
    gaps: {
      type: Array,
      default: () => []
    },
    disabledSeats: {
      default: () => [],
      type: Array
    },
    seatClasses: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rows: "",
      cols: "",
      seat_prefix: "",
      defaultSeatClass: "1"
    };
  },
  methods: {
    generate() {
      this.$emit("generate", {
        rows: this.rows,
        cols: this.cols,
        seat_prefix: this.seat_prefix,
        defaultSeatClass: this.getSeatClass(this.defaultSeatClass)
      });
    },
    getSeatClass(id) {
      return this.seatClasses.find(seatClass => seatClass.id == id);
    }
  }
};
</script>
