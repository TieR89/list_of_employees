<template>
  <v-card>
    <v-card-title>Фильтр</v-card-title>
    <v-card-text>
      <div>
        <label>Гражданство</label>
        <v-select v-model="selectedCountry" :items="countries" item-text="title" return-object>
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-title>Все страны</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <div>
        <label>Пол</label>
        <v-select v-model="selectedGender" :items="genders" item-text="title" return-object>
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-title>Без разницы</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <div>
        <label>Должность</label>
        <v-select v-model="selectedPosition" :items="positions" item-text="name" return-object>
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-title>Все должности</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <div>
        <label>Тип договора</label>
        <v-select
          v-model="selectedContractTypes"
          :items="contractTypes"
          item-text="title"
          return-object
          multiple
        ></v-select>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="applyFilters">Применить</v-btn>
      <v-btn @click="clearFilters">Очистить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import countries from '../data/countries';
import genders from '../data/genders';
import positions from '../data/positions';
import contractTypes from '../data/contractTypes';
import filterEmployees from '../utils/filterEmployees';

export default {
  data() {
    return {
      countries,
      genders,
      positions,
      contractTypes,
      selectedCountry: null,
      selectedGender: null,
      selectedPosition: null,
      selectedContractTypes: []
    };
  },
  methods: {
    applyFilters() {
      const filters = {
        country: this.selectedCountry,
        gender: this.selectedGender,
        position: this.selectedPosition,
        contractTypes: this.selectedContractTypes
      };

      // Применить фильтрацию к списку сотрудников
      this.filteredEmployees = filterEmployees(this.employees, filters);

      // Обработать отфильтрованный список сотрудников (например, обновить в родительском компоненте)
      this.$emit('apply-filters', filters);
    },
    clearFilters() {
      this.selectedCountry = null;
      this.selectedGender = null;
      this.selectedPosition = null;
      this.selectedContractTypes = [];
    }
  }
};
</script>
