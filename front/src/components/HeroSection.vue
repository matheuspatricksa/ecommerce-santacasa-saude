<template>
  <section class="flex flex-col items-center text-center gap-2 p-6">
    <div class="flex items-center gap-2 bg-[#85ffff3b] px-3 py-2 rounded-4xl">
      <Icon icon="mdi:heart-outline" width="16" height="16" style="color: #00bbff;" />
      <p class="text-[#00bbff]">Cuidando da sua saúde</p>
    </div>

    <h2 class="text-4xl md:text-5xl font-bold mb-4 text-[#00bbff]">
      Planos de Saúde Personalizados
    </h2>
    <p class="text-lg mb-8 text-gray-400">
      Gerencie clientes, planos e compras de forma simples e eficiente
    </p>

    <div class="flex flex-wrap justify-center gap-6 w-full">
      <div v-for="feature in features" :key="feature.title"
        class="flex flex-col items-center p-6 text-center border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-72 md:w-80 max-w-xs">
        <Icon :icon="feature.icon" width="40" height="40" style="color: #00bbff;" />
        <h3 class="font-semibold text-lg mb-1">{{ feature.title }}</h3>
        <p class="text-sm text-gray-400">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const features = [
  {
    icon: "mdi:user-multiple-outline",
    title: "Clientes",
    description: "Gerencie sua base de clientes"
  },
  {
    icon: "mdi:shield-outline",
    title: "Planos",
    description: "Cadastre e edite planos de saúde"
  },
  {
    icon: "mdi:heart-outline",
    title: "Compras",
    description: "Registre e acompanhe vendas"
  }
];
</script>
