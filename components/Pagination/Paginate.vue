<template>
  <div id="app" class="container">
    <ul class="items-list">
      <li v-for="(item,i) in displayedItems" class="item" :key="i" v-html="item"></li>
    </ul>

    <ul class="page">
      <li class="page__btn" :class="{'active' : (currentPage != 1)}" @click="currentPage--">
        <span class="material-icons">chevron_left</span>
      </li>

      <li class="page__numbers" @click="currentPage = 1" v-if="currentPage > 3">{{pages[0]}}</li>
      <li class="page__dots" v-if="currentPage > 3">...</li>

      <li
        class="page__numbers"
        v-for="(pageNumber,i) in displayedPages"
        :key="i"
        @click="currentPage = pageNumber"
        :class="{'active' : (currentPage === (pageNumber))}"
      >{{pageNumber}}</li>

      <li class="page__dots" v-if="currentPage < pages.length - 2">...</li>
      <li
        class="page__numbers"
        @click="currentPage = pages.length"
        v-if="currentPage < pages.length - 2"
      >{{pages[pages.length - 1]}}</li>

      <li
        class="page__btn"
        :class="{'active' : (currentPage < pages.length)}"
        @click="currentPage++"
      >
        <span class="material-icons">chevron_right</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 10,
      pages: [],
      icon: [
        "invert_colors",
        "label",
        "lock",
        "lock_open",
        "extension",
        "favorite",
        "home",
        "info",
        "language",
        "pets",
        "print",
        "receipt",
        "schedule",
        "search",
        "shopping_cart",
        "star_rate",
        "support",
        "thumb_up",
        "turned_in",
        "visibility",
        "work",
        "warning",
        "album",
        "loop",
        "mic",
        "videocam",
        "call",
        "business",
        "chat",
        "email",
        "location_on",
        "rss_feed",
        "vpn_key",
        "block",
        "content_copy",
        "content_cut",
        "link",
        "send",
        "save",
        "weekend",
        "access_alarm",
        "battery_full",
        "bluetooth",
        "devices",
        "sd_storage",
        "usb",
        "storage",
        "attach_money",
        "highlight",
        "insert_chart",
        "publish",
        "cloud",
        "attachment",
        "folder",
        "computer",
        "headset",
        "keyboard_arrow_down",
        "keyboard_arrow_left",
        "keyboard_arrow_up",
        "keyboard_arrow_right",
        "mouse",
        "audiotrack",
        "bedtime",
        "brush",
        "camera_alt",
        "color_lens",
        "colorize",
        "edit",
        "flash_on",
        "photo",
        "directions_bus",
        "flight",
        "fastfood",
        "layers",
        "local_cafe",
        "local_offer",
        "local_parking",
        "map",
        "restaurant",
        "apps",
        "check",
        "close",
        "more",
        "ac_unit",
        "spa",
        "smoking_rooms",
        "architecture",
        "cake",
        "luggage",
        "mood",
        "person",
        "school",
        "share",
        "sports_esports",
        "build",
        "code",
        "delete",
        "eco",
        "explore",
        "exit_to_app"
      ]
    };
  },
  methods: {
    // get the 100 items list
    getItems() {
      for (i = 0; i < 100; i++) {
        let template = `<span class="material-icons">${this.icon[i]}</span>
                <p>${i + 1}</p>`;
        this.items.push(template);
      }
    },
    // separate items per page.
    // Ex: Page 2 -> from item 11 to 20
    pagination(items) {
      let currentPage = this.currentPage;
      let perPage = this.perPage;

      let start = currentPage * perPage - perPage;
      let end = currentPage * perPage;

      return items.slice(start, end);
    },

    // generate number of pages
    setPages() {
      // N of items (100) / 10 items per page
      let numberOfPages = Math.ceil(this.items.length / this.perPage);

      //generate 10 pages (100 / 10)
      for (i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    }
  },
  computed: {
    // display the items per page
    displayedItems() {
      return this.pagination(this.items);
    },
    displayedPages() {
      // if currentPage is page 1
      if (this.currentPage === 1) {
        return this.pages.slice(this.currentPage - 1, this.currentPage + 4);
      }
      // if currentPage is the last page
      else if (this.currentPage === this.pages.length) {
        return this.pages.slice(this.currentPage - 5, this.currentPage + 1);
      }
      // if currentPage is between 4-7
      else if (this.currentPage >= 4 && this.currentPage <= 7) {
        return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
      }
      // if currentPage more than 7
      else if (this.currentPage > 7) {
        return this.pages.slice(this.currentPage - 4, this.currentPage + 1);
      }
      // if currentPage less than 4
      else {
        return this.pages.slice(this.currentPage - 2, this.currentPage + 3);
      }
    }
  },
  watch: {
    //how many pages to display
    items() {
      this.setPages();
    }
  },

  // create the array of items
  created() {
    this.getItems();
  }
};
</script>
<style lang="sass" scoped>
:root {
  --primary: #6b5bfd;
  --greyLight: #cdd5f7;
  --greyLight-2: #f8f9ff;
  --greyDark: #646b8a;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; // 1rem = 10px    100% = 16px
  overflow-y: scroll;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.6px;
  line-height: 1.4;
  -webkit-user-select: none;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--greyLight-2);
  color: var(--greyDark);
}

ul {
  list-style-type: none;
}

.items-list {
  max-width: 90vw;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3rem;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--greyDark);
  cursor: pointer;

  span {
    background: #ffffff;
    box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
    border-radius: 0.6rem;
    padding: 2rem;
    font-size: 3rem;
    transition: all 0.3s ease;
  }

  &:hover {
    span {
      transform: scale(1.2);
      color: var(--primary);
    }
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: var(--greyLight);
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 3rem;
  border-radius: 0.6rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);

  &__numbers,
  &__btn,
  &__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  &__dots {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--greyLight);
    cursor: initial;
  }

  &__numbers {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.4rem;

    &:hover {
      color: var(--primary);
    }

    &.active {
      color: #ffffff;
      background: var(--primary);
      font-weight: 600;
      border: 1px solid var(--primary);
    }
  }

  &__btn {
    color: var(--greyLight);
    pointer-events: none;

    &.active {
      color: var(--greyDark);
      pointer-events: initial;

      &:hover {
        color: var(--primary);
      }
    }
  }
}

</style>