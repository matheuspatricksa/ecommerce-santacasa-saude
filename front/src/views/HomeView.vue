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
import { ref } from 'vue';
import { Icon } from "@iconify/vue";
import HeaderApp from '@/components/HeaderApp.vue';
import HeroSection from '@/components/HeroSection.vue';
import TabNavigation from '@/components/TabNavigation.vue';
import DataTable from '@/components/DataTable.vue';
import ModalForm from '@/components/ModalForm.vue';

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


// Dados simulados para as tabelas
const clients = ref([
  { id: 1, name: 'João Silva', email: 'joao.silva@email.com', date: '05/11/2025' },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', date: '05/11/2025' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', date: '05/11/2025' },
  { id: 4, name: 'Ana Costa', email: 'ana.costa@email.com', date: '05/11/2025' }
]);

const plansAvailable = ref([
  { id: 5, name: 'Plano Básico Individual', price: 189.90, description: 'Plano de saúde ideal para pessoas que buscam cobertura essencial com consultas e exames básicos.', date: '05/11/2025' },
  { id: 6, name: 'Plano Familiar Essencial', price: 349.90, description: 'Plano de saúde para famílias, oferecendo cobertura abrangente para todos os membros.', date: '05/11/2025' },
  { id: 7, name: 'Plano Premium Executivo', price: 789.90, description: 'Plano de saúde completo com cobertura ampla, ideal para profissionais que buscam o melhor em atendimento médico.', date: '05/11/2025' },
  { id: 8, name: 'Plano Empresarial Corporativo', price: 1299.90, description: 'Plano de saúde voltado para empresas, oferecendo benefícios exclusivos para colaboradores.', date: '05/11/2025' }
]);

const purchases = ref([
  { id: 9, client: 'João Silva', email: 'joao.silva@email.com', plan: 'Plano Premium Executivo', quantity: 2, total: 1579.80, date: '05/11/2025, 18:40' },
  { id: 10, client: 'Maria Santos', email: 'maria.santos@email.com', plan: 'Plano Familiar Essencial', quantity: 1, total: 349.90, date: '05/11/2025, 14:20' },
  { id: 11, client: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', plan: 'Plano Básico Individual', quantity: 1, total: 189.90, date: '05/11/2025, 09:15' },
  { id: 12, client: 'Ana Costa', email: 'ana.costa@email.com', plan: 'Plano Empresarial Corporativo', quantity: 3, total: 3899.70, date: '05/11/2025, 11:30' }
])

const closeModal = () => {
  showModal.value = '';
  temporaryEdit.value = null;
};

const handleSubmit = () => {
  if (showModal.value === 'client') {
    clients.value.push({
      name: newClient.value.name,
      email: newClient.value.email,
      date: new Date().toLocaleDateString()
    });
    newClient.value = { name: '', email: '' };
    showModal.value = '';
    return;
  } else if (showModal.value === 'purchase') {
    purchases.value.push({
      client: selectedClient.value.name,
      email: selectedClient.value.email,
      plan: selectedPlan.value.name,
      quantity: newPurchase.value.quantity,
      total: (selectedPlan.value.price * newPurchase.value.quantity).toFixed(2),
      date: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    newPurchase.value = { client: null, plan: null, quantity: 1 };
    selectedClient.value = null;
    selectedPlan.value = null;
    showModal.value = '';
    return;
  } else {
    plansAvailable.value.push({
      name: newPlan.value.name,
      price: newPlan.value.price,
      description: newPlan.value.description,
      date: new Date().toLocaleDateString()
    });
    newPlan.value = { name: '', price: '', description: '' };
    showModal.value = '';
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

const editMode = () => {
  if (!temporaryEdit.value) return;
  if (showModal.value === 'editClient') {
    const index = clients.value.findIndex(c => c.id === temporaryEdit.value.id);
    if (index !== -1) {
      clients.value[index] = { ...temporaryEdit.value };
    }
    temporaryEdit.value = null;
    showModal.value = '';
    return;
  } else if (showModal.value === 'editPlan') {
    const index = plansAvailable.value.findIndex(p => p.id === temporaryEdit.value.id);
    if (index !== -1) {
      plansAvailable.value[index] = { ...temporaryEdit.value };
    }
    temporaryEdit.value = null;
    showModal.value = '';
  }
};

const deleteItem = (id, type) => {
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

    clients.value = clients.value.filter(client => client.id !== id);
  } else if (type === 'plan') {
    // Verifica se o plano tem compras antes de excluir
    const hasOrders = purchases.value.some(purchase =>
      purchase.plan === plansAvailable.value.find(p => p.id === id)?.name
    );

    if (hasOrders) {
      alert('Não é possível excluir este plano pois existem compras registradas com ele.');
      return;
    }

    plansAvailable.value = plansAvailable.value.filter(plan => plan.id !== id);
  }
};
</script>