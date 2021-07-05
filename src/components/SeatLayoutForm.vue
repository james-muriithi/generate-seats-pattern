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
        <label for="" class="form-label">Aisle Colums</label>
        <input
          type="number"
          class="form-control"
          aria-describedby="emailHelp"
          autocomplete="off"
        />
      </div>
      <div class="col-12 mb-2">
        <label for="" class="form-label">Aisle Rows</label>
        <input
          type="number"
          class="form-control"
          aria-describedby="emailHelp"
          autocomplete="off"
        />
      </div>
    </div>

    <button type="button" class="btn btn-primary" @click="generate">
      Preview
    </button>
  </form>
</template>

<script>
export default {
  emits: ["generate"],
  data() {
    return {
      rows: "",
      cols: "",
    };
  },
  methods: {
      generate(){
          this.$emit('generate', {
              rows: this.rows,
              cols: this.cols,
          })
      }
  }
};
</script>