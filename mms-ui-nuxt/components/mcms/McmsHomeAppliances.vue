<template>
  <main class="mcms-home mcms-home--appliances">
    <section class="hero-mini">
      <el-carousel height="300px" :interval="6000" arrow="hover">
        <el-carousel-item v-for="(s, i) in home.slides" :key="i">
          <div class="slide ph">
            <img :src="s.image" :alt="s.title" loading="lazy">
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section id="products" class="band">
      <div class="mcms-inner">
        <h2 class="sec-h">{{ home.productKicker }}</h2>
        <div class="prod-grid">
          <article v-for="(p, i) in home.productTiles" :key="i" class="pitem">
            <div class="ph">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3>{{ p.title }}</h3>
            <p class="sub">{{ p.subtitle }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="news" class="band bg">
      <div class="mcms-inner">
        <h2 class="sec-h">{{ home.newsKicker }}</h2>
        <div class="news-block">
          <article v-for="(n, i) in home.newsItems" :key="i" class="nitem">
            <h3>{{ n.title }}</h3>
            <time>{{ n.date }}</time>
            <p>{{ n.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="case" class="band">
      <div class="mcms-inner">
        <h2 class="sec-h">{{ home.caseKicker }}</h2>
        <div class="case-grid">
          <article v-for="(p, i) in home.caseTiles" :key="i" class="citem">
            <div class="ph">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3>{{ p.title }}</h3>
            <p class="sub">{{ p.subtitle }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="download" class="band">
      <div class="mcms-inner">
        <h2 class="sec-h">Download</h2>
        <p class="dl-hint">Help documentation · File download</p>
      </div>
    </section>

    <section id="contact" class="band bg">
      <div class="mcms-inner contact">
        <h2 class="sec-h">{{ home.contact.kicker }}</h2>
        <div class="grid">
          <div>
            <h4>{{ home.contact.addressLabel }}</h4>
            <p>{{ home.contact.address }}</p>
          </div>
          <div>
            <h4>{{ home.contact.phonesLabel }}</h4>
            <p v-for="(ph, i) in home.contact.phones" :key="i">{{ ph }}</p>
          </div>
          <div>
            <h4>{{ home.contact.emailLabel }}</h4>
            <p>{{ home.contact.email }}</p>
          </div>
          <div>
            <h4>{{ home.contact.linkLabel }}</h4>
            <p>{{ home.contact.linkText }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="mcms-ft">
      <div class="mcms-inner">
        <p>{{ c.footerCopyright }}</p>
        <div class="dock">
          <span>Menu</span>
          <span>Top</span>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.appliances
const home = c.home as Record<string, any>
</script>

<style lang="scss" scoped>
.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-home--appliances {
  background: #fff;
  color: #222;
}

.slide.ph {
  height: 100%;
  background: #333;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.band {
  padding: 32px 0;
}
.bg {
  background: #f5f5f5;
}

.sec-h {
  margin: 0 0 20px;
  font-size: 22px;
  border-left: 4px solid #2c2c2c;
  padding-left: 12px;
}

.prod-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pitem {
  border: 1px solid #e5e5e5;
  padding: 10px;
  background: #fff;
  .ph {
    aspect-ratio: 4/3;
    background: #ddd;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h3 {
    margin: 10px 0 4px;
    font-size: 14px;
  }
  .sub {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
}

.news-block {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.nitem {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 16px;
  h3 {
    margin: 0 0 8px;
    font-size: 15px;
  }
  time {
    font-size: 12px;
    color: #999;
  }
  p {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: #555;
  }
}

.dl-hint {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.citem {
  text-align: center;
  .ph {
    aspect-ratio: 16/10;
    background: #ddd;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h3 {
    margin: 10px 0 4px;
    font-size: 14px;
  }
}

.contact .grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  h4 {
    margin: 0 0 8px;
    font-size: 13px;
    color: #666;
  }
}

.mcms-ft {
  background: #3a3a3a;
  color: #ccc;
  padding: 16px 0;
  font-size: 12px;
  .dock {
    margin-top: 8px;
    display: flex;
    gap: 16px;
    justify-content: center;
    color: #999;
  }
}
</style>
