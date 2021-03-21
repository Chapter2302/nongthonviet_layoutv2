<template>
  <div>
    <!-- <div class="pagination">
      <div class="pagination__items" v-for="(page,i) in shortTotalPages" :key="i">
        <div
          :class="`${current === page ? 'active': ''} ${page !== '...' ? 'pagination__items-item' : 'pagination__items-item-none'}` "
          @click="choosePage(page)"
        >{{page}}</div>
      </div>
      <div
        class="pagination__items-item"
        :class="current === totalPages ? 'disable' : ''"
        @click="[current += 1, $emit('changePage', current)]"
      >
        <i class="fas fa-angle-right"></i>
      </div>
    </div>-->
    <ul class="page ssss">
      <li class="page__btn" :class="{'active' : (currentPage != 1)}" @click="currentPage--">
        <span class="material-icons">
          <i class="fas fa-angle-left"></i>
        </span>
      </li>

      <li class="page__numbers" @click="currentPage = 1" v-if="currentPage > 3">{{pages[0]}}</li>
      <li class="page__dots" v-if="currentPage > 3">...</li>

      <li
        class="page__numbers"
        :key="i"
        v-for="(pageNumber, i) in displayedPages"
        @click="currentPage = pageNumber"
        :class="{'active' : currentPage == pageNumber}"
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
        <span class="material-icons">
          <i class="fas fa-angle-right"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    totalNews: {
      type: Number
    },
    limit: {
      type: Number
    },
    currentPageProp: {
      default: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalNews / this.limit);
    }
  },
  data() {
    return {
      currentPage: 1,
      pages: []
    };
  },
  created() {
    let numberOfPages = Math.ceil(this.totalNews / this.limit);
    for (let i = 1; i <= numberOfPages; i++) {
      this.pages.push(i);
    }
    this.currentPage = Number(this.currentPageProp);
  },
  computed: {
    // display the items per page
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
    currentPage: {
      handler(val, oldVal) {
        this.$emit("changePage", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
    background: grey;
    box-shadow: 0 0.5rem 2rem rgba(#5a6181, 0.05);
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
@media (max-width: 767px) {
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    margin: 2rem;
    border-radius: 0.6rem;
    //box-shadow: 0 0.5rem 2rem rgba(#5a6181, 0.05);

    &__numbers,
    &__btn,
    &__dots {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      font-size: 1rem;
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
      //border: 1px solid #dcdcdc;

      &.active {
        //background: var(--maincolor);
        color: var(--maincolor);
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
          color: var(--maincolor);
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    margin: 2rem;
    border-radius: 0.6rem;
    //box-shadow: 0 0.5rem 2rem rgba(#5a6181, 0.05);

    &__numbers,
    &__btn,
    &__dots {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      font-size: 1rem;
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
      border: 1px solid #dcdcdc;

      &:hover {
        border: 1px solid var(--maincolor);
      }

      &.active {
        background: var(--maincolor);
        color: white;
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
          color: var(--maincolor);
        }
      }
    }
  }
}
</style>
<style scoped>
.disable {
  color: rgb(219, 219, 219) !important;
  pointer-events: none;
}
.pagination {
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
}

.pagination__items {
  display: flex;
}

.pagination__items-item {
  padding: 10px 14px;
  background: white;
  margin-right: 8px;
  color: #666;
  line-height: 21px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
  transition: 0.4s ease;
}
.pagination__items-item-none {
  padding: 10px 14px;
  background: white;
  margin-right: 8px;
  color: #666;
  line-height: 21px;
  border: 1px solid #e3e3e3;
  transition: 0.4s ease;
}

.pagination__items-item.active {
  background: var(--maincolor);
  color: white;
}

.pagination__items-item:hover {
  background: var(--maincolor);
  color: white;
}

.pagination__text {
  color: #666;
  line-height: 21px;
  font-size: 12px;
}

@media (max-width: 767px) {
  .pagination__text {
    display: none;
  }
}

@media (max-width: 1018px) and (min-width: 768px) {
  .pagination__text {
    display: none;
  }
}
</style>