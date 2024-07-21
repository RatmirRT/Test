<template>
  <main>
    <div class="container">
      <div class="options_box">
        <label>
          Выберите тариф
          <custom-select v-model:modelValue="currency" :options="currencyList"></custom-select>
        </label>
        <label>
          Выберите валюту
          <custom-select v-model:modelValue="rate" :options="exchangeRates"></custom-select>
        </label>
        <label>
          Выберите период оплаты
          <custom-select v-model:modelValue="period" :options="rateList"></custom-select>
        </label>
      </div>
      <div class="content">
        <div class="content_box">
          <h3>
            Тариф <span>{{ currency }}</span>
          </h3>
          <p>
            Цена:
            <span>
              {{ price.toFixed(2) }}
              {{ currentValute }}</span
            >
          </p>
          <p class="discount" v-if="period === 'year' && currency === 'pro'">
            Экономия:
            <span
              >{{ (100 / rate).toFixed(2) }}
              {{ currentValute }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchRequest } from '@/services/fetch'
import customSelect from '@/components/customSelect.vue'

export default defineComponent({
  components: { customSelect },
  data() {
    return {
      rate: 0,
      currency: 'standart',
      period: 'month',
      exchangeRates: [] as {
        Name: string
        Value: number
      }[],
      currencyList: [
        {
          Name: 'Стандартный',
          Value: 'standart'
        },
        {
          Name: 'Продвинутый',
          Value: 'pro'
        }
      ],
      rateList: [
        {
          Name: 'месяц',
          Value: 'month'
        },
        {
          Name: 'год',
          Value: 'year'
        }
      ]
    }
  },
  computed: {
    price() {
      // Расчет стоимости за месяц и за год
      if (this.period === 'month') {
        if (this.currency === 'standart') {
          // ?
          return 100 / this.rate
        }
        return 150 / this.rate
      } else {
        if (this.currency === 'standart') {
          return 1000 / this.rate
        }
        return 1400 / this.rate
      }
    },
    currentValute() {
      if (this.rate === this.exchangeRates[0]?.Value) {
        return 'Тенге'
      } else {
        return 'Юаней'
      }
    }
  },
  mounted() {
    this.getExchangeRates()
  },
  methods: {
    async getExchangeRates() {
      // получение курса валют
      const url = 'daily_json.js'
      const result = await fetchRequest(url)
      this.exchangeRates.push(result.Valute.KZT)
      this.exchangeRates[0].Value = this.exchangeRates[0].Value / 100 // Здесь полученная валюта рассчитывается как 100 к 1
      this.exchangeRates.push(result.Valute.CNY)
      this.rate = this.exchangeRates[0].Value
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

:root {
  --primary-color: dodgerblue;
  font-family: sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.options_box {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 20px;
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 30px;
}

.content {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.content::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  z-index: 0;
  transform: rotate(-10deg);
}

.content::after {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background-color: aqua;
  z-index: 0;
  transform: rotate(30deg);
}

.content_box {
  background-color: #fff;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  border-radius: 50px;
  max-height: 200px;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
}

.content_box h3 {
  margin-bottom: 15px;
}

.content_box span,
.content_box span {
  color: var(--primary-color);
  text-transform: uppercase;
}

.content_box p:last-child {
  margin-top: 15px;
}

@media screen and (max-width: 1280px) {
  .container {
    padding: 0 20px;
  }
}

@media screen and (max-width: 800px) {
  .options_box {
    flex-direction: column;
    align-items: center;
  }

  .options_box select {
    margin: 15px auto 15px auto;
  }
}

@media screen and (max-width: 500px) {
  .content_box {
    width: 80%;
  }
}
</style>
