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
import moment from "moment";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  FaExclamationCircle,
  FaUserAlt,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

import { isSuccessText } from "../../../helper.js";
import { InfoCard } from "../../../components/InfoCard.jsx";
import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import TasksService from "../../../services/tasks.service.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Statistic2FAPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistic-2fa"],
    queryFn: async () => {
      const reports = await TasksService.getAllAuthReports();
      const history = await TasksService.getAllUserAuthHistory();

      console.log(reports, history);

      return { reports, history };
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <LoadingPanel />;
  }

  const lineChartOptions = {
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

  const labels = data.reports.map((report) =>
    moment(report.createdAt).format("DD MMM")
  );

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
      name: "ID пользователя",
      selector: (row) => row.userID,
    },
    {
      name: "Время",
      selector: (row) => moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
  ];

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Неудачные",
        data: data.reports.map((report) => report.successCount),
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
      },
      {
        label: "Успешно",
        data: data.reports.map((report) => report.errorCount),
        fill: true,
        borderColor: "#0f9379",
        backgroundColor: "#0f93792e",
        tension: 0.2,
      },
    ],
  };

  const handleExport = () => {
    const ws = utils.json_to_sheet(data.history);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, `week_statistic.xlsx`);
  };

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

          <Line
            className="display:block"
            options={lineChartOptions}
            data={lineChartData}
          />
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
          data={data.history}
        />
      </div>
    </div>
  );
}
