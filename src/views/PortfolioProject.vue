<template>
  <section class="portfolio-project">
    <div class="left">
      <h1 class="title">{{ project.title }}</h1>

      <p class="subtitle">
        {{ project.shortDescription }}
      </p>

      <div class="stack">
        <span v-for="tech in project.stack" :key="tech" class="chip">
          {{ tech }}
        </span>
      </div>

      <a :href="project.link" target="_blank" class="btn-main">
        Смотреть проект →
      </a>
    </div>

    <div class="right">
      <div class="devices">
        <!-- desktop -->
        <div class="device device--browser">
          <svg viewBox="0 0 800 500" class="device__frame" aria-hidden="true">
            <rect width="800" height="500" rx="14" fill="#e3e3e3" />
            <rect y="44" width="800" height="456" fill="#ffffff" />

            <circle cx="22" cy="22" r="6" fill="#b0b0b0" />
            <circle cx="42" cy="22" r="6" fill="#b0b0b0" />
            <circle cx="62" cy="22" r="6" fill="#b0b0b0" />

            <rect x="760" y="16" width="18" height="3" fill="#b0b0b0" />
            <rect x="760" y="22" width="18" height="3" fill="#b0b0b0" />
            <rect x="760" y="28" width="18" height="3" fill="#b0b0b0" />
          </svg>
          <img
            class="device__img device__img--desktop"
            :src="project.desktopImg"
            alt="Desktop preview"
          />
        </div>

        <div class="device device--phone">
          <svg viewBox="0 0 250 500" class="device__frame" aria-hidden="true">
            <rect width="250" height="500" rx="32" fill="#e3e3e3" />
            <rect
              x="15"
              y="60"
              width="220"
              height="380"
              rx="22"
              fill="#ffffff"
            />
            <rect x="90" y="24" width="70" height="6" rx="3" fill="#b0b0b0" />
          </svg>
          <img
            class="device__img device__img--mobile"
            :src="project.mobileImg"
            alt="Mobile preview"
          />
        </div>
      </div>

      <router-link to="/portfolio" class="btn-back btn-main">
        ← В портфолио
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio-project {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 100vh;
  color: #fff;

  /* LEFT */
  .left {
    background: #1a1a1a;
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 28px;

    .title {
      font-size: 48px;
      line-height: 1.1;
    }

    .subtitle {
      max-width: 420px;
      line-height: 1.6;
      color: #b5b5b5;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .chip {
        padding: 6px 14px;
        font-size: 14px;
        border-radius: 999px;
        background: #2a2a2a;
        border: 1px solid #3a3a3a;
        transition: background 0.2s, border-color 0.2s;

        &:hover {
          background: #333;
          border-color: #555;
        }
      }
    }

    .btn-main {
      margin-top: 10px;
      width: fit-content;
    }
  }

  /* RIGHT */
  .right {
    background: #242424;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .devices {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .device {
        position: relative;

        &--browser {
          width: 100%;
          max-width: 680px;
        }

        &--phone {
          width: 240px;
          z-index: 2;
        }

        &__frame {
          width: 100%;
          height: auto;
          display: block;
        }

        &__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;

          &--desktop {
            padding: 44px 0 0;
          }

          &--mobile {
            padding: 60px 15px;
          }
        }
      }
    }

    .btn-back {
      margin-top: 40px;
      color: #aaa;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }

  /* TABLET */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    .left {
      padding: 60px 40px;
      text-align: center;
      align-items: center;

      .subtitle {
        max-width: 100%;
      }

      .stack {
        justify-content: center;
      }
    }

    .right {
      padding: 40px 20px;
    }
  }

  /* MOBILE */
  @media (max-width: 600px) {
    .left {
      padding: 40px 20px;

      .title {
        font-size: 32px;
      }
    }

    .right {
      .devices {
        .device {
          &--phone {
            width: 180px;
            margin-top: 40px;
          }
        }
      }
    }
  }
}
</style>


<script setup>
import { useRoute } from "vue-router";
import { portfolioData } from "../data/portfolio";

const route = useRoute();
const projectId = route.params.id;

// Найдём проект по id
const project = portfolioData.find((p) => p.id.toString() === projectId);

// Для красивых подписей типа проекта
const labels = {
  all: "Все",
  html: "Верстка",
  email: "Письма",
  vue: "Vue",
};
</script>
