<template>
  <main class="mcms-home mcms-home--digital">
    <div class="mcms-inner layout">
      <aside id="products" class="sidebar">
        <h3 class="side-title">PRODUCTS</h3>
        <ul>
          <li v-for="(p, i) in home.sidebarProducts" :key="i">
            <strong>{{ p.title }}</strong>
            <p>{{ p.desc }}</p>
          </li>
        </ul>
      </aside>
      <div class="main">
        <section class="block">
          <h3 class="block-title">NEWS</h3>
          <article class="feat">
            <time>{{ home.newsFeature.date }}</time>
            <h2>{{ home.newsFeature.title }}</h2>
            <p>{{ home.newsFeature.excerpt }}</p>
            <a class="moreline" href="#">{{ home.newsFeature.more }}</a>
            <span class="more">{{ home.newsFeature.moreLabel }}</span>
          </article>
          <ul class="news-mini">
            <li v-for="(n, i) in home.newsList" :key="i">
              <span class="t">{{ n.title }}</span>
              <span class="e">{{ n.excerpt }}</span>
              <time>{{ n.date }}</time>
            </li>
          </ul>
        </section>

        <section id="about" class="block about">
          <h3 class="block-title">ABOUT US</h3>
          <h4 class="co">{{ home.aboutBlock.company }}</h4>
          <p class="lead">{{ home.aboutBlock.lead }}</p>
          <div class="contact-grid">
            <div>
              <h5>{{ home.aboutBlock.hotlineTitle }}</h5>
              <p v-for="(line, i) in home.aboutBlock.hotlineLines" :key="i">{{ line }}</p>
            </div>
            <div>
              <h5>{{ home.aboutBlock.emailTitle }}</h5>
              <p>{{ home.aboutBlock.email }}</p>
            </div>
            <div>
              <h5>{{ home.aboutBlock.addressTitle }}</h5>
              <p>{{ home.aboutBlock.address }}</p>
            </div>
            <div>
              <h5>{{ home.aboutBlock.followTitle }}</h5>
            </div>
          </div>
          <p class="links">{{ home.linksTitle }}</p>
          <p>
            <a
              v-for="(l, i) in c.contactPage.links || []"
              :key="i"
              :href="l.href"
              target="_blank"
              rel="noopener"
            >
              {{ l.label }}
            </a>
            <span v-if="c.contactPage.extra" class="plug">{{ c.contactPage.extra }}</span>
          </p>
        </section>
      </div>
    </div>
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

const c = MCMS_DEMO_TEMPLATES.digital
const home = c.home as Record<string, any>
</script>

<style lang="scss" scoped>
.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-home--digital {
  background: #fff;
  color: #222;
  padding-top: 16px;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  border: 1px solid #e5e5e5;
  padding: 12px;
  background: #fafafa;
  .side-title {
    margin: 0 0 12px;
    font-size: 16px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin-bottom: 16px;
    font-size: 12px;
    strong {
      display: block;
      margin-bottom: 6px;
      font-size: 13px;
    }
    p {
      margin: 0;
      line-height: 1.5;
      color: #555;
    }
  }
}

.block-title {
  margin: 0 0 12px;
  font-size: 16px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
  display: inline-block;
}

.feat {
  border: 1px solid #eee;
  padding: 16px;
  margin-bottom: 20px;
  time {
    color: #999;
    font-size: 12px;
  }
  h2 {
    margin: 8px 0;
    font-size: 18px;
  }
  p {
    font-size: 14px;
    line-height: 1.7;
    color: #444;
  }
  .moreline {
    display: block;
    margin-top: 8px;
    font-weight: 600;
  }
  .more {
    font-size: 12px;
    color: #888;
  }
}

.news-mini {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    border-bottom: 1px dashed #ddd;
    padding: 12px 0;
    font-size: 13px;
    .t {
      font-weight: 600;
      display: block;
    }
    .e {
      color: #666;
    }
    time {
      float: right;
      color: #999;
    }
  }
}

.about .co {
  margin: 12px 0 8px;
}

.lead {
  line-height: 1.8;
  font-size: 14px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
  h5 {
    margin: 0 0 6px;
    font-size: 13px;
    color: #666;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
}

.links {
  font-weight: 600;
  margin-bottom: 8px;
}

a {
  margin-right: 12px;
  color: #06c;
}

.plug {
  margin-left: 8px;
  color: #888;
  font-size: 13px;
}

.mcms-ft {
  background: #333;
  color: #bbb;
  padding: 20px 0;
  margin-top: 32px;
  font-size: 13px;
  p {
    margin: 6px 0;
  }
}
</style>
