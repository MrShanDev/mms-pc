<template>
  <main class="mcms-home mcms-home--shoes">
    <section class="hero">
      <el-carousel height="420px" arrow="hover" :interval="5000">
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
        <h2 class="line-title">{{ home.products.kicker }}</h2>
        <hr class="rule">
        <div class="grid-4">
          <article v-for="(p, i) in home.products.tiles" :key="i" class="tile">
            <div class="img-wrap">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3>{{ p.title }}</h3>
            <a class="cta" href="#">{{ p.cta }}</a>
          </article>
        </div>
      </div>
    </section>

    <section id="factory" class="band band-alt">
      <div class="mcms-inner">
        <h2 class="line-title">{{ home.factory.kicker }}</h2>
        <hr class="rule">
        <div class="grid-4">
          <article v-for="(p, i) in home.factory.tiles" :key="i" class="tile">
            <div class="img-wrap">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3>{{ p.title }}</h3>
            <a class="cta" href="#">{{ p.cta }}</a>
          </article>
        </div>
      </div>
    </section>

    <section id="brand" class="band">
      <div class="mcms-inner brand">
        <h2 class="line-title">{{ home.brand.kicker }}</h2>
        <hr class="rule">
        <p class="sub">{{ home.brand.sub }}</p>
        <h3 class="co">{{ home.brand.company }}</h3>
        <hr class="rule light">
        <p class="body">{{ home.brand.text }}</p>
      </div>
    </section>

    <section id="designer" class="band band-alt">
      <div class="mcms-inner">
        <h2 class="line-title">{{ home.designer.kicker }}</h2>
        <hr class="rule">
        <div class="designer-grid">
          <article v-for="(d, i) in home.designer.cards" :key="i" class="dcard">
            <h4>{{ d.role }}</h4>
            <p>{{ d.text }}</p>
            <span class="tag">{{ d.title }}</span>
          </article>
        </div>
      </div>
    </section>

    <section id="news" class="band faq">
      <div class="mcms-inner">
        <div v-for="(f, i) in home.faq" :key="i" class="faq-row">
          <h3>{{ f.q }}</h3>
          <article>
            <h4>{{ f.title }}</h4>
            <p>{{ f.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="contact-bar">
      <div class="mcms-inner bar">
        <a :href="`mailto:${home.contactBar.email}`">{{ home.contactBar.email }}</a>
        <div>
          <span>{{ home.contactBar.callTitle }}</span>
          <a :href="`tel:${home.contactBar.phone}`">{{ home.contactBar.phone }}</a>
        </div>
        <span>{{ home.contactBar.wechat }}</span>
      </div>
    </section>

    <footer class="mcms-ft">
      <div class="mcms-inner">
        <p>{{ c.footerCopyright }} <span v-if="c.techSupport">{{ c.techSupport }}</span></p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.shoes
const home = c.home as Record<string, any>
</script>

<style lang="scss" scoped>
.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-home--shoes {
  background: #fff;
  color: #111;
}

.slide {
  position: relative;
  height: 100%;
  background: #111;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cap {
    position: absolute;
    inset: auto 0 0 0;
    padding: 24px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
    color: #fff;
    h1 {
      margin: 0 0 8px;
      font-size: 26px;
    }
  }
}

.band {
  padding: 36px 0;
}
.band-alt {
  background: #f6f6f6;
}

.line-title {
  margin: 0;
  font-size: 22px;
  letter-spacing: 0.06em;
}

.rule {
  border: none;
  border-top: 1px solid #333;
  margin: 12px 0 24px;
}
.rule.light {
  border-top-color: #ccc;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tile {
  text-align: center;
  .img-wrap {
    background: #e8e8e8;
    aspect-ratio: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h3 {
    margin: 10px 0 6px;
    font-size: 14px;
  }
  .cta {
    font-size: 13px;
    color: #333;
  }
}

.brand {
  .sub {
    color: #888;
  }
  .co {
    margin: 12px 0;
  }
  .body {
    line-height: 1.85;
    color: #444;
  }
}

.designer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.dcard {
  border: 1px solid #e0e0e0;
  padding: 16px;
  background: #fff;
  h4 {
    margin: 0 0 8px;
  }
  p {
    font-size: 14px;
    line-height: 1.65;
    color: #555;
  }
  .tag {
    display: inline-block;
    margin-top: 8px;
    font-size: 12px;
    color: #888;
  }
}

.faq-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  margin-bottom: 28px;
  border-bottom: 1px solid #eee;
  padding-bottom: 24px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  h3 {
    margin: 0;
    font-size: 16px;
  }
  h4 {
    margin: 0 0 8px;
    font-size: 15px;
  }
}

.contact-bar {
  background: #eaeaea;
  padding: 20px 0;
  .bar {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    font-size: 14px;
  }
}

.mcms-ft {
  background: #2c2c2c;
  color: #aaa;
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
}
</style>
