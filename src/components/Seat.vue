<template>
  <svg
    id="Layer_1"
    class="seat"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    v-contextmenu:contextmenu1
  >
    <path
      :class="classifier(idxr, idxc)"
      d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"
    />
    <path
      :class="classifier(idxr, idxc)"
      d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"
    />
    <path
      :class="classifier(idxr, idxc)"
      d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"
    />
    <path
      :class="classifier(idxr, idxc)"
      d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"
    />
    <path
      :class="classifier(idxr, idxc)"
      d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"
    />
    <text class="seat-label" x="25" y="55">{{ seat.seat_number }}</text>
  </svg>
  <v-contextmenu ref="contextmenu1">
    <v-contextmenu-item @click="makeSeatAGap">Make Seat A Gap</v-contextmenu-item>
    <v-contextmenu-item>Disable Seat</v-contextmenu-item>
    <v-contextmenu-item>Rename Seat</v-contextmenu-item>
  </v-contextmenu>
</template>

<script>
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

export default {
  directives: {
    contextmenu: directive,
  },

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
  },
  inject: ['makeGap'],
  props: {
    idxr: {
      type: Number,
      required: true,
    },
    idxc: {
      type: Number,
      required: true,
    },
    seat: {
      type: Object,
    },
  },
  methods: {
    classifier() {
      return "cls-ra";
    },
    makeSeatAGap(){
      this.makeGap(this.seat)
    }
  },
};
</script>

<style scoped>
.seat {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  cursor: pointer;
}
.seat-label {
  font-size: 23px;
  font-weight: 700;
  color: #333;
}
.cls-selected {
  fill: green;
  stroke: #000;
  stroke-miterlimit: 10;
}
.cls-ra {
  fill: #fff;
  stroke: rgb(155, 150, 150);
  stroke-miterlimit: 10;
  stroke-width: 2;
}
.cls-rb {
  fill: gray;
  stroke: #000;
  stroke-miterlimit: 10;
}
.cls-fa {
  fill: #fff;
  stroke: red;
  stroke-miterlimit: 10;
}
.cls-fb {
  fill: pink;
  stroke: red;
  stroke-miterlimit: 10;
}
.cls-ma {
  fill: #fff;
  stroke: blue;
  stroke-miterlimit: 10;
}
.cls-mb {
  fill: royalblue;
  stroke: blue;
  stroke-miterlimit: 10;
}
</style>