<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 py-5">
        <form-section
          @generate="generateSeats"
          :aisleColumns="aisleColumns"
          :aisleRows="aisleRows"
          :gaps="gaps"
          :seatClasses="seatClasses"
        ></form-section>
      </div>
      <div class="col-sm-8 py-5">
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
    FormSection
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  provide() {
    return {
      makeGap: this.makeGap,
      makeAisle: this.makeAisle,
      renameSeat: this.renameSeat,
      getSeat: this.getSeatWithSeatNumber,
      removeAisleColumn: this.removeAisleColumn,
      removeAisleRow: this.removeAisleRow,
      getSeatWithRC: this.getSeat,
      removeGap: this.removeGap,
      disableSeat: this.disableSeat,
      seatClasses: this.seatClasses,
      changeSeatClass: this.changeSeatClass
    };
  },
  data() {
    return {
      seat_prefix: "",
      seats: [],
      cols: 0,
      rows: 0,
      aisleColumns: [],
      aisleRows: [],
      gaps: [],
      disabledSeats: [],
      defaultSeatClass: null,
      seatClasses: [
        {
          id: 1,
          name: "Normal",
          color: "blue"
        },
        {
          id: 2,
          name: "Economy",
          color: "green"
        },
        {
          id: 3,
          name: "VIP",
          color: "#f18b37"
        }
      ]
    };
  },
  methods: {
    getSeat(r, c) {
      return this.seats.find(seat => {
        return seat.position.r == r && seat.position.c == c;
      });
    },
    getSeatWithSeatNumber(seatNumber) {
      return this.seats.find(seat => {
        return seat.seat_number == seatNumber;
      });
    },
    generateSeats(data) {
      let seat_number = 1;
      // form data
      this.rows = parseInt(data.rows) || this.rows;
      this.cols = parseInt(data.cols) || this.cols;
      this.aisleColumns = data.aisleColumns || this.aisleColumns;
      this.seat_prefix =
        data.seat_prefix == "" ? "" : data.seat_prefix || this.seat_prefix;
      this.defaultSeatClass = data.defaultSeatClass || this.defaultSeatClass;

      this.seats = [];
      for (let y = 1; y <= this.rows; ++y) {
        for (let x = 1; x <= this.cols; ++x) {
          if (!this.isAisle(x, y)) {
            this.seats.push({
              position: { r: y, c: x },
              status: "RA",
              seat_number: `${this.seat_prefix}${seat_number}`,
              disabled: this.isDisabled(y, x),
              class: this.defaultSeatClass ?? null
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

      if (this.aisleColumns.some(column => column == c)) {
        if (this.aisleRows.some(row => row == r)) {
          return true;
        }
        if (r >= 1 && r <= this.rows - 1) {
          return true;
        }
      } else if (this.aisleRows.some(row => row == r)) {
        return true;
      }
      return false;
    },
    isDisabled(row, col) {
      return this.disabledSeats.some(
        ({ row: r, col: c }) => row == r && col == c
      );
    },
    disableSeat({ row, col }) {
      if (this.isDisabled(row, col)) {
        this.disabledSeats = this.disabledSeats.filter(
          ({ row: r, col: c }) => r != row || c != col
        );
      } else {
        this.disabledSeats.push({ row, col });
      }

      this.generateSeats({});
    },
    makeGap(seat) {
      this.gaps.push({ row: seat.position.r, col: seat.position.c });
      this.generateSeats({});
    },
    makeAisle(data) {
      if (data.target == "row") {
        this.aisleRows.push(data.index);
        this.generateSeats({});
      } else {
        this.aisleColumns.push(data.index);
        this.generateSeats({});
      }
    },
    renameSeat({ row, col, seat_number }) {
      let seat = this.getSeat(row, col);
      seat.seat_number = seat_number;
    },
    removeAisleColumn(col) {
      this.aisleColumns = this.aisleColumns.filter(column => column != col);
      this.generateSeats({});
    },
    removeAisleRow(row) {
      this.aisleRows = this.aisleRows.filter(r => r != row);
      this.generateSeats({});
    },
    removeGap({ row, col }) {
      this.gaps = this.gaps.filter(
        ({ row: r, col: c }) => r != row && c != col
      );
      this.generateSeats({});
    },
    changeSeatClass(seatNumber, classId) {
      let seat = this.getSeatWithSeatNumber(seatNumber);
      seat.class = this.getSeatClass(classId);
    },
    getSeatClass(id) {
      return this.seatClasses.find(seatClass => seatClass.id == id);
    }
  }
};
</script>
