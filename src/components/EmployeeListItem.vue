<template>
  <v-list-item-content>
    <v-list-item-title>{{ employee.full_name }}</v-list-item-title>
    <v-list-item-subtitle>
      ИНН {{ employee.inn }} {{ employee.type_contract.title }}
    </v-list-item-subtitle>
    <v-list-item-subtitle>{{ employee.position.name }}</v-list-item-subtitle>
    <div>
      <img :src="employee.country.icon" :alt="employee.country.title" />
      {{ employee.address }}
    </div>
    <div>
      Дата рождения: {{ employee.date_birth }} Возраст: {{ employee.age }} год
      Пол: {{ employee.gender.title }}
    </div>
    <v-chip :color="employee.status.tag.color">
      {{ employee.status.description }}
    </v-chip>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>