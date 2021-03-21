<template>
  <div class="author">
    <div class="author__avatar">
      <img src="@/assets/imgs/default.png" alt="avatar" />
    </div>
    <h3 class="author__name">Emilio Montes</h3>

    <a href="#" class="author__link" target="_blank">http://www.emilio-montes.com/</a>

    <p
      class="author__description mt-3"
    >Emilio Montes has worked a Pulses PRO since its launch in 2011. In the years since, he has led by example the company's tech news team and published over 5,000 articles — a mix of breaking news, reviews, helpful how-tos, industry analysis, and more.</p>

    <ul class="author__socials">
      <li class="author__socials-link">
        <a href target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
      </li>
      <li class="author__socials-link">
        <a href target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
      </li>
      <li class="author__socials-link">
        <a href target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.author {
  text-align: center;
}

.author__avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.author__avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.author__name {
  margin: 7px 0 8px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  color: #222;
  cursor: pointer;
}

.author__name:hover {
  color: var(--hovercolor);
}

.author__link {
  margin-bottom: 6px;
  font-size: 12px;
  font-style: italic;
  line-height: 21px;
  color: #444;
}

.author__link:hover {
  color: var(--hovercolor);
}

.author__description {
  font-size: 14px;
  line-height: 1.3;
}

.author__socials {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.author__socials-link {
  margin: 0 5px;
}

.author__socials-link:hover {
  opacity: 0.9;
}
</style>