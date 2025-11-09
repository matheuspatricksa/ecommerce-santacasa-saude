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
            :columns="planColumns" @add="showModal = 'plan'">
            <template #rows>
              <tr v-for="plan in plansAvailable" :key="plan.id" class="border-b border-gray-300">
                <td class="p-4 align-middle">{{ plan.name }}</td>
                <td class="p-4 align-middle truncate max-w-xs">{{ plan.description }}</td>
                <td class="p-4 align-middle">{{ plan.price }}</td>
                <td class="p-4 align align-middle">{{ plan.date }}</td>
                <td class="p-4 align-middle">
                  <div class="flex justify-end gap-2">
                    <button @click="openEditModal(plan, 'editPlan')"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                      <Icon icon="mdi:pencil-outline" width="24" height="24"
                        class="text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                    <button @click="deleteItem(plan.id, 'plan')"
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
            add-button-text="Novo Cliente" :columns="clientColumns" @add="showModal = 'client'">
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
                    <button @click="openEditModal(client, 'editClient')"
                      class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 w-10 border border-gray-300 hover:bg-[#0099cc] group transition-colors">
                      <Icon icon="mdi:pencil-outline" width="24" height="24"
                        class="text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                    <button @click="deleteItem(client.id, 'client')"
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
            add-button-text="Nova Compra" :columns="purchaseColumns" @add="showModal = 'purchase'">
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
    <ModalForm :show="showModal === 'plan' || showModal === 'editPlan'"
      :title="showModal === 'plan' ? 'Adicionar Plano' : 'Editar Plano'"
      :description="showModal === 'plan' ? 'Preencha os dados do novo plano de saúde' : 'Atualize os dados do plano'"
      @close="closeModal">
      <form @submit.prevent="showModal === 'plan' ? handleSubmit() : editMode()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Nome do Plano</label>
          <input v-if="showModal === 'plan'" v-model="newPlan.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do plano" required />
          <input v-else v-model="temporaryEdit.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do plano" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Preço (R$)</label>
          <input v-if="showModal === 'plan'" v-model="newPlan.price" type="number" step="0.01"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="0,00" required />
          <input v-else v-model="temporaryEdit.price" type="number" step="0.01"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="0,00" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Descrição</label>
          <textarea v-if="showModal === 'plan'" v-model="newPlan.description" rows="4"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff] resize-none"
            placeholder="Digite a descrição do plano" required></textarea>
          <textarea v-else v-model="temporaryEdit.description" rows="4"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff] resize-none"
            placeholder="Digite a descrição do plano" required></textarea>
        </div>

        <button type="submit"
          class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
          {{ showModal === 'plan' ? 'Adicionar' : 'Salvar Alterações' }}
        </button>
      </form>
    </ModalForm>

    <!-- Modal Adicionar e editar cliente -->
    <ModalForm :show="showModal === 'client' || showModal === 'editClient'"
      :title="showModal === 'client' ? 'Adicionar Cliente' : 'Editar Cliente'"
      :description="showModal === 'client' ? 'Preencha os dados do novo cliente' : 'Atualize os dados do cliente'"
      @close="closeModal">
      <form @submit.prevent="showModal === 'client' ? handleSubmit() : editMode()" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">Nome</label>
          <input v-if="showModal === 'client'" v-model="newClient.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do cliente" required />
          <input v-else v-model="temporaryEdit.name" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o nome do cliente" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">E-mail</label>
          <input v-if="showModal === 'client'" v-model="newClient.email" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o e-mail do cliente" required />
          <input v-else v-model="temporaryEdit.email" type="text"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
            placeholder="Digite o e-mail do cliente" required />
        </div>
        <button type="submit"
          class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
          {{ showModal === 'client' ? 'Adicionar' : 'Salvar Alterações' }}
        </button>
      </form>
    </ModalForm>

    <!-- Modal Adicionar e listar compras -->
    <ModalForm :show="showModal === 'purchase'" title="Registrar Compra"
      description="Preencha os dados da nova compra" @close="closeModal">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
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
import { Icon } from "@iconify/vue";
import HeaderApp from '@/components/HeaderApp.vue';
import HeroSection from '@/components/HeroSection.vue';
import TabNavigation from '@/components/TabNavigation.vue';
import DataTable from '@/components/DataTable.vue';
import ModalForm from '@/components/ModalForm.vue';
import { 
  getPlans, createPlan, updatePlan, deletePlan,
  getClients, createClient, updateClient, deleteClient,
  getPurchases, createPurchase
} from '@/services/api.js';

const activeTab = ref('plans');
const showModal = ref('');
const temporaryEdit = ref(null);
const showClientDropdown = ref(false);
const showPlanDropdown = ref(false);
const selectedClient = ref(null);
const selectedPlan = ref(null);

// Definições das colunas nas tabelas
const planColumns = [
  { key: 'name', label: 'Nome do plano', align: 'left' },
  { key: 'description', label: 'Descrição', align: 'left' },
  { key: 'price', label: 'Preço', align: 'left' },
  { key: 'date', label: 'Data de cadastro', align: 'left' },
  { key: 'actions', label: 'Ações', align: 'right' }
];

