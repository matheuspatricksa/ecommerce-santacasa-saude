<template>
  <div>
    <HeaderApp />
    <HeroSection />

    <main class="container mx-auto px-4 py-12">
      <div class="rounded-lg border border-gray-300 bg-gray-200 shadow-xl">
        <div class="w-full">
          <TabNavigation v-model="activeTab" />

          <!-- Tabela de planos -->
          <DataTable v-if="activeTab === 'plans'" title="Gerenciar Planos de Saúde"
            description="Adicione, edite ou remova planos de saúde" icon="mdi:shield-outline" add-button-text="Novo plano"
            :columns="planColumns" @add="planModal = 'plan'">
            <template #rows>
              <tr v-for="plan in plansAvailable" :key="plan.id" class="border-b border-gray-300">
                <td class="p-4 align-middle">{{ plan.name }}</td>
                <td class="p-4 align-middle truncate max-w-xs">{{ plan.description }}</td>
                <td class="p-4 align-middle">{{ plan.price }}</td>
                <td class="p-4 align align-middle">{{ plan.date }}</td>
                <td class="p-4 align-middle">
                  <div class="flex justify-end gap-2">
                    <button @click="openEditPlan(plan)"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                      <Icon icon="mdi:pencil-outline" width="24" height="24"
                        class="text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                    <button @click="deletePlan(plan.id)"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 bg-red-500 hover:bg-red-800 transition-colors">
                      <Icon icon="mdi:delete-outline" width="24" height="24" style="color: white;" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </DataTable>

          <!-- Tabela de clientes -->
          <DataTable v-if="activeTab === 'clients'" title="Gerenciar Clientes"
            description="Adicione, edite ou remova clientes do sistema" icon="mdi:user-multiple-outline"
            add-button-text="Novo Cliente" :columns="clientColumns" @add="clientModal = 'client'">
            <template #rows>
              <tr v-for="client in clients" :key="client.id" class="border-b border-gray-300">
                <td class="p-4 align-middle">{{ client.name }}</td>
                <td class="p-4 align-middle truncate max-w-xs">
                  <Icon icon="mdi:email-outline" width="16" height="16" class="inline-block mr-1 text-gray-400" />
                  <span>{{ client.email }}</span>
                </td>
                <td class="p-4 align align-middle">{{ client.date }}</td>
                <td class="p-4 align-middle">
                  <div class="flex justify-end gap-2">
                    <button @click="openEditClient(client)"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                      <Icon icon="mdi:pencil-outline" width="24" height="24"
                        class="text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                    <button @click="deleteClient(client.id)"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 bg-red-500 hover:bg-red-800 transition-colors">
                      <Icon icon="mdi:delete-outline" width="24" height="24" style="color: white;" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </DataTable>

          <!-- Tabela de compras -->
          <DataTable v-if="activeTab === 'purchases'" title="Gerenciar Compras"
            description="Registre e acompanhe as vendas de planos" icon="mdi:shopping-cart-outline"
            add-button-text="Nova Compra" :columns="purchaseColumns" @add="purchaseModal = 'purchase'">
            <template #rows>
              <tr v-for="purchase in purchases" :key="purchase.id" class="border-b border-gray-300">
                <td class="p-4 align-middle">
                  <p class="font-bold">{{ purchase.client }}</p>
                  <span class="text-xs text-gray-400">{{ purchase.email }}</span>
                </td>
                <td class="p-4 align-middle truncate max-w-xs">
                  {{ purchase.plan }}
                </td>
                <td class="p-4 align-middle">
                  <Icon icon="mdi:hashtag" width="16" height="16" style="color: gray;" class="inline-block mr-1" />
                  <span>{{ purchase.quantity }}</span>
                </td>
                <td class="p-4 align-middle">
                  <span class="text-green-600">{{ purchase.total }}</span>
                </td>
                <td class="p-4 align-middle">{{ purchase.date }}</td>
              </tr>
            </template>
          </DataTable>
        </div>
      </div>
    </main>

    <!-- Modal Adicionar e editar plano -->
    <ModalForm :show="planModal === 'plan' || planModal === 'editPlan'"
      :title="planModal === 'plan' ? 'Adicionar Plano' : 'Editar Plano'"
      :description="planModal === 'plan' ? 'Preencha os dados do novo plano de saúde' : 'Atualize os dados do plano'"
      @close="closeModal">
      <form @submit.prevent="planModal === 'plan' ? submitPlan() : editPlan()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Nome do Plano</label>
          <input v-if="planModal === 'plan'" v-model="newPlan.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do plano" required />
          <input v-else v-model="temporaryEditPlan.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do plano" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Preço (R$)</label>
          <input v-if="planModal === 'plan'" v-model="newPlan.price" type="number" step="0.01"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="0,00" required />
          <input v-else v-model="temporaryEditPlan.price" type="number" step="0.01"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="0,00" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Descrição</label>
          <textarea v-if="planModal === 'plan'" v-model="newPlan.description" rows="4"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff] resize-none"
            placeholder="Digite a descrição do plano" required></textarea>
          <textarea v-else v-model="temporaryEditPlan.description" rows="4"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff] resize-none"
            placeholder="Digite a descrição do plano" required></textarea>
        </div>

        <button type="submit"
          class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
          {{ planModal === 'plan' ? 'Adicionar' : 'Salvar Alterações' }}
        </button>
      </form>
    </ModalForm>

    <!-- Modal Adicionar e editar cliente -->
    <ModalForm :show="clientModal === 'client' || clientModal === 'editClient'"
      :title="clientModal === 'client' ? 'Adicionar Cliente' : 'Editar Cliente'"
      :description="clientModal === 'client' ? 'Preencha os dados do novo cliente' : 'Atualize os dados do cliente'"
      @close="closeModal">
      <form @submit.prevent="clientModal === 'client' ? submitClient() : editClient()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Nome</label>
          <input v-if="clientModal === 'client'" v-model="newClient.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do cliente" required />
          <input v-else v-model="temporaryEditClient.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do cliente" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">E-mail</label>
          <input v-if="clientModal === 'client'" v-model="newClient.email" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o e-mail do cliente" required />
          <input v-else v-model="temporaryEditClient.email" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o e-mail do cliente" required />
        </div>
        <button type="submit"
          class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
          {{ clientModal === 'client' ? 'Adicionar' : 'Salvar Alterações' }}
        </button>
      </form>
    </ModalForm>

    <!-- Modal Adicionar e listar compras -->
    <ModalForm :show="purchaseModal === 'purchase'" title="Registrar Compra"
      description="Preencha os dados da nova compra" @close="closeModal">
      <form @submit.prevent="submitPurchase" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Cliente</label>
          <div class="relative">
            <button @click.prevent="showClientDropdown = !showClientDropdown"
              class="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none focus:border-[#00bbff] bg-white">
              {{ selectedClient ? `${selectedClient.name} (${selectedClient.email})` : 'Selecione um cliente' }}
              <Icon icon="mdi:keyboard-arrow-down" width="16" height="16" style="color: gray;" />
            </button>
            <div v-if="showClientDropdown"
              class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <ul>
                <li v-for="client in clients" :key="client.email" @click="selectClient(client)" class="
                  px-4 py-2 cursor-pointer hover:bg-[#00f6ff]
                ">
                  {{ client.name }} ({{ client.email }})
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Plano</label>
          <div class="relative">
            <button @click.prevent="showPlanDropdown = !showPlanDropdown"
              class="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none focus:border-[#00bbff] bg-white">
              {{ selectedPlan ? `${selectedPlan.name} (${selectedPlan.price})` : 'Selecione um plano' }}
              <Icon icon="mdi:keyboard-arrow-down" width="16" height="16" style="color: gray;" />
            </button>
            <div v-if="showPlanDropdown"
              class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <ul>
                <li v-for="plan in plansAvailable" :key="plan.price" @click="selectPlan(plan)" class="
                  px-4 py-2 cursor-pointer hover:bg-[#00f6ff]
                ">
                  {{ plan.name }} ({{ plan.price }})
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-600">Quantidade</label>
            <input v-model="newPurchase.quantity" type="number"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]" required />
          </div>
        </div>

        <button type="submit"
          class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
          Adicionar
        </button>
      </form>
    </ModalForm>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import HeaderApp from '@/components/HeaderApp.vue';
import HeroSection from '@/components/HeroSection.vue';
import TabNavigation from '@/components/TabNavigation.vue';
import DataTable from '@/components/DataTable.vue';
import ModalForm from '@/components/ModalForm.vue';
import { usePlans } from '@/composables/usePlans.js';
import { useClients } from '@/composables/useClients.js';
import { usePurchases } from '@/composables/usePurchases.js';

const activeTab = ref('plans');

const {
  planModal,
  temporaryEdit: temporaryEditPlan,
  plansAvailable,
  planColumns,
  newPlan,
  loadPlans,
  openEditPlan,
  submitPlan,
  editPlan,
  deletePlan
} = usePlans();

const {
  clientModal,
  temporaryEdit: temporaryEditClient,
  clients,
  clientColumns,
  newClient,
  loadClients,
  openEditClient,
  submitClient,
  editClient,
  deleteClient
} = useClients();

const {
  purchaseModal,
  purchases,
  purchaseColumns,
  newPurchase,
  selectedClient,
  selectedPlan,
  showClientDropdown,
  showPlanDropdown,
  loadPurchases,
  selectClient,
  selectPlan,
  submitPurchase
} = usePurchases();

const closeModal = () => {
  planModal.value = '';
  clientModal.value = '';
  purchaseModal.value = '';
  temporaryEditPlan.value = null;
  temporaryEditClient.value = null;
};

onMounted(
  () => Promise.all([loadPlans(), loadClients(), loadPurchases()])
  );
</script>