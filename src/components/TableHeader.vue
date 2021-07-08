<template>
  <th v-contextmenu:contextmenu2>
    {{ index }}
    <v-contextmenu ref="contextmenu2">
      <v-contextmenu-item @click="makeMyAisle" class="text-capitalize"
        >Make {{ type }} a Gap</v-contextmenu-item
      >
      <v-contextmenu-item @click="disableSeats"
        >Disable Seats</v-contextmenu-item
      >
    </v-contextmenu>
  </th>
</template>

<script>
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

export default {
  directives: {
    contextmenu: directive
  },
  inject: ["makeAisle"],
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  emits: ["disableSeats"],
  props: {
    index: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: "row"
    }
  },
  methods: {
    makeMyAisle() {
      let data = {
        index: this.index,
        target: this.type
      };

      this.makeAisle(data);
    },
    disableSeats() {
      this.$emit("disableSeats", {
        index: this.index,
        target: this.type
      });
    }
  }
};
</script>

<style scoped>
th {
  cursor: pointer;
}
</style>
