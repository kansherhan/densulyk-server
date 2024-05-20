import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import { faker } from "@faker-js/faker";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  pointRadius: 6,
  pointHoverRadius: 8,
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 14,
        },
      },
      title: {
        font: {
          size: 14,
        },
      },
    },
    y: {
      suggestedMax: 75,
      suggestedMin: 0,
      ticks: {
        font: {
          size: 14,
        },
      },
      title: {
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 15,
        },
      },
    },
    title: {
      display: true,
      text: "Статистика входа в аккаунта у пользователей",
      font: {
        size: 21,
      },
    },
  },
};

const labels = ["16 май", "17 май", "18 май", "19 май", "20 май"];

const data = {
  labels,
  datasets: [
    {
      label: "Неудачные",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 15 })),
      fill: true,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
    },
    {
      label: "Успешно",
      data: labels.map(() => faker.datatype.number({ min: 10, max: 50 })),
      fill: true,
      borderColor: "#0f9379",
      backgroundColor: "#0f93792e",
      tension: 0.2,
    },
  ],
};

const columnsTable = [
  {
    name: "IP",
    selector: (row) => row.ip,
  },
  {
    name: "Количество",
    selector: (row) => row.count,
  },
  {
    name: "Время",
    selector: (row) => row.date,
  },
];

const dataTable = Array.from({ length: 10 }, () => ({
  id: faker.number.int(),
  ip: faker.internet.ipv4(),
  count: faker.number.int({ min: 1, max: 20 }),
  date: moment(
    faker.date.between({
      from: "2024-05-15T00:00:00.000Z",
      to: "2024-05-20T00:00:00.000Z",
    })
  ).format("YYYY-MM-DD HH:mm:ss"),
}));

export function Statistic2FAPage() {
  return (
    <div className="statistic-2fa-page">
      <div className="container">
        <h2 className="text-align:center margin-bottom:5rem">
          Статистика эффективности 2FA с блокчейном
        </h2>

        <div className="margin-bottom:5rem display:flex justify-content:center h:680 w:full">
          <Line options={options} data={data} />
        </div>

        <DataTable
          className="datatable-fix"
          columns={columnsTable}
          data={dataTable}
        />
      </div>
    </div>
  );
}
