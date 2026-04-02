<template>
  <main class="mcms-home mcms-home--furniture">
    <section class="band band-hero">
      <div class="mcms-inner cols-3">
        <div class="col-about">
          <h2 class="h2">{{ home.about.title }}</h2>
          <p class="lead">{{ home.about.lead }}</p>
          <p class="body">{{ home.about.body }}</p>
          <a class="cta" href="#about-more">{{ home.about.cta }}</a>
        </div>
        <div id="video" class="col-flag">
          <div class="flag">{{ home.videoBanner.label }}</div>
        </div>
        <div class="col-flag">
          <div class="flag">{{ home.contactBanner.label }}</div>
        </div>
      </div>
      <div class="mcms-inner mini">
        <span class="mini-tag">{{ home.aboutMini.label }}</span>
      </div>
    </section>

    <section id="products" class="band">
      <div class="mcms-inner">
        <h2 class="sec-title">{{ home.productKicker }}</h2>
        <p class="sec-lead">{{ home.productLead }}</p>
        <div class="grid-4">
          <article v-for="(p, i) in home.productTiles" :key="i" class="card">
            <div class="thumb">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3>{{ p.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section id="news" class="band band-alt">
      <div class="mcms-inner">
        <h2 class="sec-title">{{ home.newsKicker }}</h2>
        <p class="sec-lead">{{ home.newsLead }}</p>
        <ul class="news-list">
          <li v-for="(n, i) in home.newsItems" :key="i">
            <strong>{{ n.title }}</strong>
            <time>{{ n.date }}</time>
            <p>{{ n.excerpt }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="contact" class="band">
      <div class="mcms-inner contact-block">
        <h2 class="sec-title">{{ home.contactKicker }}</h2>
        <p class="online">{{ home.contactOnline }}</p>
        <p><a :href="`mailto:${c.contactPage.email}`">{{ c.contactPage.email }}</a></p>
        <p v-for="(ph, i) in c.contactPage.phones" :key="i">{{ ph }}</p>
      </div>
    </section>

    <footer class="mcms-ft">
      <div class="mcms-inner">
        <p>{{ c.footerCopyright }}</p>
        <p v-if="c.techSupport">{{ c.techSupport }}</p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.furniture

type Home = {
  about: { title: string; lead: string; body: string; cta: string }
  videoBanner: { label: string }
  contactBanner: { label: string }
  aboutMini: { label: string }
  productKicker: string
  productLead: string
  productTiles: { title: string; image: string }[]
  newsKicker: string
  newsLead: string
  newsItems: { title: string; date: string; excerpt: string }[]
  contactKicker: string
  contactOnline: string
}

const home = c.home as unknown as Home
</script>

<style lang="scss" scoped>
.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-home--furniture {
  background: #fff;
  color: #222;
  font-family: 'Microsoft YaHei', sans-serif;
}

.band {
  padding: 28px 0;
  border-bottom: 1px solid #eee;
}

.band-hero {
  background: #fafafa;
}

.band-alt {
  background: #f7f7f7;
}

.cols-3 {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.lead {
  color: #666;
  font-size: 13px;
  margin: 0 0 12px;
}

.body {
  line-height: 1.8;
  font-size: 14px;
  margin: 0 0 12px;
}

.cta {
  color: #c00;
  text-decoration: none;
  font-size: 14px;
}

.flag {
  background: #e8e8e8;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #555;
}

.mini {
  margin-top: 12px;
}

.mini-tag {
  font-size: 13px;
  color: #888;
}

.sec-title {
  margin: 0 0 8px;
  font-size: 22px;
}

.sec-lead {
  color: #777;
  font-size: 13px;
  margin: 0 0 20px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card h3 {
  font-size: 13px;
  font-weight: 500;
  margin: 8px 0 0;
}

.thumb {
  background: #eee;
  aspect-ratio: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.news-list {
  list-style: disc;
  padding-left: 20px;
  li {
    margin-bottom: 16px;
  }
  time {
    display: block;
    color: #999;
    font-size: 12px;
    margin: 4px 0;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    color: #444;
  }
}

.contact-block {
  .online {
    font-weight: 600;
    margin-bottom: 12px;
  }
}

.mcms-ft {
  background: #333;
  color: #bbb;
  padding: 24px 0;
  font-size: 13px;
  p {
    margin: 6px 0;
  }
}
</style>
