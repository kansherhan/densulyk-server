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
import { writeFile, utils } from "xlsx";
import { Line } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { RiFileExcel2Line } from "react-icons/ri";
import { isSuccessText } from "../../../helper.js";
import { InfoCard } from "../../../components/InfoCard.jsx";
import {
  FaExclamationCircle,
  FaUserAlt,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

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
      suggestedMax: 50,
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
  },
};

const labels = ["19 май", "20 май", "21 май", "22 май"];

const columnsTable = [
  {
    name: "#",
    selector: (row) => row.id,
    width: "100px",
  },
  {
    name: "IP",
    selector: (row) => row.ip,
  },
  {
    name: "Вход выполнен",
    selector: (row) => (
      <span className={row.isSuccess ? "f:#005963" : "f:#ed5050"}>
        {isSuccessText(row.isSuccess)}
      </span>
    ),
  },
  {
    name: "Количество",
    selector: (row) => row.count,
  },
  {
    name: "Время",
    selector: (row) => row.date,
    sortable: true,
  },
];

const data = {
  labels,
  datasets: [
    {
      label: "Неудачные",
      data: [4, 2, 0, 7],
      fill: true,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
    },
    {
      label: "Успешно",
      data: [15, 7, 13, 23],
      fill: true,
      borderColor: "#0f9379",
      backgroundColor: "#0f93792e",
      tension: 0.2,
    },
  ],
};

const dataTable = Array.from({ length: 15 }, (v, k) => ({
  id: k + 1,
  ip: "192.168.1.122",
  count: faker.number.int({ min: 1, max: 2 }),
  isSuccess: Math.random() > 0.5,
  date: moment(
    faker.date.between({
      from: "2024-05-21T10:00:00.000Z",
      to: "2024-05-21T23:00:00.000Z",
    })
  ).format("YYYY-MM-DD HH:mm:ss"),
}));

const handleExport = () => {
  const ws = utils.json_to_sheet(dataTable);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, `test.xlsx`);
};

export function Statistic2FAPage() {
  return (
    <div className="statistic-2fa-page">
      <div className="container">
        <h2 className="text-align:center margin-bottom:25">
          Статистика эффективности 2FA с блокчейном
        </h2>

        <p className="text-align:center f:medium margin-bottom:55">
          Эта страница предоставляет анализ успешности и неудач двухфакторной
          аутентификации с использованием технологии блокчейн.
        </p>

        <div className="margin-bottom:70 flex align-items:center justify-content:space-around">
          <InfoCard
            icon={<FaUserAlt size={48} color="#005963" />}
            title="Всего"
            value={7}
          />
          <InfoCard
            icon={<FaUserCheck size={48} color="#005963" />}
            title="Успешные"
            value={4}
          />
          <InfoCard
            icon={<FaUserTimes size={48} color="#005963" />}
            title="Неудачные"
            value={3}
          />
          <InfoCard
            icon={<FaExclamationCircle size={48} color="#005963" />}
            title="Попытки неудачных"
            value={6}
          />
        </div>

        <div className="margin-bottom:5rem display:flex justify-content:center flex:col h:680 w:full">
          <h3 className="display:block margin-top:45 margin-bottom:15">
            Список последный входов в систему
          </h3>

          <Line className="display:block" options={options} data={data} />
        </div>

        <div className="signin-statistic-table">
          <div className="display:flex align-items:center justify-content:space-between margin-top:45 margin-bottom:15">
            <h3>Список последный входов в систему</h3>

            <button
              onClick={handleExport}
              className="display:flex align-items:center bg:#005963 f:#fff border:none padding:10|20 r:10 cursor:pointer"
            >
              <RiFileExcel2Line size={16} />
              <span className="margin-left:10 f:16">Excel</span>
            </button>
          </div>
        </div>

        <DataTable
          pagination={true}
          paginationPerPage={10}
          className="datatable-fix"
          columns={columnsTable}
          data={dataTable}
        />
      </div>
    </div>
  );
}
