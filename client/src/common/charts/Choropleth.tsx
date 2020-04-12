import React, { useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { D3MapFeatures } from "../constants/constants"

const Choropleth = ({ data, color }: any) => {
    // const [state, updateState] = useState<[number, number, number]>([0, 3, 0]);

    // const moveMap = (e: any) => {
    //     updateState([e.clientX, e.clientY, 0]);
    // };

    return (
        <div className="h-full">
            <ResponsiveChoropleth
                data={data}
                features={D3MapFeatures.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors="blues"
                domain={[0, 100]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                // projectionType="mercator"
                projectionType="orthographic"
                projectionScale={235}
                projectionTranslation={[0.3, 0.5]}
                projectionRotation={[0, 3, 0]}
                enableGraticule={true}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor="#152538"
                onMouseEnter={(feature, event) => {
                    console.log("feature", feature);
                    console.log("event", event);
                }}
                onMouseMove={(feature, event) => {
                    console.log("feature", feature);
                    console.log("event", event);
                }}
            />
        </div>
    );
}

export default Choropleth;