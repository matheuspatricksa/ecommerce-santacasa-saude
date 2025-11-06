<template>
  <div>
    <header class="flex flex-col items-center justify-center border-b border-gray-300 py-4">
      <img src="/logo.png" alt="Logo Santa Casa Saúde" />
      <p class="text-sm text-gray-400">Sistema de gerenciamento de planos de saúde</p>
    </header>

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
        <div
          class="flex flex-col items-center p-6 text-center border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-72 md:w-80 max-w-xs">
          <Icon icon="mdi:user-multiple-outline" width="40" height="40" style="color: #00bbff;" />
          <h3 class="font-semibold text-lg mb-1">Clientes</h3>
          <p class="text-sm text-gray-400">Gerencie sua base de clientes</p>
        </div>
        <div
          class="flex flex-col items-center p-6 text-center border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-72 md:w-80 max-w-xs">
          <Icon icon="mdi:shield-outline" width="40" height="40" style="color: #00bbff;" />
          <h3 class="font-semibold text-lg mb-1">Planos</h3>
          <p class="text-sm text-gray-400">Cadastre e edite planos de saúde</p>
        </div>
        <div
          class="flex flex-col items-center p-6 text-center border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-72 md:w-80 max-w-xs">
          <Icon icon="mdi:heart-outline" width="40" height="40" style="color: #00bbff;" />
          <h3 class="font-semibold text-lg mb-1">Compras</h3>
          <p class="text-sm text-gray-400">Registre e acompanhe vendas</p>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 py-12">
      <div class="rounded-lg border border-gray-300 bg-gray-200 shadow-xl">
        <div class="w-full">
          <div class="h-10 items-center justify-center rounded-md p-1 grid grid-cols-3 w-full">
            <button @click="activeTab = 'planos'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'planos' ? 'bg-white rounded-lg' : ''
            ]">
              <Icon icon="mdi:shield-outline" width="16" height="16" />
              <span>Planos</span>
            </button>
            <button @click="activeTab = 'clientes'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'clientes' ? 'bg-white' : '']">
              <Icon icon="mdi:user-multiple-outline" width="16" height="16" />
              <span>Clientes</span>
            </button>
            <button @click="activeTab = 'compras'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'compras' ? 'bg-white' : ''
            ]">
              <Icon icon="mdi:heart-outline" width="16" height="16" />
              <span>Compras</span>
            </button>
          </div>

          <!-- Tabela de planos -->
          <div v-if="activeTab === 'planos'" class="p-6 flex flex-col gap-4  bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:shield-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Planos de Saúde</h2>
                </div>
                <p class="text-gray-400">Adicione, edite ou remova planos de saúde</p>
              </div>
              <button
                class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#00bbff] text-white px-4 py-2 gap-2 hover:bg-[#0099cc] transition-colors duration-300">
                <Icon icon="mdi:plus" width="16" height="16" />
                <span>Novo plano</span>
              </button>
            </div>
            <div class="border border-gray-300 rounded-lg">
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="border-b border-gray-300">
                    <tr>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Nome do plano</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Descrição</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Preço</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Data de cadastro</th>
                      <th class="h-12 px-4 align-middle font-medium text-right text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="p-4 align-middle">Plano Básico Individual</td>
                      <td class="p-4 align-middle truncate max-w-xs">Plano de saúde ideal para pessoas que buscam
                        cobertura essencial com consultas e exames básicos.</td>
                      <td class="p-4 align-middle">R$ 189,90</td>
                      <td class="p-4 align align-middle">05/11/2025</td>
                      <td class="p-4 align-middle">
                        <div class="flex justify-end gap-2">
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                            <Icon icon="mdi:pencil-outline" width="24" height="24"
                              class="text-gray-600 group-hover:text-white transition-colors" />
                          </button>
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 bg-red-500 hover:bg-red-800 transition-colors">
                            <Icon icon="mdi:delete-outline" width="24" height="24" style="color: white;" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Tabela de clientes -->
          <div v-if="activeTab === 'clientes'" class="p-6 flex flex-col gap-4 bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:user-multiple-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Clientes</h2>
                </div>
                <p class="text-gray-400">Adicione, edite ou remova clientes do sistema</p>
              </div>
              <button
                class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#00bbff] text-white px-4 py-2 gap-2 hover:bg-[#0099cc] transition-colors duration-300">
                <Icon icon="mdi:plus" width="16" height="16" />
                <span>Novo Cliente</span>
              </button>
            </div>
            <div class="border border-gray-300 rounded-lg">
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="border-b border-gray-300">
                    <tr>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Nome</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">E-mail</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Data de cadastro</th>
                      <th class="h-12 px-4 align-middle font-medium text-right text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="p-4 align-middle">João Silva</td>
                      <td class="p-4 align-middle truncate max-w-xs">
                        <Icon icon="mdi:email-outline" width="16" height="16" class="inline-block mr-1 text-gray-400" />
                        <span>test@gmail.com</span>
                      </td>
                      <td class="p-4 align align-middle">05/11/2025</td>
                      <td class="p-4 align-middle">
                        <div class="flex justify-end gap-2">
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                            <Icon icon="mdi:pencil-outline" width="24" height="24"
                              class="text-gray-600 group-hover:text-white transition-colors" />
                          </button>
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 bg-red-500 hover:bg-red-800 transition-colors">
                            <Icon icon="mdi:delete-outline" width="24" height="24" style="color: white;" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Tabela de compras -->
          <div v-if="activeTab === 'compras'" class="p-6 flex flex-col gap-4 bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:shopping-cart-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Compras</h2>
                </div>
                <p class="text-gray-400">Registre e acompanhe as vendas de planos</p>
              </div>
              <button
                class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#00bbff] text-white px-4 py-2 gap-2 hover:bg-[#0099cc] transition-colors duration-300">
                <Icon icon="mdi:plus" width="16" height="16" />
                <span>Nova Compra</span>
              </button>
            </div>
            <div class="border border-gray-300 rounded-lg">
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="border-b border-gray-300">
                    <tr>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Cliente</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Plano</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Quantidade</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Valor total</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Data da compra</th>
                      <th class="h-12 px-4 align-middle font-medium text-right text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="p-4 align-middle">
                        <p class="font-bold">João Silva</p>
                        <span class="text-xs text-gray-400">joao.silva@gmail.com</span>
                      </td>
                      <td class="p-4 align-middle truncate max-w-xs">
                        Plano Premium Executivo
                      </td>
                      <td class="p-4 align-middle">
                        <Icon icon="mdi:hashtag" width="16" height="16" style="color: gray;"
                          class="inline-block mr-1" />
                        <span>2</span>
                      </td>
                      <td class="p-4 align-middle">
                        <span class="text-green-600">R$ 789,90</span>
                      </td>
                      <td class="p-4 align-middle">05/11/2025, 18:40</td>
                      <td class="p-4 align-middle">
                        <div class="flex justify-end gap-2">
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                            <Icon icon="mdi:pencil-outline" width="24" height="24"
                              class="text-gray-600 group-hover:text-white transition-colors" />
                          </button>
                          <button
                            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 bg-red-500 hover:bg-red-800 transition-colors">
                            <Icon icon="mdi:delete-outline" width="24" height="24" style="color: white;" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { Icon } from "@iconify/vue";

const activeTab = ref('planos');
</script>