const clientColumns = [
  { key: 'name', label: 'Nome', align: 'left' },
  { key: 'email', label: 'E-mail', align: 'left' },
  { key: 'date', label: 'Data de cadastro', align: 'left' },
  { key: 'actions', label: 'Ações', align: 'right' }
];

const purchaseColumns = [
  { key: 'client', label: 'Cliente', align: 'left' },
  { key: 'plan', label: 'Plano', align: 'left' },
  { key: 'quantity', label: 'Quantidade', align: 'left' },
  { key: 'total', label: 'Valor total', align: 'left' },
  { key: 'date', label: 'Data da compra', align: 'left' }
];

const newPlan = ref({
  name: '',
  price: '',
  description: ''
});

const newClient = ref({
  name: '',
  email: ''
});

const newPurchase = ref({
  client: null,
  plan: null,
  quantity: 1
});

// Dados vindos do backend
const clients = ref([]);
const plansAvailable = ref([]);
const purchases = ref([]);

const loading = ref(false);
const errorMessage = ref('');

// Função para carregar todos os dados do backend
async function loadAll() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const [plans, cls, pchs] = await Promise.all([
      getPlans(),
      getClients(),
      getPurchases()
    ]);
    plansAvailable.value = plans.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      date: '-' // backend não fornece data de cadastro
    }));
    clients.value = cls.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      date: '-' // backend não fornece data de cadastro
    }));
    purchases.value = pchs.map(item => ({
      id: item.id,
      client: item.client_name,
      email: item.client_email,
      plan: item.plan_name,
      quantity: item.quantity,
      total: Number(item.plan_price) * Number(item.quantity),
      date: new Date(item.purchase_date).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }));
  } catch (e) {
    console.error(e);
    errorMessage.value = e.message || 'Erro ao carregar dados';
  } finally {
    loading.value = false;
  }
}

// Carrega dados ao montar o componente
onMounted(loadAll);

const closeModal = () => {
  showModal.value = '';
  temporaryEdit.value = null;
};

const handleSubmit = async () => {
  try {
    if (showModal.value === 'client') {
      await createClient({ name: newClient.value.name, email: newClient.value.email });
      await loadAll();
      newClient.value = { name: '', email: '' };
      showModal.value = '';
      return;
    } else if (showModal.value === 'purchase') {
      if (!selectedClient.value || !selectedPlan.value) throw new Error('Selecione cliente e plano');
      await createPurchase({ client_id: selectedClient.value.id, plan_id: selectedPlan.value.id, quantity: Number(newPurchase.value.quantity) || 1 });
      await loadAll();
      newPurchase.value = { client: null, plan: null, quantity: 1 };
      selectedClient.value = null;
      selectedPlan.value = null;
      showModal.value = '';
      return;
    } else {
      await createPlan({ name: newPlan.value.name, price: Number(newPlan.value.price), description: newPlan.value.description });
      await loadAll();
      newPlan.value = { name: '', price: '', description: '' };
      showModal.value = '';
    }
  } catch (e) {
    alert(e.message || 'Erro ao salvar');
  }
};

const selectClient = (client) => {
  selectedClient.value = client;
  showClientDropdown.value = false;
}

const selectPlan = (plan) => {
  selectedPlan.value = plan;
  showPlanDropdown.value = false;
}

const openEditModal = (value, type) => {
  temporaryEdit.value = { ...value };
  if (type === 'editClient') {
    showModal.value = 'editClient';
  } else {
    showModal.value = 'editPlan';
  }
};

const editMode = async () => {
  if (!temporaryEdit.value) return;
  try {
    if (showModal.value === 'editClient') {
      await updateClient({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, email: temporaryEdit.value.email });
      await loadAll();
      temporaryEdit.value = null;
      showModal.value = '';
      return;
    } else if (showModal.value === 'editPlan') {
      await updatePlan({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, price: Number(temporaryEdit.value.price), description: temporaryEdit.value.description });
      await loadAll();
      temporaryEdit.value = null;
      showModal.value = '';
    }
  } catch (e) {
    alert(e.message || 'Erro ao atualizar');
  }
};

const deleteItem = async (id, type) => {
  const confirmDelete = window.confirm('Tem certeza que deseja excluir este item?');
  if (!confirmDelete) return;

  // Verifica se o cliente tem compras antes de excluir 
  if (type === 'client') {
    const hasOrders = purchases.value.some(purchase =>
      purchase.client === clients.value.find(c => c.id === id)?.name
    );

    if (hasOrders) {
      alert('Não é possível excluir este cliente pois ele possui compras registradas.');
      return;
    }
    try {
      await deleteClient(id);
      await loadAll();
    } catch (e) {
      // Se o backend impedir a exclusão por compras vinculadas (409)
      alert(e.message || 'Erro ao excluir cliente');
    }
  } else if (type === 'plan') {
    // Verifica se o plano tem compras antes de excluir
    const hasOrders = purchases.value.some(purchase =>
      purchase.plan === plansAvailable.value.find(p => p.id === id)?.name
    );

    if (hasOrders) {
      alert('Não é possível excluir este plano pois existem compras registradas com ele.');
      return;
    }
    try {
      await deletePlan(id);
      await loadAll();
    } catch (e) {
      alert(e.message || 'Erro ao excluir plano');
    }
  }
};
</script>