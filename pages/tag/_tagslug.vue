<template>
  <div>
    <!-- <AdsBlock class="mt-10" /> -->
    <div class="tag-block mt-2">
      <p class="tag-block__description">TAG</p>
      <h1>{{ tagName }}</h1>
    </div>
    <div id="content" class="mt-10"></div>
    <MainBlock @changePage="changePage" :posts="posts" :totalNews="total" :limit="limit" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// components
import AdsBlock from "../../components/CategoryPage/AdsBlock/AdsBlock.vue";
import MainBlock from "../../components/CategoryPage/MainBlock/MainBlock.vue";

export default {
  components: {
    AdsBlock,
    MainBlock
  },
  data() {
    return {
      skip: 0,
      limit: 10 //news per page,
    };
  },
  async asyncData(context) {
    const convertToAlias = str => {
      // Viết thường
      if (str && typeof str === "string") {
        str = str.toLowerCase();
        // Bỏ dấu
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Gộp nhiều dấu space thành 1 space
        str = str.replace(/\s+/g, " ");
        // Loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu
        str = str.replace(
          /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
          ""
        );
        str = str.trim();
        str = str.replace(/ /g, "-");
        return str;
      }
    };
    let tagName = context.route.params.tagslug;
    let tagNameAlias = convertToAlias(tagName);
    let posts = [];
    let total = 0;
    await context.store.dispatch("getArticleListing", {
      skip: 0,
      limit: 10,
      data: {
        tag: tagNameAlias
      },
      nextActions: res => {
        posts = res.result;
        total = res.total;
      },
      errorActions: err => {
        console.log(err);
      }
    });
    return {
      posts,
      total,
      tagName
    };
  },
  methods: {
    async changePage(p) {
      this.skip = this.limit * (p - 1);
      const id = this.$route.params.slug.slice(
        this.$route.params.slug.indexOf("=") + 1
      );
      await this.$store.dispatch("getArticleListing", {
        skip: this.skip,
        limit: this.limit,
        data: {
          tag: this.tagName
        },
        nextActions: res => {
          this.posts = res.result;
          this.total = res.total;
        },
        errorActions: err => {
          console.log(err);
        }
      });
      if (window.pageYOffset > 0) {
        let elmnt = document.getElementById("content");
        elmnt.scrollIntoView();
      }
    },
    convertToAlias(str) {
      // Viết thường
      if (str && typeof str === "string") {
        str = str.toLowerCase();
        // Bỏ dấu
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Gộp nhiều dấu space thành 1 space
        str = str.replace(/\s+/g, " ");
        // Loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu
        str = str.replace(
          /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
          ""
        );
        str = str.trim();
        str = str.replace(/ /g, "-");
        return str;
      }
    }
  }
};
</script>


<style scoped>
.tag-block {
  text-align: center;
}

.tag-block .tag-block__description {
  color: #919191;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}

.tag-block h1 {
  font-size: 41px;
  font-weight: 700;
  text-transform: none;
}
</style>