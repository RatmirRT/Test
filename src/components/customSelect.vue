<template>
  <select v-model="selectedValue" @change="changeOptions">
    <option v-for="value in options" :key="value.Value" :value="value.Value">
      {{ value.Name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Option {
  Value: string | number
  Name: string
}

export default defineComponent({
  name: 'customSelect',
  props: {
    options: {
      type: Array as () => Option[],
      default: () => []
    },
    modelValue: {
      type: [String, Number]
    }
  },
  data() {
    return {
      selectedValue: this.modelValue
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedValue = newValue
    }
  },
  methods: {
    changeOptions() {
      this.$emit('update:modelValue', this.selectedValue)
    }
  }
})
</script>

<style scoped>
select {
  display: block;
  margin-top: 15px;
  background-color: transparent;
  color: var(--primary-color);
  font-weight: 500;
  font-size: 16px;
  border: 1px solid var(--primary-color);
  border-radius: 12px;
  padding: 10px 20px;
}
</style>
