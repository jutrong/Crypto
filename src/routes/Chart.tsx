import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price: any) => {
                return {
                  x: price.time_open,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            } as unknown as number,
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              //toolbar: { show: false },
              background: "transparent",
            },
            stroke: { curve: "smooth", width: 4 },
            //grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              //axisTicks: { show: false },
              //axisBorder: { show: false },
              //labels: { show: false },
              type: "datetime",
              categories: data?.map(
                (price: any) => price.time_close
              ) as string[],
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] }
            // },
            // colors: ["#0fbcf9"],
            // tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } }
          }}
        />
      )}
    </div>
  );
};
export default Chart;
