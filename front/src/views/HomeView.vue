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
            <button @click="activeTab = 'plans'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'plans' ? 'bg-white rounded-lg' : ''
            ]">
              <Icon icon="mdi:shield-outline" width="16" height="16" />
              <span>Planos</span>
            </button>
            <button @click="activeTab = 'clients'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'clients' ? 'bg-white' : '']">
              <Icon icon="mdi:user-multiple-outline" width="16" height="16" />
              <span>Clientes</span>
            </button>
            <button @click="activeTab = 'purchases'" :class="[
              'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
              activeTab === 'purchases' ? 'bg-white' : ''
            ]">
              <Icon icon="mdi:heart-outline" width="16" height="16" />
              <span>Compras</span>
            </button>
          </div>

          <!-- Tabela de planos -->
          <div v-if="activeTab === 'plans'" class="p-6 flex flex-col gap-4  bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:shield-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Planos de Saúde</h2>
                </div>
                <p class="text-gray-400">Adicione, edite ou remova planos de saúde</p>
              </div>
              <button @click="showModal = 'plan'"
                class="inline-flex items-center  cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#00bbff] text-white px-4 py-2 gap-2 hover:bg-[#0099cc] transition-colors duration-300">
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Tabela de clientes -->
          <div v-if="activeTab === 'clients'" class="p-6 flex flex-col gap-4 bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:user-multiple-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Clientes</h2>
                </div>
                <p class="text-gray-400">Adicione, edite ou remova clientes do sistema</p>
              </div>
              <button @click="showModal = 'client'"
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Tabela de compras -->
          <div v-if="activeTab === 'purchases'" class="p-6 flex flex-col gap-4 bg-white">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:shopping-cart-outline" width="24" height="24" style="color: #00bbff;" />
                  <h2 class="text-2xl font-bold">Gerenciar Compras</h2>
                </div>
                <p class="text-gray-400">Registre e acompanhe as vendas de planos</p>
              </div>
              <button @click="showModal = 'purchase'"
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
                      <!-- <th class="h-12 px-4 align-middle font-medium text-right text-gray-500">Ações</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="purchase in purchases" class="border-b border-gray-300">
                      <td class="p-4 align-middle">
                        <p class="font-bold">{{ purchase.client }}</p>
                        <span class="text-xs text-gray-400">{{ purchase.email }}</span>
                      </td>
                      <td class="p-4 align-middle truncate max-w-xs">
                        {{ purchase.plan }}
                      </td>
                      <td class="p-4 align-middle">
                        <Icon icon="mdi:hashtag" width="16" height="16" style="color: gray;"
                          class="inline-block mr-1" />
                        <span>{{ purchase.quantity }}</span>
                      </td>
                      <td class="p-4 align-middle">
                        <span class="text-green-600">{{ purchase.total }}</span>
                      </td>
                      <td class="p-4 align-middle">{{ purchase.date }}</td>
                      <!-- <td class="p-4 align-middle">
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
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Adicionar e editar plano -->
    <div v-if="showModal === 'plan' || showModal === 'editPlan'"
      class="fixed inset-0 h-full w-full bg-black/80 flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl mx-auto p-8 w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold">{{ showModal === 'plan' ? 'Adicionar Plano' : 'Editar Plano' }}</h3>
            <p class="text-gray-400">{{ showModal === 'plan' ? 'Preencha os dados do novo plano de saúde' : 'Atualize os dados do plano'}}</p>
          </div>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-800 cursor-pointer">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        <!-- Formulário -->
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
      </div>
    </div>

    <div v-if="showModal === 'client' || showModal === 'editClient'"
      class="fixed inset-0 h-full w-full bg-black/80 flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl mx-auto p-8 w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold">{{ showModal === 'client' ? 'Adicionar Cliente' : 'Editar Cliente' }}</h3>
            <p class="text-gray-400">{{ showModal === 'client' ? 'Preencha os dados do novo cliente' : 'Atualize os dados do cliente' }}</p>
          </div>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-800 cursor-pointer">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        <!-- Formulário -->
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
      </div>
    </div>

    <div v-if="showModal === 'purchase'"
      class="fixed inset-0 h-full w-full bg-black/80 flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl mx-auto p-8 w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold">Registrar Compra</h3>
            <p class="text-gray-400">Preencha os dados da nova compra</p>
          </div>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-800 cursor-pointer">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        <!-- Formulário -->
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
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bbff]"
                required />
            </div>
          </div>

          <button type="submit"
            class="mt-4 cursor-pointer bg-[#00bbff] text-white px-4 py-2 rounded-lg hover:bg-[#0099cc] transition-colors duration-300">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from "@iconify/vue";

const activeTab = ref('plans');
const showModal = ref('');
const temporaryEdit = ref(null);
const showClientDropdown = ref(false);
const showPlanDropdown = ref(false);
const selectedClient = ref(null);
const selectedPlan = ref(null);

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
  // type expected: 'editPlan' or 'editClient'
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

  if (type === 'client') {
    // Verificar se o cliente tem compras antes de excluir
    const hasOrders = purchases.value.some(purchase =>
      purchase.client === clients.value.find(c => c.id === id)?.name
    );

    if (hasOrders) {
      alert('Não é possível excluir este cliente pois ele possui compras registradas.');
      return;
    }

    clients.value = clients.value.filter(client => client.id !== id);
  } else if (type === 'plan') {
    // Verificar se o plano tem compras antes de excluir
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