<template>
  <v-dialog v-model="isModalOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>Добавить нового сотрудника</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="addEmployee">
          <v-text-field
            v-model="newEmployee.full_name"
            label="ФИО"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="newEmployee.inn"
            label="ИНН"
            :rules="[rules.required, rules.inn]"
            required
          ></v-text-field>
          <v-text-field
            v-model="newEmployee.address"
            label="Адрес"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="newEmployee.date_birth"
            label="Дата рождения (ДД.ММ.ГГГГ)"
            :rules="[rules.required, rules.dateFormat]"
            required
          ></v-text-field>
          <v-select
            v-model="newEmployee.type_contract"
            :items="contractTypes"
            item-text="title"
            item-value="id"
            label="Тип договора"
            :rules="[rules.required]"
            required
          ></v-select>
          <v-select
            v-model="newEmployee.gender"
            :items="genders"
            item-text="title"
            item-value="id"
            label="Пол"
            :rules="[rules.required]"
            required
          ></v-select>
          <v-select
            v-model="newEmployee.country"
            :items="countries"
            item-text="title"
            item-value="id"
            label="Гражданство"
            :rules="[rules.required]"
            required
          ></v-select>
          <v-select
            v-model="newEmployee.position"
            :items="positions"
            item-text="name"
            item-value="id"
            label="Должность"
            :rules="[rules.required]"
            required
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" type="submit" @click="addEmployee">
          Добавить
        </v-btn>
        <v-btn color="error" @click="closeModal">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import contractTypes from '../data/contractTypes';
import genders from '../data/genders';
import countries from '../data/countries';
import positions from '../data/positions';

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      isModalOpen: false,
      newEmployee: {
        full_name: '',
        inn: '',
        address: '',
        date_birth: '',
        type_contract: null,
        gender: null,
        country: null,
        position: null
      },
      contractTypes,
      genders,
      countries,
      positions,
      rules: {
        required: (value) => !!value || 'Это поле обязательно для заполнения.',
        inn: (value) => /^\d{10}$/.test(value) || 'ИНН должен состоять из 10 цифр',
        dateFormat: (value) => /^\d{2}\.\d{2}\.\d{4}$/.test(value) || 'Неверный формат даты'
      }
    };
  },
  computed: {
    isModalOpen: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    addEmployee() {
      if (this.valid) {
        const newEmployee = {
          full_name: this.newEmployee.full_name,
          inn: this.newEmployee.inn,
          address: this.newEmployee.address,
          date_birth: this.newEmployee.date_birth,
          age: this.calculateAge(this.newEmployee.date_birth),
          type_contract: this.contractTypes.find(
            (type) => type.id === this.newEmployee.type_contract
          ),
          type_contract_id: this.newEmployee.type_contract,
          gender: this.genders.find((gender) => gender.id === this.newEmployee.gender),
          gender_id: this.newEmployee.gender,
          country: this.countries.find((country) => country.id === this.newEmployee.country),
          country_id: this.newEmployee.country,
          position: this.positions.find((position) => position.id === this.newEmployee.position),
          position_id: this.newEmployee.position,
          status: {
            tag_id: 5,
            tag: { id: 5, title: 'Весь список', slug: 'ves-spisok', color: '#2196F3' },
            description: 'Прошел все процедуры'
          }
        };

        this.$emit('employee-added', newEmployee);
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('input', false);
      this.resetForm();
    },
    resetForm() {
      this.newEmployee = {
        full_name: '',
        inn: '',
        address: '',
        date_birth: '',
        type_contract: null,
        gender: null,
        country: null,
        position: null
      };
      this.valid = false;
    },
    calculateAge(dateString) {
      const today = new Date();
      const birthDate = new Date(dateString.split('.').reverse().join('-'));
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
      }
      return age;
    }
  }
};
</script>
