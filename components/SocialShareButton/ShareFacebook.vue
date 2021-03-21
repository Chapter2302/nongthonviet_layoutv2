<template>
  <div
    class="fb-share-button"
    :data-href="link"
    data-layout="button"
    data-size="small"
  >
    <button class="shareBtn shareBtn-facebook">
      <a
        target="_blank"
        :href="`https://www.facebook.com/sharer/sharer.php?u=${link}`"
      >Chia sẻ</a>
    </button>
  </div>
</template>

<script>
export default {
  props : {
    link : {
      type : String,
      default : () => {
        return 'nongthon365.com.vn' //to do
      }
    }
  }
}
</script>

<style scoped>
.shareBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  /*margin: 0.2em;*/
  padding: 0 12px 0 48px;
  border: none;
  text-align: left;
  line-height: 30px;
  white-space: nowrap;
  border-radius: 0.2em;
  /*font-size: 16px;*/
  color: #fff;
}
.shareBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.shareBtn:focus {
  outline: none;
}
.shareBtn:active {
  box-shadow: inset 0 0 0 28px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.shareBtn-facebook {
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  text-shadow: 0 -1px 0 #354c8c;
}
.shareBtn-facebook:before {
  border-right: #364e92 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
    6px 6px no-repeat;
}
.shareBtn-facebook:hover,
.shareBtn-facebook:focus {
  background-color: #5b7bd5;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}
</style>
