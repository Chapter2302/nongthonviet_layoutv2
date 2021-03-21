<template>
  <footer class="bg-black py-12 mt-10 text-white">
    <Container1440>
      <div class="grid grid-cols-12 gap-4 px-10">
        <!-- logo -->
        <div class="col-span-6 xs:col-span-12 xs:text-center">
          <!-- logo -->
          <nuxt-link to="/">
            <img
              src="@/assets/imgs/logotapchiwhite.png"
              style="max-width : 300px; width : 100%"
              alt
              class="xs:mx-auto"
            />
          </nuxt-link>
          <!-- socials -->
          <ul class="footer__logo--socials xs:justify-center">
            <li class="footer__logo--socials-item">
              <a href="#" class="footer__link">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="footer__logo--socials-item">
              <a href="#" class="footer__link">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li class="footer__logo--socials-item">
              <a href="#" class="footer__link">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="footer__logo--socials-item">
              <a href="#" class="footer__link">
                <i class="fab fa-vk"></i>
              </a>
            </li>
            <li class="footer__logo--socials-item">
              <a href="#" class="footer__link">
                <i class="fab fa-youtube"></i>
              </a>
            </li>
          </ul>
          <!-- description -->
          <p class="footer__logo--description">
            Cơ quan chủ quản: Tổng hội Nông nghiệp và Phát triển Nông thôn Việt Nam
            <br />Số giấy phép: 438/GP – BTTTT, cấp ngày 27/9/2016
            <br />Tổng Biên tập: Nguyễn Đức Quang
            <br />Phó tổng Biên tập thường trực: Nguyễn Thị Quốc Hương
            <br />Phó Tổng Biên tập: Nguyễn Mạnh Thường
            <br />Tòa soạn: Lầu 10, tòa nhà số 12 Võ Văn Kiệt, P. Nguyễn Thái Bình, Quận 1, TPHCM
            <br />Đường dây nóng: 093.205.6666
            <br />Điện thoại: (028) 3821 1283 - Fax: (028) 3914 7286
            <br />Email: toasoan@nongthonviet.com.vn
            <br />
          </p>
        </div>
        <!-- about  -->
        <div class="col-span-2 xs:col-span-12 xs:text-center">
          <h4 class="footer__block-title uppercase">Về chúng tôi</h4>
          <ul class="footer__about-sections">
            <li>
              <a href="#" class="footer__link">Về chúng tôi</a>
            </li>
            <li>
              <a href="#" class="footer__link">Magazine</a>
            </li>
            <li>
              <a href="#" class="footer__link">Liên hệ</a>
            </li>
          </ul>
        </div>

        <!-- popuplar category -->
        <div class="col-span-2 xs:col-span-12 xs:text-center">
          <h4 class="footer__block-title uppercase">Các chuyên mục</h4>

          <ul class="footer__category-list" v-if="categories.length">
            <li class="footer__category-list-item" v-for="(category,i)  in categories" :key="i">
              <nuxt-link :to="`/category/${category.alias}-id=${category.id}`" class="footer__link">
                <span>{{category.name}}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- picks -->
        <div class="col-span-2 xs:col-span-12 xs:text-center">
          <h4 class="footer__block-title uppercase">Tạp Chí Giấy</h4>
          <div>
            <img src="@/assets/imgs/tapchi.gif" style="width : 100%; max-width : 300px;" class="xs:mx-auto" alt />
          </div>
        </div>
      </div>
    </Container1440>
  </footer>
</template>

<script>
// components
import Container1440 from "../containers/Container1440.vue";

export default {
  components: {
    Container1440
  },
  data() {
    return {
    };
  },
  computed: {
    webname() {
      return process.env.Webname;
    }
  },
  props: {
    categories: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style>
.footer {
  width: 100%;
  position: relative;
  padding: 30px 0;

  /* background */
  background: url("../../assets/imgs/nongthon.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
}

.footer__link:hover {
  color: var(--hovercolor);
}

/* before */
.footer::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000000;
  opacity: 1;
  z-index: 1000;
  top: 0;
  left: 0;
}

.footer__block-title {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 31px;
  color: white;
  font-weight: 900;
}

/* container */
.footer__container {
  display: flex;
  flex-flow: column;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1001;
}

/* logo */
.footer__logo {
  text-align: center;
}

.footer__logo a {
  margin: 10px 0;
  font-size: 34px;
  text-transform: uppercase;
}

.footer__logo--description {
  font-size: 14px;
  line-height: 1.4;
  margin: 10px 0;
}

.footer__logo--socials {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.footer__logo--socials li {
  margin: 0 10px;
}

.footer__logo--socials li a {
  font-size: 12px;
}

/* about */

.footer__about {
  margin-top: 10px;
  margin-bottom: 32px;
}

.footer__about .footer__about-sections {
  text-align: center;
}

.footer__about-sections li {
  font-size: 12px;
  line-height: 24px;
  /*text-transform: uppercase;*/
  letter-spacing: 1px;
  font-weight: 700;
}

/* popular */
.footer__category {
  width: 100%;
  text-align: center;
}

.footer__category .footer__category-list {
  text-align: center;
}

.footer__category-list-item {
  font-size: 12px;
  line-height: 24px;
  /*text-transform: uppercase;*/
  letter-spacing: 1px;
  font-weight: 700;
}

/* picks */

.footer__pick-item {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
}

/* info */
.footer__pick {
  margin-top: 25px;
}

.footer__pick h4 {
  text-align: center;
}

.footer__pick-item .footer__pick-item--information {
  width: 84%;
}

.footer__pick-item--information .footer__pick-item--information-title {
  font-weight: bold;
  text-transform: capitalize;
}

.footer__pick-item--information .footer__pick-item--information-time {
  margin-top: 10px;
  font-style: italic;
}

/* image */
.footer__pick-item .footer__pick-item--img {
  width: 15%;
}

.footer__pick-item .footer__pick-item--img img {
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: 100%;
}

/* media queries */

@media (min-width: 767px) {
  .footer {
    padding-top: 60px;
    padding-bottom: 40px;
  }

  .footer__container {
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  /* logo */
  .footer__logo a {
    font-size: 38px;
    font-weight: 500;
    line-height: 1.1;
  }

  /* .footer__logo--socials {
    justify-content: flex-start;
  } */

  /* about */
  .footer__about {
    margin-top: 0;
  }

  .footer__about .footer__about-sections {
    text-align: left;
  }

  /* popular */
  .footer__category {
    text-align: left;
    margin-right: 40px;
  }

  .footer__category .footer__category-list {
    text-align: left;
  }

  /* pícks */
  .footer__pick {
    margin: 0;
  }

  .footer__pick h4 {
    text-align: left;
  }

  .footer__pick-item .footer__pick-item--information {
    width: 73%;
  }

  .footer__pick-item .footer__pick-item--img {
    width: 25%;
  }
}

/* tablet */
@media (min-width: 767px) and (max-width: 1018px) {
  .footer__container .footer__container-item {
    width: 23%;
    margin-right: 0;
  }

  .footer__container .footer__container-item.footer__empty {
    display: none;
  }

  .footer__block-title {
    font-size: 16px;
  }

  .footer__link {
    font-size: 12px;
  }

  .footer__pick-item .footer__pick-item--img img {
    height: 55%;
  }
}

@media (min-width: 1019px) {
  .footer__pick-item .footer__pick-item--img img {
    height: 65%;
  }
}
</style>
