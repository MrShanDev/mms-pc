<template>
  <main class="mcms-home mcms-home--apparel">
    <section class="hero">
      <el-carousel height="380px" arrow="hover" :interval="6000">
        <el-carousel-item v-for="(s, i) in home.slides" :key="i">
          <div class="slide">
            <img :src="s.image" :alt="s.title" loading="lazy">
            <div class="cap">
              <h1>{{ s.title }}</h1>
              <span class="more">{{ s.more }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section id="products" class="band">
      <div class="mcms-inner">
        <h2 class="kicker">{{ home.productKicker }}</h2>
        <p class="tags">
          <span v-for="(t, i) in home.productTags" :key="i">{{ t }}</span>
        </p>
        <div class="grid-3">
          <article v-for="(p, i) in home.productTiles" :key="i" class="tile">
            <img :src="p.image" :alt="p.title" loading="lazy">
            <h3>{{ p.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section id="brand" class="band band-gray">
      <div class="mcms-inner brand-row">
        <div class="brand-img">Image</div>
        <div>
          <h2>{{ home.brand.kicker }}</h2>
          <p>{{ home.brand.text }}</p>
        </div>
      </div>
    </section>

    <section id="blog" class="band">
      <div class="mcms-inner">
        <h2 class="kicker">{{ home.blog.kicker }}</h2>
        <div class="blog-grid">
          <article v-for="(b, i) in home.blog.items" :key="i" class="blog-card">
            <img :src="b.image" :alt="b.title" loading="lazy">
            <h3>{{ b.title }}</h3>
            <time>{{ b.date }}</time>
            <p>{{ b.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <footer class="ft">
      <div class="mcms-inner ft-cols">
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li v-for="(l, i) in home.footerCols.quickLinks" :key="i">{{ l }}</li>
          </ul>
        </div>
        <div>
          <h4>{{ home.footerCols.newsletter }}</h4>
          <p class="muted">Wechat scan QR code</p>
        </div>
      </div>
      <p class="copy">{{ c.footerCopyright }}</p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.apparel
const home = c.home as Record<string, any>
</script>

<style lang="scss" scoped>
.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-home--apparel {
  background: #fff;
  color: #111;
}

.slide {
  position: relative;
  height: 100%;
  background: #222;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }
  .cap {
    position: absolute;
    left: 24px;
    bottom: 24px;
    color: #fff;
    h1 {
      margin: 0 0 8px;
      font-size: 28px;
    }
    .more {
      text-decoration: underline;
    }
  }
}

.band {
  padding: 40px 0;
}
.band-gray {
  background: #f4f4f4;
}

.kicker {
  margin: 0 0 16px;
  font-size: 24px;
  letter-spacing: 0.04em;
}

.tags span {
  margin-right: 12px;
  color: #666;
  font-size: 14px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
}

.tile {
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background: #ddd;
  }
  h3 {
    margin: 10px 0 0;
    font-size: 15px;
  }
}

.brand-row {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  align-items: start;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  .brand-img {
    min-height: 200px;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
  p {
    line-height: 1.8;
    color: #444;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.blog-card {
  border: 1px solid #eee;
  padding: 12px;
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  h3 {
    font-size: 16px;
    margin: 12px 0 6px;
  }
  time {
    font-size: 12px;
    color: #999;
  }
  p {
    font-size: 14px;
    color: #555;
    margin: 8px 0 0;
  }
}

.ft {
  background: #2b2b2b;
  color: #ccc;
  padding: 32px 0 16px;
  .ft-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }
  h4 {
    color: #fff;
    margin: 0 0 12px;
  }
  ul {
    margin: 0;
    padding-left: 18px;
  }
  .muted {
    color: #888;
    font-size: 14px;
  }
  .copy {
    text-align: center;
    font-size: 12px;
    color: #777;
    margin: 0;
    padding-top: 16px;
    border-top: 1px solid #444;
  }
}
</style>
