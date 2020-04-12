import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data, id, color }: any) => {

    const formatData = (rawData: any[]) => {
        const tickValues: any[] = [];
        const data = rawData.map((row, index) => {
            if ((index % 5) === 0) {
                tickValues.push(row.x);
            }
            return { x: row.x, y: row.y !== "<1" ? row.y : "0" };
        });
        return {
            data: [{ id, color, data: data }],
            tickValues
        };
    };

    const formattedData = formatData(data);
    return (
        <ResponsiveLine
            data={formattedData.data}
            margin={{ top: 10, right: 30, bottom: 50, left: 50 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
            curve="linear"
            lineWidth={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                tickValues: formattedData.tickValues
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0
            }}
            colors={color}
            enablePoints={false}
            enableCrosshair={false}
            tooltip={props => (
                <div className="bg-white shadow-lg border border-gray-300 rounded-lg py-2 px-3">
                    <div className="text-gray-600">{props.point.data.xFormatted}</div>
                    <div className="font-bold text-right" style={{ color: props.point.color }}>{props.point.data.yFormatted}</div>
                </div>
            )}
            useMesh={true}
            enableGridX={false}
            animate={true}
        />
    );
}

export default LineChart;