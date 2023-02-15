const MOCK_MOVEMENTS = [
  {
    id: 1,
    date: '21/02/2020',
    label: 'Cafetería ar',
    description: 'N 2018064000673121 MEDICOS SIN FRONTERAS, ESPANA',
    category: '9999',
    icon: 'coronita:loaneuro',
    categoryDescription: 'Pendiente de categorizar',
    parsedAmount: { value: -1, currency: 'EUR' },
    parsedAcountingBalance: { value: 13199.68, currency: 'EUR' },
  },
  {
    id: 2,
    date: '20/02/2020',
    label: 'STEP COFFE S',
    description: 'PAGO CON TARJETA',
    category: '9',
    icon: 'coronita:creditcard',
    categoryDescription: 'Retirada de efectivo',
    parsedAmount: { value: -1.50, currency: 'EUR' },
    parsedAcountingBalance: { value: 13200.68, currency: 'EUR' },
    product: 'ES54029990012311234',
  },
  {
    id: 3,
    date: '16/02/2020',
    label: 'itunes.com/bill',
    category: '7',
    icon: 'coronita:bill',
    categoryDescription: 'Otras compras y servicios',
    parsedAmount: { value: -329.99, currency: 'EUR' },
    badge: {
      status: 'success',
      label: 'Financiable'
    },
  },
  {
    id: 4,
    date: '10/02/2020',
    label: 'Transferencia realizada',
    description: 'Para John Doe',
    category: '9',
    subcategory: '62',
    icon: 'coronita:transferaccount',
    categoryDescription: 'Efectivo y Pagos',
    parsedAmount: { value: -3.50, currency: 'EUR' },
    parsedAcountingBalance: { value: 561.11, currency: 'EUR' },
  },
  {
    id: 5,
    date: '01/02/2020',
    label: 'Transferencia realizada',
    description: 'Para John Doe',
    category: '9',
    icon: 'coronita:transferaccount',
    categoryDescription: 'Efectivo y Pagos',
    parsedAmount: { value: -3.5, currency: 'EUR' },
    parsedAcountingBalance: { value: 561.11, currency: 'EUR' },
    showCurrentYear: true
  },
  {
    id: 6,
    date: '31/01/2020',
    label: 'Transferencia realizada',
    description: 'Para John Doe',
    category: '9',
    icon: 'coronita:transferaccount',
    categoryDescription: 'Efectivo y Pagos',
    parsedAmount: { value: -3.5, currency: 'EUR' },
    parsedAcountingBalance: { value: 561.11, currency: 'EUR' },
    hideCategory: true
  },
  {
    id: 7,
    label: 'Transferencia realizada',
    description: 'Para John Doe'
  }
];

let fetched = false;
let movements = [];

const shuffleArray = (items) => {
  // Shuffle array
  const shuffled = [ ...items ].sort(() => 0.5 - Math.random());

  // Number of items to retrieve - at least, 2 of them.
  const len = Math.floor(Math.random() * items.length) + 2;

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, len);
};

const buildMovementDetail = (movement) => {
  const { label, date, description, categoryDescription, parsedAmount, parsedAcountingBalance, badge } = movement;
  const movementDetail = [
    label && { key: 'movement-detail.concept', value: label },
    date && { key: 'movement-detail.date', value: date },
    description && { key: 'movement-detail.description', value: description },
    categoryDescription && { key: 'movement-detail.category', value: categoryDescription },
    parsedAmount && { key: 'movement-detail.amount', value: `${parsedAmount.value} ${parsedAmount.currency}`},
    parsedAcountingBalance && { key: 'movement-detail.currentBalance', value: `${parsedAcountingBalance.value} ${parsedAcountingBalance.currency}`},
    badge && { key: 'movement-detail.badges', value: badge.label },
  ].filter(Boolean);

  return movementDetail;
};

export async function getMovements(force = false) {
  if (fetched || fetched && !force) {
    return Promise.resolve(movements);
  }

  const { host, path, mock } = window.AppConfig;

  if (mock) {
    const timer = force ? 1 : Math.floor(Math.random() * (5000 - 2500 + 1)) + 2500;

    return new Promise((resolve) => {
      setTimeout(() => {
        movements = shuffleArray(MOCK_MOVEMENTS);
        fetched = true;
        resolve(movements);
      }, timer);
    });
  }

  const endpoint = `${host}/${path}`;
  const result = await fetch(endpoint).then((response) => response.json());

  movements = shuffleArray(result);
  fetched = true;
  return movements;
}

export async function getMovementDetail(id) {
  const movement = await getMovements().then(items => items.find((item) => item.id === id));

  return buildMovementDetail(movement);
}

export function cleanUp() {
  fetched = false;
  movements = [];
}
