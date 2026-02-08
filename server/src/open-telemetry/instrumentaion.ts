import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ConsoleMetricExporter, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import {NodeSDK} from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import {Resource, resourceFromAttributes} from "@opentelemetry/resources"
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";


const sdk = new NodeSDK({
    resource:  resourceFromAttributes({ [ATTR_SERVICE_NAME]: "apo-service",[ATTR_SERVICE_VERSION]:'1.0.0'}),
    traceExporter: new ConsoleSpanExporter(),    
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter()
    }),
    instrumentations: [
        getNodeAutoInstrumentations()
    ]
})


sdk.start()